import {Column} from 'react-table'
import {PlayerActionCell} from './PlayerActionsCell'
import {TeamCustomHeader} from './TeamCustomHeader'
import {Player} from '../../core/_models'
import { PlayerInfoCell } from './PlayerInfoCell'
import { Authorization } from '../../../../../../../lib/authorization'

const playersColumns: ReadonlyArray<Column<Player>> = [
  {
    Header: (props) => <TeamCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <PlayerInfoCell player={props.data[props.row.index]} />,
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
    Header: (props) => <TeamCustomHeader tableProps={props} title='Address' className='min-w-125px' />,
    id: 'address',
    accessor: 'address'
  },
  {
    Header: (props) => <TeamCustomHeader tableProps={props} title='Notes' className='min-w-125px' />,
    id: 'notes',
    accessor: 'notes'
  },
  {
    Header: (props) => (
      <TeamCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <Authorization allowedPermissions={['update-player', 'delete-player']}><PlayerActionCell player={props.data[props.row.index]} id={props.data[props.row.index].id} /></Authorization>,
  },
]

export {playersColumns}
