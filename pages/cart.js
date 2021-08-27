import { useContext } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { CartContext } from '@/src/components/context/CartContext'
import Layout from '@/src/Layout/Layout'
import CartItem from '@/src/components/Cart/CartItems'
import Carthead from '@/src/components/Cart/Carthead'



export default function cart() {
    const { cart } = useContext(CartContext)
    // console.log("cart ~ cart", cart)
    const router = useRouter()


    return (
        <Layout>
            <Head>
                <title>El-Dokkan | Shoping Bag</title>
            </Head>
            <div className="max-w-6xl mx-auto mt-20 px-2">
                <div className="text-center text-2xl font-bold py-10 text-gray-700">
                    Shoping Cart
                </div>
                <Carthead />
                {cart.itemsPriceTotal ? (
                    <>
                        {cart.items.map((item, idx) => <CartItem item={item} key={idx} />)}
                        <button onClick={() => router.push('/checkout')} className="mx-auto w-full">
                            <a className="flex mt-4 justify-between  mx-auto rounded  text-center overflow-hidden text-white bg-gray-700  group">
                                <span className="flex-1 py-2 text-white bg-purple-500 group-hover:bg-purple-600 flex items-center justify-center transition ease-linear">
                                    Checkout
                                </span>
                                <span className="pl-4 pr-5 py-2.5 flex flex-1">${' '}{cart.itemsPriceTotal.toFixed(2)}</span>
                            </a>
                        </button>
                    </>
                ) : (
                    <div className="text-center font-semibold text-lg h-40 flex items-center justify-center">
                        Your Cart is Empty, Please add products to keep shoping..!!
                    </div>
                )}
            </div>
        </Layout>
    )
}
