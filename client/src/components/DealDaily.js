import React, { memo, useEffect, useState } from 'react'
import icons from '../utils/icons'
import { apiGetProducts } from '../apis'
import { renderStar, formatMoney, secondsToHms } from '../utils/helpers'
import Countdown from './Countdown'
import moment from 'moment'

const { AiFillStar, HiMenu } = icons

let idInterval

const today = `${moment().format('MM/DD/YYYY')} 9:00:00`
const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000
const number = secondsToHms(seconds)

const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState(null)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [expire, setExpire] = useState(false)
  const fetchDealDaily = async () => {
    const res = await apiGetProducts({ limit: 1, page: Math.round(Math.random() * 10), totalRatings: 5 })
    if (res?.success) {
      setDealDaily(res?.products[0])
      setHour(number.h)
      setMinute(number.m)
      setSecond(number.s)
    } else {
      setHour(0)
      setMinute(59)
      setSecond(59)
    }
  }

  useEffect(() => {
    idInterval && clearInterval(idInterval)
    fetchDealDaily()
  }, [expire])

  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setSecond(prev => prev - 1)
      else {
        if (minute > 0) {
          setMinute(prev => prev - 1)
          setSecond(59)
        } else {
          if (hour > 0) {
            setHour(prev => prev - 1)
            setMinute(59)
            setSecond(59)
          } else {
            setExpire(!expire)
          }
        }
      }
    }, 1000)
    return () => clearInterval(idInterval)
  }, [second, minute, hour, expire])

  return (
    <div className='border w-full flex-auto'>
      <div className='flex items-center justify-between p-4 w-full'>
        <span className='flex-1 flex justify-center'><AiFillStar color='red' size={20} /></span>
        <span className='flex-8 text-gray-700 font-semibold text-[20px] text-center'>DEAL DAILY</span>
        <span className='flex-1'></span>
      </div>
      <div className='flex w-full flex-col items-center pt-8 px-4 gap-2'>
        <img src={dealDaily?.thumb || 'https://t4.ftcdn.net/jpg/05/75/04/63/240_F_575046386_GObMZs7kBHMT9I1luFChgaWli8WcZiQy.jpg'} alt='nhannt' className='w-full object-contain' />
        <span className='line-clamp-1 text-center'>{dealDaily?.title}</span>
        <span className='flex h-4'>{renderStar(dealDaily?.totalRatings, 20)?.map((el, index) => (
          <span key={index}>{el}</span>
        ))}</span>
        <span>{formatMoney(dealDaily?.price)} VND</span>
      </div>
      <div className='px-4 mt-8'>
        <div className='flex justify-center gap-2 items-center mb-4'>
          <Countdown unit={'Hours'} number={hour} />
          <Countdown unit={'Minutes'} number={minute} />
          <Countdown unit={'Seconds'} number={second} />
        </div>
        <button type='button' className='flex gap-2 py-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium' >
          <HiMenu />
          <span>Options</span>
        </button>
      </div>
    </div>
  )
}

export default memo(DealDaily)