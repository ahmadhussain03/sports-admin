import clsx from "clsx"
import { useFormik } from "formik";
import { SetStateAction, useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";
import { KTSVG, QUERIES } from "../../../../../../../../_metronic/helpers";
import { getError } from "../../../../../../../utils/helpers";
import { getUncategorizedPlayers } from "../../../../../uncategorized-player-management/players-assign/core/_request";
import { useQueryResponse } from "../../core/QueryResponseProvider";
import { useNavigate, useParams } from 'react-router-dom';
import { assignPlayerToTeam } from "../../core/_requests";

interface ISessionPlayerModal {
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const initialValues: {player: {value: string, label: string} | null } = {
  player: null
}

const SessionPlayerModal: React.FC<ISessionPlayerModal> = ({ setIsOpen }) => {
  const [loading, setLoading] = useState(false)
  const navigation = useNavigate()
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()

  const { id } = useParams()

  if(!id && id !== undefined) {
    navigation('/error/404')
  }

  const teamId = id as string

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, {setStatus, setSubmitting, setFieldError, setFieldValue}) => {
      try {
        setLoading(true)
        await assignPlayerToTeam(teamId, { player: values.player!.value })
        queryClient.invalidateQueries([`${QUERIES.TEAM_PLAYER_LIST}-${teamId}-${query}`])
        queryClient.invalidateQueries(['team-view', teamId])
        formik.resetForm()
        setLoading(false)
        setIsOpen(false)
      } catch (error: any) {
        if(error?.response?.status === 422 && error?.response?.data?.errors) {
          error.response.data.errors.map((e: any) => setFieldError(e.field, getError(error.response.data.errors, e.field)))
        }
        if(error?.response?.data?.message) {
          setStatus(error.response.data.message)
        } else {
          setStatus('The player details is incorrect')
        }
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  const loadOptionsPlayers: LoadOptions<{value: string, label: string}, any, any> =  async (search, loadedOptions, { page }) => {

    const response = await getUncategorizedPlayers(search, page);
  
    return {
      options: response.data.data.map((data: any) => ({value: data.id, label: data.first_name + ' ' + data.last_name})),
      hasMore: response.data.meta.next_page_url ? true : false,
      additional: {
        page: page + 1,
      },
      ...loadedOptions
    };
  }
  
  return (
      <>
      <div className={clsx('modal fade show d-block')} role="dialog" tabIndex={-1} id="kt_modal_1">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={formik.handleSubmit}>
                <div className="modal-header">
                <h5 className="modal-title">Add Player To Team</h5>
                <div
                    className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                >
                    <span onClick={() => setIsOpen(false)}>
                    <KTSVG
                        path="/media/icons/duotune/arrows/arr061.svg"
                        className="svg-icon svg-icon-2x"
                    />
                    </span>
                </div>
                </div>
                <div className="modal-body">
                  {formik.status && (
                    <div className='mb-lg alert alert-danger'>
                      <div className='alert-text font-weight-bold'>{formik.status}</div>
                    </div>
                  )}

                  {/* begin::Form group Player */}
                  <div className='fv-row mb-5'>
                    <label className='form-label fw-bolder text-dark fs-7 required'>Player</label>
                    <AsyncPaginate
                        value={formik.values.player}
                        loadOptions={loadOptionsPlayers}
                        onChange={value => formik.setFieldValue('player', value)}
                        additional={{
                            page: 1,
                        }}
                        debounceTimeout={300}
                        placeholder="Players"
                        noOptionsMessage={() => "No Record Found!"}
                    />
                    {formik.touched.player && formik.errors.player && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.player?.toString()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* end::Form group */}
                </div>
                <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setIsOpen(false)}
                >
                    Close
                </button>
                <button
                type='submit'
                className='btn btn-primary fs-7'
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {!loading && <span className='indicator-label'>Assign Player</span>}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle'></span>
                  </span>
                )}
              </button>
                </div>
            </form>
          </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export default SessionPlayerModal