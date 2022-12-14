import { useRef } from 'react'
import {KTSVG, QUERIES} from '../../../../../../../_metronic/helpers'
import { useNavigate } from 'react-router-dom';
import { importPlayers } from '../../core/_requests';
import { toast } from 'react-toastify';
import { useQueryResponse } from '../../core/QueryResponseProvider';
import {useQueryClient} from 'react-query'
import { Authorization } from '../../../../../../../lib/authorization';

const PlayerListToolbar = () => {
  const navigation = useNavigate()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()
  const inputFileRef = useRef<HTMLInputElement>(null) 

  const onFileUploadClick = () => {
    inputFileRef?.current?.click()
  }

  const onFileSelect = async (event: any) => {
    if(event.target.files.length) {
      const file = event.target.files[0]
      
      try {
        await toast.promise(
            importPlayers(file),
            {
              pending: 'Processing File.',
              success: 'Players Imported Successfully 👌',
              error: 'Error Occur While Processing File.🤯'
            }
          )

        queryClient.invalidateQueries([`${QUERIES.PLAYER_LIST}-${query}`])
        
      } catch (error: any) {
        toast.error('Error Occur While Processing File.🤯')
      }
    }
    event.target.value = ''
  }

  const redirectAddTeam = () => {
    navigation('/player-management/players/create')
  }

  const redirectUncategorizedPlayers = () => {
    navigation('/uncategorized-player-management/players')
  }

  const redirectPlayerInformationForm = () => {
    navigation('/player-management/players/information-form')
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <UsersListFilter /> */}

      {/* begin::Add user */}
       <Authorization allowedPermissions={['view-player-request-form']}>
        <button type='button' className='btn btn-info me-3' onClick={redirectPlayerInformationForm}>
          <KTSVG path='/media/icons/duotune/files/fil001.svg' className='svg-icon-2' />
          Player Information Form
        </button>
       </Authorization>
      {/* end::Add user */}

      <Authorization allowedPermissions={['import-player']}>
        <input type="file" style={{display: 'none'}} ref={inputFileRef} onInput={onFileSelect} />
        {/* begin::Export */}
        <button type='button' className='btn btn-light-primary me-3' onClick={onFileUploadClick}>
          <KTSVG path='/media/icons/duotune/files/fil010.svg' className='svg-icon-2' />
          Upload Sheet
        </button>
      </Authorization>

      {/* begin::Export */}
      <Authorization allowedPermissions={['view-uncategorized-player']}>
        <button type='button' className='btn btn-success me-3' onClick={redirectUncategorizedPlayers}>
          <KTSVG path='/media/icons/duotune/files/fil001.svg' className='svg-icon-2' />
          Uncategorized Players
        </button>
      </Authorization>
      {/* end::Export */}

      {/* begin::Add user */}
      <Authorization allowedPermissions={['create-player']}>
        <button type='button' className='btn btn-primary' onClick={redirectAddTeam}>
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          Add Player
        </button>
      </Authorization>
      {/* end::Add user */}
    </div>
  )
}

export {PlayerListToolbar}
