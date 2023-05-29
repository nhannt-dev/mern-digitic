import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct } from '../../apis'
import { Breadcrumb } from '../../components'
import Slider from 'react-slick'
import MagnifyImg from 'react-image-magnify'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
}

const DetailProduct = () => {
  const { pid, title, category } = useParams()
  const [product, setProduct] = useState(null)

  const fetchDetail = async () => {
    const response = await apiGetProduct(pid)
    if (response?.success) setProduct(response?.productData)
  }

  useEffect(() => {
    if (pid) fetchDetail()
  }, [pid])

  return (
    <div className='w-full mb-[500px]'>
      <div className='h-[81px] flex justify-center items-center bg-gray-100'>
        <div className='w-main'>
          <h3>{title}</h3>
          <Breadcrumb title={title} category={category} />
        </div>
      </div>
      <div className='w-main m-auto mt-4 flex'>
        <div className='flex flex-col gap-4 w-2/5'>
          <div className='h-[458px] w-[458px] border'>
            <MagnifyImg {...{
              smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: product?.thumb
              },
              largeImage: {
                src: product?.thumb,
                width: 1800,
                height: 1500
              }
            }} />
          </div>
          <div className='w-[458px]'>
            <Slider className='flex gap-2 justify-between' {...settings}>
              {product?.images?.map((el, index) => (
                <div className='flex-1' key={index}>
                  <img src={el} className='h-[143px] border object-cover' alt='nhannt-dev' />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className='w-2/5'></div>
        <div className='w-1/5'></div>
      </div>
    </div>
  )
}

export default DetailProduct