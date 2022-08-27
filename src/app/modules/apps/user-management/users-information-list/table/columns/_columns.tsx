import {Column} from 'react-table'
import {UserActionsCell} from './UserActionsCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserInformationForm} from '../../core/_models'

const usersInformationColumns: ReadonlyArray<Column<UserInformationForm>> = [
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Email' className='min-w-125px' />
    ),
    accessor: 'email',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Role' className='min-w-125px' />,
    accessor: 'user_type',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersInformationColumns}
