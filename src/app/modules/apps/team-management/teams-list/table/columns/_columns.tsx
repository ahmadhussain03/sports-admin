import {Column} from 'react-table'
import {TeamActionsCell} from './TeamActionsCell'
import {TeamCustomHeader} from './TeamCustomHeader'
import {Team} from '../../core/_models'
import { TeamInfoCell } from './TeamInfoCell'
import { Authorization } from '../../../../../../../lib/authorization'

const usersColumns: ReadonlyArray<Column<Team>> = [
  {
    Header: (props) => <TeamCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <TeamInfoCell team={props.data[props.row.index]} />
  },
  {
    Header: (props) => (
      <TeamCustomHeader tableProps={props} title='League' className='min-w-125px' />
    ),
    accessor: 'league',
  },
  {
    Header: (props) => (
      <TeamCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <Authorization allowedPermissions={['update-team', 'delete-team']}><TeamActionsCell team={props.data[props.row.index]} id={props.data[props.row.index].id} /></Authorization>,
  },
]

export {usersColumns}
