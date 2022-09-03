import clsx from 'clsx'
import { useFormik } from 'formik'
import {KTCard, KTSVG} from '../../../../../_metronic/helpers'
import { getError } from '../../../../utils/helpers'
import { useState, useEffect } from 'react';
import { assignPlayer, getUncategorizedPlayers, getTeams } from './core/_request';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth';
import { AsyncPaginate } from 'react-select-async-paginate';
import axios from '../../../../utils/axios';
import { LoadOptions } from 'react-select-async-paginate/ts/types';
import { Player } from '../players-list/core/_models';
import { Team } from '../../team-management/teams-list/core/_models';

const initialValues = {
  player: {value: '', label: ''},
  team: {value: '', label: ''},
}

type LocationState = {
  player: Player | undefined
  team: Team | undefined
}

const PlayersAssign = () => {
  const location = useLocation()
  const { player, team } = location.state as LocationState;
  const [loading, setLoading] = useState(false)
  const navigation = useNavigate()
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, {setStatus, setSubmitting, setFieldError}) => {
      try {
        setLoading(true)
        await assignPlayer({ player: values.player.value, team: values.team.value })
        setLoading(false)
        navigation('/uncategorized-player-management/players')
      } catch (error: any) {
        if(error?.response?.status === 422 && error?.response?.data?.errors) {
          error.response.data.errors.map((e: any) => setFieldError(e.field, getError(error.response.data.errors, e.field)))
        }
        if(error?.response?.data?.message) {
          setStatus(error.response.data.message)
        } else {
          setStatus('The given details is incorrect')
        }
        setSubmitting(false)
        setLoading(false)
        throw new Error(error)
      }
    },
  })

  const loadOptions: LoadOptions<{value: string, label: string}, any, any> =  async (search, loadedOptions, { page }) => {

      const response = await getUncategorizedPlayers(search, page);
    
      return {
        options: response.data.data.map((data: any) => ({value: data.id, label: data.first_name + ' ' + data.last_name})),
        hasMore: response.data.meta.next_page_url ? true : false,
        additional: {
          page: page + 1,
        },
        ...loadOptions
      };
  }

  const loadOptionsTeam: LoadOptions<{value: string, label: string}, any, any> =  async (search, loadedOptions, { page }) => {

    const response = await getTeams(search, page);
  
    return {
      options: response.data.data.map((data: any) => ({value: data.id, label: `${data.name} (${data.league})`})),
      hasMore: response.data.meta.next_page_url ? true : false,
      additional: {
        page: page + 1,
      },
      ...loadOptions
    };
  }

  useEffect(() => {
    if(player) {
        formik.setFieldValue('player', { value: player.id, label: `${player.first_name} ${player.last_name}` })
    }
  }, [player])

  useEffect(() => {
    if(team) {
        formik.setFieldValue('team', { value: team.id, label: `${team.name} (${team.league})` })
    }
  }, [team])

  return (
    <>
      <form 
      className='form fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      onSubmit={formik.handleSubmit}>
        <div className="card card-custom">
          <div className="card-header">
              <h3 className="card-title">
                <span style={{cursor: 'pointer'}} onClick={() => navigation(-1)}>
                  <KTSVG path='/media/icons/duotune/arrows/arr002.svg' className='svg-icon-2 me-2' />
                </span> 
                Assign Player
              </h3>
          </div>
          <div className="card-body">
              {formik.status && (
                <div className='mb-lg alert alert-danger'>
                  <div className='alert-text font-weight-bold'>{formik.status}</div>
                </div>
              )}

              {/* begin::Form group First Name */}
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-7 required'>Player</label>
                <AsyncPaginate
                    value={formik.values.player}
                    loadOptions={loadOptions}
                    onChange={value => formik.setFieldValue('player', value)}
                    additional={{
                        page: 1,
                    }}
                    debounceTimeout={300}
                    placeholder="Player"
                    noOptionsMessage={() => "No Record Found!"}
                />
                {formik.touched.player && formik.errors.player && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.player.toString()}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* end::Form group */}

              {/* begin::Form group First Name */}
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-7 required'>Team</label>
                <AsyncPaginate
                    value={formik.values.team}
                    loadOptions={loadOptionsTeam}
                    onChange={value => formik.setFieldValue('team', value)}
                    additional={{
                        page: 1,
                    }}
                    debounceTimeout={300}
                    placeholder="Team"
                    noOptionsMessage={() => "No Record Found!"}
                />
                {formik.touched.team && formik.errors.team && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.team.toString()}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* end::Form group */}
          </div>
          <div className="card-footer">
            <div className='d-flex flex-row flex-end'>
              <button
                type='submit'
                className='btn btn-primary mb-5 mx-1 fs-7'
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {!loading && <span className='indicator-label'>Assign</span>}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export {PlayersAssign}
