import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct, apiGetProducts } from '../../apis'
import { Breadcrumb, Button, Quantity, ExtraInfo, ProductInfo, CustomSlider } from '../../components'
import Slider from 'react-slick'
import MagnifyImg from 'react-image-magnify'
import { roundPrice, formatMoney, renderStar, capitalize } from '../../utils/helpers'
import { extraInfo } from '../../utils/constants'
import * as DOMpurify from 'dompurify'
import clsx from 'clsx'

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
  const [currentImg, setCurrentImg] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [related, setRelated] = useState(null)
  const [update, setUpdate] = useState(false)
  const [variants, setVariants] = useState(null)

  const fetchDetail = async () => {
    const res = await apiGetProduct(pid)
    if (res?.success) {
      setProduct(res?.productData)
      setCurrentImg(res?.productData?.thumb)
    }
  }
  console.log(product)
  const fetchProducts = async () => {
    const res = await apiGetProducts({ category: capitalize(category) })
    if (res?.success) setRelated(res?.products)
  }

  const handleQuantity = useCallback((number) => {
    if (+number) setQuantity(+number)
  }, [quantity])

  const handleChangeQuantity = useCallback((flag) => {
    if (flag === 'minus' && quantity === 1) return
    if (flag === 'minus') setQuantity(qty => +qty - 1)
    if (flag === 'plus' && quantity === 10) return
    if (flag === 'plus') setQuantity(qty => +qty + 1)
  }, [quantity])

  const handleImg = (e, el) => {
    e.stopPropagation()
    setCurrentImg(el)
  }

  const reRender = useCallback(() => {
    setUpdate(!update)
  }, [update])

  useEffect(() => {
    if (pid) fetchProducts()
  }, [update])

  useEffect(() => {
    if (pid) {
      fetchDetail()
      fetchProducts()
      window.scrollTo(0, 0)
    }
  }, [pid])

  return (
    <div className='w-full mb-[500px]'>
      <div className='h-[81px] flex justify-center items-center bg-gray-100'>
        <div className='w-main'>
          <h3 className=' font-semibold'>{title}</h3>
          <Breadcrumb title={title} category={category} />
        </div>
      </div>
      <div className='w-main m-auto mt-4 flex'>
        <div className='flex flex-col gap-4 w-2/5'>
          <div className='h-[458px] w-[458px] border overflow-hidden'>
            <MagnifyImg {...{
              smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: currentImg
              },
              largeImage: {
                width: 1800,
                height: 1500,
                src: currentImg
              }
            }} className='my-auto' />
          </div>
          <div className='w-[458px]'>
            <Slider className='flex gap-2 justify-between' {...settings}>
              {product?.images?.map((el, index) => (
                <div className='flex-1' key={index}>
                  <img onClick={e => handleImg(e, el)} src={el} className='h-[143px] border object-cover cursor-pointer' alt='nhannt-dev' />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className='w-2/5 flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-[30px] font-bold'>{formatMoney(roundPrice(product?.price))} VND</h2>
            <span className='text-sm text-main'>{product?.quantity > 0 ? `Kho: ${product?.quantity}` : 'Sản phẩm đã hết hàng'}</span>
          </div>
          <div className='flex items-center gap-1'>
            {renderStar(product?.totalRatings)}
            <span className='text-sm text-main italic'>Đã bán: {product?.sold}</span>
          </div>
          <ul className='pl-4 list-square text-sm text-gray-500 leading-6'>
            {product?.description?.length > 1 && product?.description?.map((el, index) => (
              <li key={index}>{el}</li>
            ))}
            {product?.description?.length === 1 && <div className='text-sm line-clamp-6' dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(product?.description[0]) }}></div>}
          </ul>
          <div className='my-4 flex items-center gap-4'>
            <span className='font-bold'>Colors:</span>
            <div className='flex flex-wrap gap-4 items-center w-full'>
              {product?.variants?.map(el => (
                <div onClick={() => setVariants(el?._id)} className={clsx('flex items-center gap-2 p-2 border cursor-pointer', variants === el?._id && 'border-main')}>
                  <img src={el?.thumb} className='w-8 h-8 rounded-md object-cover' alt='nhannt-dev' />
                  <span className='flex flex-col'>
                    <span>{el?.color}</span>
                    <span className='text-sm'>{el?.price}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-8'>
            <div className='flex items-center gap-4'>
              <span className='font-semibold'>Quantity: </span>
              <Quantity quantity={quantity} handle={handleQuantity} handleChangeQuantity={handleChangeQuantity} />
            </div>
            <Button name={'Add to cart'} fw />
          </div>
        </div>
        <div className='w-1/5 p-4'>
          {extraInfo?.map((el, index) => (
            <ExtraInfo key={index} title={el.title} sub={el.sub} icon={el.icon} />
          ))}
        </div>
      </div>
      <div className='w-main m-auto mt-8'>
        <ProductInfo reRender={reRender} productName={product?.title} pid={pid} total={product?.totalRatings} totalReview={product?.ratings} />
      </div>
      <div className='w-main m-auto mt-8'>
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main uppercase'>Other Customers also buy:</h3>
        <CustomSlider products={related} />
      </div>
    </div>
  )
}

export default DetailProduct