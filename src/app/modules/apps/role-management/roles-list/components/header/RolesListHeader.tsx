import {RolesListToolbar} from './UserListToolbar'
import {RolesListSearchComponent} from './RolesListSearchComponent'

const RolesListHeader = () => {
  return (
    <div className='card-header border-0 pt-6'>
      <RolesListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <RolesListToolbar />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {RolesListHeader}
