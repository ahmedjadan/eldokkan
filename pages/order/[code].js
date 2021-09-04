import { useContext, useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import Layout from '@/src/Layout/Layout'
import { CartContext } from '@/src/components/context/CartContext'
import Carthead from '@/src/components/Cart/Carthead';
import { patchOrder, fetchOrder } from '@/services/fetchData'
import PayButton from '@/src/components/PayButton'


export default function orders() {
    const router = useRouter()
    const [order, setOrder] = useState(null)
    const [orderProducts, setOrderProducts] = useState(null)
    const [refresh, setRefresh] = useState(0)
    const { cart, clearCart } = useContext(CartContext)

    const { query } = useRouter()

    useEffect(() => {
        const fetchOrdersOut = async () => {
            try {
                const orderData = await fetchOrder(`/orders/?code=${query.code}`)
                console.log("fetchOrdersOut ~ orderData", orderData)
                setOrder(orderData)
                const [orderProducts] = await orderData?.map(({ products }) => products)
                setOrderProducts(orderProducts)
            } catch (e) {
                console.log("fetchOrdersOut ~ e", e)
            }
        }
        fetchOrdersOut()

    }, [refresh, query.code,])

    const handlePaymentSuccess = async () => {
        try {
            await patchOrder(query.code)
            setRefresh(refresh + 1)
            router.push(`/confirm/${query.code}`)
            await clearCart(order)
        }
        catch (err) {
            console.log("handlePaymentSuccess ~ err", err)
        }
    }

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
                    {/* <Carthead /> */}
                    {orderProducts && orderProducts.map((item, idx) => (
                        <div className="flex h-full items-center justify-around   text-lg border-b" key={idx} >
                            <div className="">
                            </div>
                            <div className="flex-1 text-center px-4 py-1 text-gray-600">
                                <p className=" "> {item.product_name} </p>
                            </div>
                            <div className="flex-1 text-center text-gray-600 px-4 py-1 ">
                                <div className="flex justify-center items-center">
                                    <p className=" "> {item.quantity} </p>
                                </div>
                            </div>
                            {/* <div className="flex-1 text-center px-4 py-1 ">
                                <p className="text-gray-600"> ${' '}{item.price} </p>
                            </div> */}
                            <div className="flex-1 text-center px-4 py-1 hidden md:block text-gray-600">
                                {/* <p className=" "> ${' '}{(item.price * item.qty).toFixed(2)} </p> */}
                            </div>
                        </div>
                    ))}

                    Total Amount: $ {cart.itemsPriceTotal}
                    <div>
                        <br />
                        <div className="bg-blue-50 p-2 rounded mt-4">
                            <p> Try this demo Account to Pay: </p>
                            Email: <span className="bg-indigo-200 p-1 italic rounded inline-block mt-2"> sb-v7c427181487@personal.example.com
                            </span> <br />
                            Password: <span className="bg-indigo-200 italic p-1 rounded inline-block mt-2">1q+-)AEn

                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid col-span-2 mx-auto w-full">
                    {order && order?.map((details, idx) => (
                        <div key={idx}>
                            {details.status && details.status !== 'paid' && (
                                <PayButton
                                    total={details.total}
                                    status={details.status}
                                    onSuccess={handlePaymentSuccess}
                                    key={idx}
                                />
                            )}
                            {details.status && details.status === 'paid' && (
                                <p>
                                    Thanks, your order submitted successfully!
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}