import icons from './icons'
import path from './path'

const { BsShieldShaded, BsReplyFill, AiFillGift, RiTruckFill, FaTty, AiOutlineDashboard, MdGroups, BsFillBoxFill, RiBillFill, AiOutlineProfile, AiOutlineShoppingCart, AiOutlineHistory, MdOutlineFavoriteBorder } = icons
const { HOME, PRODUCTS, BLOGS, OUR_SERVICES, FAQ, ADMIN, DASHBOARD, MANAGE_USER, CREATE_PRODUCT, MANAGE_PRODUCTS, MANAGE_ORDER, MEMBER, PROFILE, CART, HISTORY, WISHLIST } = path

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

export const colors = ['mediumvioletred', 'deeppink', 'palevioletred', 'hotpink',
    'lightpink', 'pink', 'darkred', 'red', 'firebrick', 'crimson',
    'indianred', 'lightcoral', 'salmon', 'darksalmon',
    'lightsalmon', 'orangered', 'tomato', 'darkorange', 'coral',
    'orange', 'darkkhaki', 'gold', 'khaki', 'peachpuff', 'yellow',
    'palegoldenrod', 'moccasin', 'papayawhip', 'lightgoldenrodyellow',
    'lemonchiffon', 'lightyellow', 'maroon', 'brown', 'saddlebrown', 'sienna',
    'chocolate', 'darkgoldenrod', 'peru', 'rosybrown', 'goldenrod',
    'sandybrown', 'tan', 'burlywood', 'wheat', 'navajowhite', 'bisque',
    'blanchedalmond', 'cornsilk', 'darkgreen', 'green', 'darkolivegreen',
    'forestgreen', 'seagreen', 'olive', 'olivedrab', 'mediumseagreen',
    'limegreen', 'lime', 'springgreen', 'mediumspringgreen', 'darkseagreen',
    'mediumaquamarine', 'yellowgreen', 'lawngreen', 'chartreuse', 'lightgreen',
    'greenyellow', 'palegreen', 'teal', 'darkcyan', 'lightseagreen',
    'cadelblue', 'darkturquoise', 'mediumturquoise', 'turquoise', 'aqua',
    'cyan', 'aquamarine', 'paleturquoise', 'lightcyan', 'navy', 'darkblue',
    'mediumblue', 'blue', 'midnightblue', 'royalblue', 'steelblue',
    'dodgerblue', 'deepskyblue', 'cornflowerblue', 'skyblue', 'lightskyblue',
    'lightsteelblue', 'lightblue', 'powderblue', 'indigo', 'purple',
    'darkmagenta', 'darkviolet', 'darkslateblue', 'blueviolet', 'darkorchid',
    'fuchsia', 'magenta', 'slateblue', 'mediumslateblue',
    'mediumorchid', 'mediumpurple', 'orchid', 'violet', 'plum',
    'thistle', 'lavender', 'mistyrose', 'antiquewhite', 'linen',
    'beige', 'whitesmoke', 'lavenderblush', 'oldlace', 'aliceblue',
    'seashell', 'ghostwhite', 'honeydew', 'foralwhite', 'azure',
    'mintcream', 'snow', 'ivory', 'white', 'black', 'darkslategray',
    'dimgray', 'slategrey', 'gray', 'lightslategray', 'darkgray',
    'silver', 'lightgray', 'gainsboro']

export const sortBy = [
    {
        id: 1,
        value: '-sold',
        text: 'Best selling'
    },
    {
        id: 2,
        value: '-title',
        text: 'Alphabetically, A-Z'
    },
    {
        id: 3,
        value: 'title',
        text: 'Alphabetically, A-Z'
    },
    {
        id: 4,
        value: 'price',
        text: 'Price, low to high'
    },
    {
        id: 5,
        value: '-price',
        text: 'Price, high to low'
    },
    {
        id: 6,
        value: '-createdAt',
        text: 'Date, old to new'
    },
    {
        id: 7,
        value: 'createdAt',
        text: 'Date, new to old'
    }
]

export const status = [
    'Rất tệ',
    'Tệ',
    'Thường',
    'Tốt',
    'Rất tốt'
]

export const menuItemsAdmin = [
    {
        type: 'single',
        text: 'Dashboard',
        path: `/${ADMIN}/${DASHBOARD}`,
        icon: <AiOutlineDashboard />
    },
    {
        type: 'single',
        text: 'Manage users',
        path: `/${ADMIN}/${MANAGE_USER}`,
        icon: <MdGroups />
    },
    {
        type: 'sub',
        text: 'Product',
        path: `/${ADMIN}/${MANAGE_USER}`,
        icon: <BsFillBoxFill />,
        submenu: [
            {
                text: 'Create product',
                path: `/${ADMIN}/${CREATE_PRODUCT}`
            },
            {
                text: 'Manage product',
                path: `/${ADMIN}/${MANAGE_PRODUCTS}`
            }
        ]
    },
    {
        type: 'single',
        text: 'Manage Order',
        path: `/${ADMIN}/${MANAGE_ORDER}`,
        icon: <RiBillFill />
    },
]

export const menuItemsUser = [
    {
        type: 'single',
        text: 'Profile',
        path: `/${MEMBER}/${PROFILE}`,
        icon: <AiOutlineProfile />
    },
    {
        type: 'single',
        text: 'Cart',
        path: `/${MEMBER}/${CART}`,
        icon: <AiOutlineShoppingCart />
    },
    {
        type: 'single',
        text: 'History',
        path: `/${MEMBER}/${HISTORY}`,
        icon: <AiOutlineHistory />
    },
    {
        type: 'single',
        text: 'Wishlist',
        path: `/${MEMBER}/${WISHLIST}`,
        icon: <MdOutlineFavoriteBorder />
    },
]

export const roles = [
    {
        value: 'Admin'
    },
    {
        value: 'User'
    }
]

export const isBlockedStatus = [
    {
        value: true
    },
    {
        value: false
    }
]