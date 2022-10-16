import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { KTSVG, toAbsoluteUrl } from "../../../../../_metronic/helpers"
import Permissions from "./components/Permissions";
import { useRoleView } from './core/_hook';
import { toast } from 'react-toastify';
import { updateRole } from "../roles-edit/core/_request";

const RolesPermission = () => {
  const [loading, setLoading] = useState(false)
   const navigation = useNavigate()
  const { id } = useParams()
  const [allowedPermissions, setAllowedPermissions] = useState<number[]>([])

  if (!id && id !== undefined) {
    navigation('/error/404')
  }

  const { data, isLoading, isError } = useRoleView({ id })

  useEffect(() => {
    if(data?.data) {
        setAllowedPermissions(data.data.permissions.map(permission => permission.id))
    }
  }, [data])

  const onPermissionsChange = (permissions: number[]) => {
    setAllowedPermissions(permissions)
  }

  const onUpdatePress = async () => {
    setLoading(true)
    try {
      await updateRole({ permissions: allowedPermissions }, id)
      navigation('/role-management/roles')
      toast.success("Permissions Updated Successfully.")
    } catch (e: any) {
      setLoading(false)
      toast.error("Error Updating Permissions.")
    }
  }

  if (isError) {
    navigation('/error/404')
  }

  if (isLoading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img
          alt='Logo'
          src={toAbsoluteUrl('/media/logos/default.png')}
          className='h-350px'
        />
        Loading...
      </div>
    )
  }

  return (
    <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <button type='button' className='btn btn-danger' onClick={() => navigation(-1)} >
                <KTSVG path='/media/icons/duotune/arrows/arr002.svg' className='svg-icon-3' />
                Back
              </button>
              <h2 className="mx-2">{data?.data.name} Permissions</h2>
            </div>
            {!!data?.data.club_id && (
              <div>
                <div className='d-flex flex-row flex-end'>
                  <button
                    type='button'
                    className='btn btn-primary'
                    disabled={loading}
                    onClick={onUpdatePress}
                  >
                    {!loading && <span className='indicator-label'>Update</span>}
                    {loading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-12">
            <Permissions allowedPermissions={allowedPermissions} readOnly={!data?.data.club_id} onPermissionChange={onPermissionsChange} />
        </div>
    </div>
  )
}

export {RolesPermission}
