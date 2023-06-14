import React from 'react'
import clsx from 'clsx'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'

const PaginationItem = ({ children }) => {
  const navigate = useNavigate()
  const {category} = useParams()
  const [params] = useSearchParams()
  const handlePagi = () => {
    let param = []
    const queries = {}
    for (let i of params.entries()) param.push(i)
    for (let i of param) queries[i[0]] = i[1]
    if(Number(children)) queries.page = children
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString()
    })
  }
  return (
    <button disabled={!Number(children)} type='button' onClick={handlePagi} className={clsx('w-10 h-10 flex items-center justify-center hover:rounded-full', !Number(children) && 'items-end', Number(children) && 'items-center hover:bg-gray-300', +params.get('page') === +children && 'rounded-full bg-gray-300', !+params.get('page') && +children === 1 && 'rounded-full bg-gray-300')}>{children}</button>
  )
}

export default PaginationItem