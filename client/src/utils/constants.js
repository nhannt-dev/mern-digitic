import path from './path'

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