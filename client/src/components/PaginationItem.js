import React from 'react'
import clsx from 'clsx'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const PaginationItem = ({ children }) => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const location = useLocation()

  const handlePagi = () => {
    let queries = Object.fromEntries([...params])
    console.log(queries);
    if(Number(children)) queries.page = children
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString()
    })
  }
  return (
    <button disabled={!Number(children)} type='button' onClick={handlePagi} className={clsx('w-10 h-10 flex items-center justify-center hover:rounded-full', !Number(children) && 'items-end', Number(children) && 'items-center hover:bg-gray-300', +params.get('page') === +children && 'rounded-full bg-gray-300', !+params.get('page') && +children === 1 && 'rounded-full bg-gray-300')}>{children}</button>
  )
}

export default PaginationItem