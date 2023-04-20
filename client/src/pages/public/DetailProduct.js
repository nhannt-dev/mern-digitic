import React from 'react'
import { useParams } from 'react-router-dom'

const DetailProduct = () => {
  const {pid, title} = useParams()
  console.log(pid, title)
  return (
    <div></div>
  )
}

export default DetailProduct