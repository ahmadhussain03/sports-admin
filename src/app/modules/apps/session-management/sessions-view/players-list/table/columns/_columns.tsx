import { Column } from 'react-table'
import { PlayerActionCell } from './PlayerActionsCell'
import { TeamCustomHeader } from './TeamCustomHeader'
import { Player } from '../../core/_models'
import { PlayerInfoCell } from './PlayerInfoCell'
import { PlayerPaidCell } from './PlayerPaidCell'
import { PlayerRsvpCell } from './PlayerRsvpCell'
import { PlayerAttendanceCell } from './PlayerAttendanceCell'
import { Authorization } from '../../../../../../../../lib/authorization'

const playersColumns: ReadonlyArray<Column<Player>> = [
  {
    Header: (props) => <TeamCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({ ...props }) => <PlayerInfoCell player={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <TeamCustomHeader tableProps={props} title='Phone Number' className='min-w-125px' />,
    id: 'phone_number',
    accessor: 'phone_number'
  },
  {
    Header: (props) => <TeamCustomHeader tableProps={props} title='Email' className='min-w-125px' />,
    id: 'email',
    accessor: 'email'
  },
  {
    Header: (props) => <TeamCustomHeader isCenter={true} tableProps={props} title='RSVP' className='min-w-125px' />,
    id: 'rsvp',
    accessor: 'pivot_rsvp',
    Cell: ({ ...props }) => <PlayerRsvpCell player={props.data[props.row.index]} />
  },
  {
    Header: (props) => <TeamCustomHeader isCenter={true} tableProps={props} title='Paid' className='min-w-125px' />,
    id: 'paid',
    accessor: 'pivot_paid',
    Cell: ({ ...props }) => <PlayerPaidCell player={props.data[props.row.index]} />
  },
  {
    Header: (props) => <TeamCustomHeader isCenter={true} tableProps={props} title='Attendance' className='min-w-125px' />,
    id: 'attendance',
    accessor: 'pivot_attendance',
    Cell: ({ ...props }) => <PlayerAttendanceCell player={props.data[props.row.index]} />
  },
  {
    Header: (props) => (
      <TeamCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({ ...props }) => <Authorization allowedPermissions={['remove-session-players']}><PlayerActionCell player={props.data[props.row.index]} id={props.data[props.row.index].id} /></Authorization>,
  },
]

export { playersColumns }
