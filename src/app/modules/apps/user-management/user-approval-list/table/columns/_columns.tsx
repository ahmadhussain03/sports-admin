import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserCustomHeader} from './UserCustomHeader'
import {User} from '../../core/_models'
import { UserApprovalCell } from './UserApprovalCell'
import { Authorization } from './../../../../../../../lib/authorization';

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
    accessor: 'user_type',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Approve/Reject' className='text-center min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <Authorization allowedPermissions={['reject-user-request', 'approve-user-request']}><UserApprovalCell user={props.data[props.row.index]} /></Authorization>,
  },
]

export {usersColumns}
