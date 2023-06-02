import icons from './icons'
import path from './path'

const { BsShieldShaded, BsReplyFill, AiFillGift, RiTruckFill, FaTty } = icons
const { HOME, PRODUCTS, BLOGS, OUR_SERVICES, FAQ } = path

export const navigation = [
    {
        id: 1,
        value: 'HOME',
        path: `/${HOME}`
    },
    {
        id: 2,
        value: 'PRODUCTS',
        path: `/${PRODUCTS}`
    },
    {
        id: 3,
        value: 'BLOGS',
        path: `/${BLOGS}`
    },
    {
        id: 4,
        value: 'OUR SERVICES',
        path: `/${OUR_SERVICES}`
    },
    {
        id: 5,
        value: 'FAQs',
        path: `/${FAQ}`
    }
]

export const extraInfo = [
    {
        title: 'guarantee',
        sub: 'Quality checked',
        icon: <BsShieldShaded />
    },
    {
        title: 'Free Shipping',
        sub: 'Free on all products',
        icon: <RiTruckFill />
    },
    {
        title: 'Special gift cards',
        sub: 'Special gift cards',
        icon: <AiFillGift />
    },
    {
        title: 'Free return',
        sub: 'Within 7 days',
        icon: <BsReplyFill />
    },
    {
        title: 'Consultancy',
        sub: 'Lifetime 24/7/356',
        icon: <FaTty />
    }
]
