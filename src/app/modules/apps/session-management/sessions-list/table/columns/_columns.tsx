import {Column} from 'react-table'
import {SessionActionCell} from './SessionActionsCell'
import {SessionCustomHeader} from './SessionCustomHeader'
import {Session} from '../../core/_models'
import { SessionInfoCell } from './SessionInfoCell'
import { Authorization } from '../../../../../../../lib/authorization'

const sessionsColumn: ReadonlyArray<Column<Session>> = [
  {
    Header: (props) => <SessionCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <SessionInfoCell session={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <SessionCustomHeader tableProps={props} title='Type' className='min-w-125px' />,
    id: 'type',
    accessor: 'type'
  },
  {
    Header: (props) => <SessionCustomHeader tableProps={props} title='Date' className='min-w-125px' />,
    id: 'date',
    accessor: 'date'
  },
  {
    Header: (props) => <SessionCustomHeader tableProps={props} title='Location' className='min-w-125px' />,
    id: 'location',
    accessor: 'location'
  },
  {
    Header: (props) => <SessionCustomHeader tableProps={props} title='Price' className='min-w-125px' />,
    id: 'price',
    accessor: 'price'
  },
  {
    Header: (props) => (
      <SessionCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <Authorization allowedPermissions={['update-session']}><SessionActionCell session={props.data[props.row.index]} id={props.data[props.row.index].id} /></Authorization>,
  },
]

export {sessionsColumn}
