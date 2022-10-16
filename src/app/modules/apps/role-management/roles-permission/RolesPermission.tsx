import { useNavigate, useParams } from "react-router-dom"
import { KTCard, toAbsoluteUrl } from "../../../../../_metronic/helpers"
import Permissions from "./components/Permissions";
import { usePermission, useRoleView } from './core/_hook';

const RolesPermission = () => {
   const navigation = useNavigate()
  const { id } = useParams()

  if (!id && id !== undefined) {
    navigation('/error/404')
  }

  const { data, isLoading, isError } = useRoleView({ id })

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
            <h2>{data?.data.name} Permissions</h2>
        </div>
        <div className="col-12">
            <Permissions allowedPermissions={data?.data.permissions || []} />
        </div>
    </div>
  )
}

export {RolesPermission}
