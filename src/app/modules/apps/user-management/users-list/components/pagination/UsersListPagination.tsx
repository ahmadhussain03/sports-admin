/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useQueryResponseLoading, useQueryResponsePagination} from '../../core/QueryResponseProvider'
import {useQueryRequest} from '../../core/QueryRequestProvider'

interface Links {
  active: boolean
  url: string | null
  label: string
  page: number | null
}

const mappedLabel = (label: string): string => {
  if (label === '&laquo; Previous') {
    return 'Previous'
  }

  if (label === 'Next &raquo;') {
    return 'Next'
  }

  return label
}

const UsersListPagination = () => {
  const pagination = useQueryResponsePagination()
  const isLoading = useQueryResponseLoading()
  const {updateState} = useQueryRequest()
  const updatePage = (page: number | null) => {
  
    if (!page || isLoading || pagination.current_page === page) {
      return
    }

    updateState({ current_page: page })
  }

  const links = () => {
    const linksLength = Math.floor(pagination.total / pagination.per_page)
    const links: Links[] = Array.from({length: linksLength}, (_, i) => ({ active: pagination.current_page === i + 1, url: `/page?=${i+1}`, label: (i+1).toString(), page: i+1 }));

    links.unshift({ active: !!pagination.previous_page_url, url: null, label: '&laquo; Previous', page: pagination.current_page > 1 ? pagination.current_page - 1 : null })
    links.push({ active: !!pagination.next_page_url, url: null, label: 'Next &raquo;', page: pagination.current_page !== linksLength ? pagination.current_page + 1 : null })

    return links
  }

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate'>
          <ul className='pagination'>
            { links().map((link) => (
                <li
                  key={link.label}
                  className={clsx('page-item', {
                    active: pagination.current_page === link.page,
                    disabled: isLoading,
                    previous: link.label === 'Previous',
                    next: link.label === 'Next',
                  })}
                >
                  <a
                    className={clsx('page-link', {
                      'page-text': mappedLabel(link.label) === 'Previous' || mappedLabel(link.label) === 'Next',
                      'me-5': mappedLabel(link.label) === 'Previous',
                    })}
                    onClick={() => updatePage(link.page)}
                    style={{cursor: 'pointer'}}
                  >
                    {mappedLabel(link.label)}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export {UsersListPagination}
