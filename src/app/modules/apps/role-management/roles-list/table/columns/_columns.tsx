import {Column} from 'react-table'
import {RoleActionsCell} from './RoleActionsCell'
import {RoleCustomHeader} from './RoleCustomHeader'
import { Authorization } from '../../../../../../../lib/authorization'
import { Role } from './../../../../../auth/core/_models';

const rolesColumns: ReadonlyArray<Column<Role>> = [
  {
    Header: (props) => <RoleCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <>{props.data[props.row.index].name}</>,
  },
  {
    Header: (props) => (
      <RoleCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <Authorization allowedPermissions={['update-user', 'delete-user']}><RoleActionsCell role={props.data[props.row.index]} id={props.data[props.row.index].id} /></Authorization>,
  },
]

export {rolesColumns}
