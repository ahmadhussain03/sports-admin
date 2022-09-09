import { Column } from 'react-table'
import { PlayerInfoCell } from './PlayerInfoCell'
import { Player } from '../../../../player-management/players-list/core/_models'
import { PlayerCustomHeader } from './PlayerCustomHeader'
import { PlayerAmountCell } from './PlayerAmountCell'

const playersColumns: ReadonlyArray<Column<Player>> = [
  {
    Header: (props) => <PlayerCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({ ...props }) => <PlayerInfoCell player={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <PlayerCustomHeader tableProps={props} title='Outstanding Payment' className='min-w-125px' />,
    id: 'outstanding_payment',
    accessor: 'payment_outstanding_count'
  },
  {
    Header: (props) => <PlayerCustomHeader tableProps={props} title='Payments Made' className='min-w-125px' />,
    id: 'payment_made',
    accessor: 'payment_made'
  },
  {
    Header: (props) => <PlayerCustomHeader tableProps={props} title='Amount' className='min-w-125px' />,
    id: 'amount',
    Cell: ({ ...props }) => <PlayerAmountCell player={props.data[props.row.index]} />
  }
]

export { playersColumns }
