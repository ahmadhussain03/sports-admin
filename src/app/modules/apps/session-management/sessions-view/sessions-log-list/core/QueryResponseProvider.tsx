/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState, useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import {
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  QUERIES,
  stringifyRequestQuery,
  WithChildren,
} from '../../../../../../../_metronic/helpers'
import { getSessionLogs } from './_requests'
import { SessionLog } from './_models'
import { useQueryRequest } from './QueryRequestProvider'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const QueryResponseContext = createResponseContext<SessionLog>(initialQueryResponse)
const QueryResponseProvider: FC<WithChildren> = ({ children }) => {
  const { state } = useQueryRequest()
  const navigation = useNavigate()
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

  const { id } = useParams()

  if (!id) {
    navigation('/error/404')
  }

  const sessionId = id as string

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery])

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    [QUERIES.SESSION_LOG_LIST, sessionId, query],
    () => {
      return getSessionLogs(query, sessionId)
    },
    { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
  )

  return (
    <QueryResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const { response } = useQueryResponse()
  if (!response) {
    return []
  }

  return response?.data || []
}

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    ...initialQueryState,
    current_page: 1,
    per_page: 15,
  }

  const { response } = useQueryResponse()

  if (!response || !response.meta) {
    return defaultPaginationState
  }

  return response.meta
}

const useQueryResponseLoading = (): boolean => {
  const { isLoading } = useQueryResponse()
  return isLoading
}

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
}
