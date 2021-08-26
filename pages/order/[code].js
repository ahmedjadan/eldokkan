import { useContext, useState, useEffect } from 'react'
import Head from 'next/head'

import { useRouter } from 'next/router'
import Layout from '@/src/Layout/Layout'
import { CartContext } from '@/src/components/context/CartContext'
import Carthead from '@/src/components/Cart/Carthead';
import { patchOrder, fetchOrder } from '@/services/fetchData'
import PayButton from '@/src/components/PayButton'


export default function orders({ orderData }) {
    const router = useRouter()
    const [order, setOrder] = useState(null)
    const [refresh, setRefresh] = useState(0)
    const { cart, clearCart } = useContext(CartContext)

    console.log(orderData)
    useEffect(() => {
        setOrder(orderData)
    }, [refresh])

    const status = orderData.map(({ status }) => status)
    //console.log(status[0])

    const handlePaymentSuccess = async () => {
        try {
            const code = orderData.map(({ code }) => code)
            await patchOrder(code[0])
            setRefresh(refresh + 1)
            router.push(`/confirm/${code[0]}`)
            await clearCart(order)

        }
        catch (err) {
            console.log("🚀 ~ file: [code].js ~ line 34 ~ handlePaymentSuccess ~ err", err)
        }
    }
    console.log(order)

    return (
        <Layout>
            <Head>
                <title>El-Dokkan | Order</title>
            </Head>
            <div className="text-center text-2xl font-bold py-5 text-gray-700">
                Payment Information
            </div>
            <div className="max-w-6xl mx-auto mt-10 gap-2 grid-cols-1 px-2  grid md:grid-cols-6">
                <div className="grid col-span-4 ">
                    <Carthead />
                    {cart.items.map((item, idx) => (
                        <div className="flex h-full items-center justify-around   text-lg border-b" key={idx} >
                            <div className="">
                            </div>
                            <div className="flex-1 text-center px-4 py-1 text-gray-600 hidden md:flex">
                                <p className=" "> {item.name} </p>
                            </div>
                            <div className="flex-1 text-center text-gray-600 px-4 py-1 ">
                                <div className="flex justify-center items-center">
                                    <p className=" "> {item.qty} </p>
                                </div>
                            </div>
                            <div className="flex-1 text-center px-4 py-1 ">
                                <p className="text-gray-600"> ${' '}{item.price} </p>
                            </div>
                            <div className="flex-1 text-center px-4 py-1 hidden md:block text-gray-600">
                                <p className=" "> ${' '}{(item.price * item.qty).toFixed(2)} </p>
                            </div>

                        </div>
                    ))}
                    <div>
                        Total Amount: $ {cart.itemsPriceTotal}
                        <br />
                        <div className="bg-blue-50 p-2 rounded mt-4">

                            <p> use this account to pay the total amount: </p>
                            user: <span className="bg-indigo-200 p-1 rounded inline-block mt-2"> sb-v7c427181487@personal.example.com
                            </span> <br />
                            password: <span className="bg-indigo-200 p-1 rounded inline-block mt-2">1q+-)AEn

                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid col-span-2 mx-auto w-full">
                    {orderData && orderData.map((details, idx) => (
                        <>
                            {details.status && details.status !== 'paid' && (
                                <PayButton
                                    total={details.total}
                                    status={status}
                                    onSuccess={handlePaymentSuccess}
                                    key={idx}
                                />
                            )}
                        </>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
export async function getServerSideProps({ params: { code } }) {
    const orderData = await fetchOrder(`/orders/?code=${code}`)

    return {
        props: { orderData, }
    }
}