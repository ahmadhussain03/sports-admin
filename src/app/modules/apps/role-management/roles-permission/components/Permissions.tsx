import { KTCard, toAbsoluteUrl } from '../../../../../../_metronic/helpers';
import { usePermission } from '../core/_hook';
import { Permission, Role } from './../../../../auth/core/_models';

export interface IPermissions {
    allowedPermissions: number[],
    onPermissionChange: (permissions: number[]) => void,
    readOnly?: boolean
} 

const Permissions: React.FC<IPermissions> = ({ allowedPermissions, readOnly = true, onPermissionChange }) => {

  const { data: permissions, isLoading } = usePermission()

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

  const hasPermission = (permission: Permission) => {
    const findIndex = allowedPermissions.findIndex(aPermission => aPermission === permission.id)
    if(findIndex === -1) return false
    return true
  }

  const onChange = (event: any) => {
    const checked = event.target.checked
    const value = parseInt(event.target.value)

    if(checked) {
        onPermissionChange([...allowedPermissions, value])
    } else {
        const updatedPermissions = allowedPermissions.filter(aPermission => aPermission !== value)
        onPermissionChange([...updatedPermissions])
    }
  }

    return (
    <div className="row">
        {!!permissions && (
            Object.entries(permissions).map(([ group, groupPermissions ]) => (
                <div className="col-md-6 p-2" key={group}>
                    <KTCard>
                        <div className="card-header">
                            <h3 className="card-title">
                                {group.toLocaleUpperCase()}
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {groupPermissions.map(gPermission => (
                                    <div className='col-6 p-2' key={gPermission.id}>
                                        <div className="form-check form-check-custom form-check-solid">
                                            <input className="form-check-input" value={gPermission.id} type="checkbox" checked={hasPermission(gPermission)} disabled={readOnly} onChange={onChange} />
                                            <label className="form-check-label">
                                                {gPermission.name}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </KTCard>    
                </div>
            ))
        )}
    </div>
    )
}

export default Permissions