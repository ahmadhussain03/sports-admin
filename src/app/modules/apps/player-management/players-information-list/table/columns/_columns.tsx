import {Column} from 'react-table'
import {PlayerActionCell} from './PlayerActionsCell'
import {PlayerCustomHeader} from './PlayerCustomHeader'
import {PlayerInformationForm} from '../../core/_models'
import { Authorization } from '../../../../../../../lib/authorization'

const playersInformationColumns: ReadonlyArray<Column<PlayerInformationForm>> = [
  {
    Header: (props) => <PlayerCustomHeader tableProps={props} title='Email' className='min-w-125px' />,
    id: 'email',
    Cell: ({...props}) => <>{props.data[props.row.index].email}</>,
  },
  {
    Header: (props) => (
      <PlayerCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <Authorization allowedPermissions={['delete-player-request-form']}><PlayerActionCell id={props.data[props.row.index].id} /></Authorization>,
  },
]

export {playersInformationColumns}
