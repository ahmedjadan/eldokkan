import Link from 'next/link'
import { useContext } from 'react'
import { CartContext } from '@/components/context/CartContext'


export default function Navbar() {
    const { cart } = useContext(CartContext)
    //console.log(cart)
    return (
        <nav className=" sticky top-0 bg-gray-50 z-50 mx-auto pt-10 pb-4 px-4  max-w-7xl w-full">
            <div className="flex items-center justify-between mx-auto ">
                <div className="">
                    <Link href="/">
                        <a>
                            <h1 className="text-2xl font-semibold text-gray-700">
                                El-Dokkan
                            </h1>
                        </a>
                    </Link>
                </div>
                <div className="">
                    <div className="flex items-center">
                        <ul className="flex items-center space-x-6 text-gray-700 font-semibold">
                            <li>
                                <Link href="/" >
                                    <a> Home </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" >
                                    <a> Products </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" >
                                    <a className="flex items-center relative"><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-600 mx-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                        {cart?.itemsCountTotal > 0 ? (
                                            <span className="absolute -top-2  rounded-full bg-indigo-100 h-5 w-5 text-center flex items-center justify-center text-gray-600 font-semibold">{cart.itemsCountTotal}  </span>
                                        ) : ''}
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
