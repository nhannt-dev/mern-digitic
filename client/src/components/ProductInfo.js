import React, { memo, useCallback, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Vote, Button, VoteModal, Comment } from '.'
import { renderStar } from '../utils/helpers'
import { apiRatings } from '../apis'
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from '../app/appSlice'
import Swal from 'sweetalert2'
import path from '../utils/path'
import { useNavigate } from 'react-router-dom'

const { LOGIN } = path

const tabs = ['description', 'warranty', 'delivery', 'payment', 'Comments & Ratings']

const ProductInfo = ({ total, totalReview, productName, pid, reRender }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn } = useSelector(state => state.user)

    const handleSubmitVoting = useCallback(async ({ comment, score }) => {
        if (!comment || !pid || !score) {
            alert('Vui lòng đánh giá đầy đủ')
            return
        }
        await apiRatings({ star: score, comment, pid, updatedAt: Date.now() })
        dispatch(showModal({isShowModal: false, modalChildren: null}))
        reRender()
    }, [])
    const handleVote = () => {
        if (!isLoggedIn) Swal.fire({
            text: 'Vui lòng đăng nhập để thực hiện thao tác này',
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Đi đến đăng nhập',
            title: 'Thông báo',
            showCancelButton: true
        }).then(response => {
            if (response.isConfirmed) navigate(`/${LOGIN}`)
        })
        else {
            dispatch(showModal({ isShowModal: true, modalChildren: <VoteModal productName={productName} handleSubmitVoting={handleSubmitVoting} /> }))
        }
    }

    return (
        <Tabs>
            <TabList>
                {tabs.map((el, index) => (
                    <Tab key={index}>
                        <span className='uppercase'>{el}</span>
                    </Tab>
                ))}
            </TabList>

            <TabPanel>
                <div className='border rounded-md p-3'>
                    Technology: GSM / HSPA / LTE
                    Dimensions: 144.6 x 69.2 x 7.3 mm
                    Weight: 129 g
                    Display: IPS LCD 5.15 inches
                    Resolution: 1080 x 1920
                    OS: Android OS, v6.0 (Marshmallow)
                    Chipset: Snapdragon 820
                    CPU: Quad-core
                    Internal: 32GB/64GB/128GB
                    Camera: 16 MP, f/2.0 - 4 MP, f/2.0
                    It's been a while since we met the last of the Mi kind. Even though the Xiaomi Mi 4 went on sale back in the summer of 2014, it succeeded in staying relevant for over 20 months and surpassed the lifespan of many competitors. Xiaomi surely took the time to make the Mi 5 worthy of the flagship series name.
                    The Mi 5 was the first Xiaomi phone to be unveiled under the massive spotlight of the world's biggest mobile expo - the MWC in Barcelona. And with its stunning looks and capable performance, the Mi 5 deserved nothing less.
                    The Xiaomi Mi 5 is instantly likeable - the new flagship comes with unbelievably thin bezels, a sharp profile, a curved back and a lightweight body - all adding to one of the most impressive exteriors a modern smartphones can hope for.
                    Then you learn that inside there is the latest Snapdragon 820 chipset, a new 16MP camera with 4-axis optical stabilization and yet no camera hump, generous storage options, rich connectivity options, and a beefy battery. How about that?
                </div>
            </TabPanel>
            <TabPanel>
                <div className='border rounded-md p-3'>
                    WARRANTY INFORMATION
                    LIMITED WARRANTIES
                    Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
                    Frames Used In Upholstered and Leather Products
                    Limited Lifetime Warranty
                    A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.
                </div>
            </TabPanel>
            <TabPanel>
                <div className='border rounded-md p-3'>
                    PURCHASING & DELIVERY
                    Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
                    Picking up at the store
                    Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
                    Delivery
                    Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
                    In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.
                </div>
            </TabPanel>
            <TabPanel>
                <div className='border rounded-md p-3'>
                    PURCHASING & DELIVERY
                    Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
                    Picking up at the store
                    Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
                    Delivery
                    Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
                    In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.
                </div>
            </TabPanel>
            <TabPanel>
                <div className='border rounded-md p-3 flex'>
                    <div className='flex-4 flex-col border flex items-center justify-center'>
                        <span className='font-semibold text-3xl'>{total}/5</span>
                        <span className='flex items-center gap-1'>{renderStar(total)}</span>
                        <span>{totalReview?.length} lượt đánh giá</span>
                    </div>
                    <div className='flex-6 p-4 flex gap-2 flex-col-reverse border'>
                        {Array.from(Array(5).keys()).map((el, index) => (
                            <Vote key={index} num={+el + 1} ratingCount={totalReview?.filter(i => i.star === el + 1)?.length} total={totalReview?.length} />
                        ))}
                    </div>
                </div>
                <div className='p-4 flex items-center justify-center text-sm flex-col gap-2'>
                    <span>Viết đánh giá</span>
                    <Button handleOnClick={handleVote} name='Đánh giá ngay' />
                </div>
                <div className='flex flex-col gap-4'>
                    {totalReview?.map((el, index) => (
                        <Comment key={index} name={`${el?.postedBy?.firstname} ${el?.postedBy?.lastname}`} star={el?.star} updatedAt={el?.updatedAt} content={el?.comment}/>
                    ))}
                </div>
            </TabPanel>
        </Tabs>
    )
}

export default memo(ProductInfo)
