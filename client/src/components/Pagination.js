import React from 'react'
import usePagination from '../utils/pagination'
import { PaginationItem } from '.'
import { useSearchParams } from 'react-router-dom'

const Pagination = ({ total }) => {
  const pagination = usePagination(total, 2)
  const [params] = useSearchParams()
  const range = () => {
    const currentPage = +params.get('page')
    const pageSize = 10
    const start = ((currentPage - 1) * pageSize) + 1
    const end = Math.min(currentPage * pageSize, total)
    return `${start}-${end}`
  }
  return (
    <div className='flex w-main justify-between items-center'>
      {!+params.get('page') && <span className='text-sm italic'>Hiển thị 1 - 10 trong số {total} sản phẩm</span>}
      {+params.get('page') && <span className='text-sm italic'>Hiển thị {range()} trong số {total} sản phẩm</span>}
      <div className='flex items-center'>
        {pagination?.map((el, index) => (
          <PaginationItem key={index}>{el}</PaginationItem>
        ))}
      </div>
    </div>
  )
}

export default Pagination