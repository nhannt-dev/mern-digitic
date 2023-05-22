import React from 'react'
import { Banner, Sidebar, BestSeller, DealDaily, Feature, CustomSlider } from '../../components'
import { useSelector } from 'react-redux'
import icons from '../../utils/icons'

const { MdKeyboardArrowRight } = icons

const Home = () => {
  const { newProducts } = useSelector(state => state.product)
  const { categories } = useSelector(state => state.app)

  return (
    <>
      <div className='w-main flex mt-4'>
        <div className='flex flex-col gap-5 w-[25%] flex-auto'>
          <Sidebar />
          <DealDaily />
        </div>
        <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className='my-8'>
        <Feature />
      </div>
      <div className='my-8 w-full'>
        <h3 className='text-[20px font-semibold py-[15px] border-b-2 border-main uppercase'>new arrivals</h3>
        <div className='w-full mt-4 mx-[-10px]'>
          <CustomSlider products={newProducts} />
        </div>
      </div>
      <div className='my-8 w-full'>
        <h3 className='text-[20px font-semibold py-[15px] border-b-2 border-main uppercase'>hot collections</h3>
        <div className='flex flex-wrap gap-4 mt-4'>
          {categories?.filter(el => el?.brand.length > 0)?.map((el, index) => (
            <div key={index} className='w-[396px]'>
              <div className='border flex p-4 gap-4 min-h-[190px]'>
                <img src={el?.image} alt='nhannt' className='flex-1 w-[144px] h-[129px] object-cover' />
                <div className='flex-1 text-gray-700'>
                  <h4 className='font-semibold uppercase'>{el?.title}</h4>
                  <ul className='text-sm'>
                    {el?.brand?.map((item, index) => (
                      <span key={index} className='flex gap-2 items-center text-gray-500 cursor-pointer hover:text-main'>
                        <MdKeyboardArrowRight size={14} />
                        <li>{item}</li>
                      </span>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='my-8 w-full'>
        <h3 className='text-[20px font-semibold py-[15px] border-b-2 border-main uppercase'>blogs</h3>
      </div>
    </>
  )
}

export default Home