import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserActionsCell} from './UserActionsCell'
import {UserCustomHeader} from './UserCustomHeader'
import {User} from '../../core/_models'
import { Authorization } from '../../../../../../../lib/authorization'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Username' className='min-w-125px' />
    ),
    accessor: 'username',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Role' className='min-w-125px' />,
    id: 'role',
    Cell: ({...props}) => <>{props.data[props.row.index].role.name}</>,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <Authorization allowedPermissions={['update-user', 'delete-user']}><UserActionsCell user={props.data[props.row.index]} id={props.data[props.row.index].id} /></Authorization>,
  },
]

export {usersColumns}
