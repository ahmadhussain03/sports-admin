import { Column } from 'react-table'
import { SessionCustomHeader } from './SessionCustomHeader'
import { SessionLog } from '../../core/_models'
import { SessionInfoCell } from './SessionInfoCell'
import { SessionDateCell } from './SessionDateCell'

const sessionsColumn: ReadonlyArray<Column<SessionLog>> = [
  {
    Header: (props) => <SessionCustomHeader tableProps={props} title='User' className='min-w-125px' />,
    id: 'user',
    Cell: ({ ...props }) => <SessionInfoCell sessionLog={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <SessionCustomHeader tableProps={props} title='Action' className='min-w-125px' />,
    id: 'action',
    accessor: 'action'
  },
  {
    Header: (props) => <SessionCustomHeader tableProps={props} title='Date' className='min-w-125px' />,
    id: 'created_at',
    Cell: ({...props}) => <SessionDateCell sessionLog={props.data[props.row.index]} />
  },
]

export { sessionsColumn }
