import {Column} from 'react-table'
import {TeamActionsCell} from './TeamActionsCell'
import {TeamCustomHeader} from './TeamCustomHeader'
import {Team} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<Team>> = [
  {
    Header: (props) => <TeamCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    accessor: 'name',
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
    Cell: ({...props}) => <TeamActionsCell team={props.data[props.row.index]} id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
