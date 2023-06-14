import { useMemo } from 'react'
import { range } from './helpers'
import icons from './icons'

const { BiDotsHorizontalRounded } = icons

const usePagination = (totalProduct, currentPage, sibling = 1) => {
  const pagiArr = useMemo(() => {
    const pageSize = process.env.REACT_APP_PRODUCT_LIMIT || 10
    const pagiCount = Math.ceil(+totalProduct / +pageSize)
    const totalPagiItem = +sibling + 5
    if (pagiCount <= totalPagiItem) return range(1, pagiCount)
    const isShowLeft = currentPage - sibling > 2
    const isShowRight = currentPage + sibling < pagiCount - 1

    if (isShowLeft && !isShowRight) {
      const rightStart = pagiCount - 4
      const rightRange = range(rightStart, pagiCount)
      return [1, <BiDotsHorizontalRounded />, ...rightRange]
    }
    if (!isShowLeft && isShowRight) {
      const leftRange = range(1, 5)
      return [...leftRange, <BiDotsHorizontalRounded />, pagiCount]
    }
    if (isShowLeft && isShowRight) {
      const left = Math.max(currentPage - sibling, 1)
      const right = Math.min(currentPage + sibling, pagiCount)
      const middle = range(left, right)
      return [1, <BiDotsHorizontalRounded />, ...middle, <BiDotsHorizontalRounded />, pagiCount]
    }
    
  }, [totalProduct, currentPage, sibling])
  return pagiArr
}

export default usePagination