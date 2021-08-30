import { useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { fetchProducts, createOrder } from '@/services/fetchData'
import * as Yup from 'yup';
import Layout from '@/src/Layout/Layout'
import { CartContext } from '@/src/components/context/CartContext'
import CartItem from '@/src/components/Cart/CartItems'
import Carthead from '@/src/components/Cart/Carthead';



export default function checkout({ item }) {
    const router = useRouter()
    const { cart } = useContext(CartContext)
    const formik = useFormik({
        initialValues: {
            full_name: '',
            email: '',
            phone: '',
            address: '',
        },
        validationSchema: Yup.object().shape({
            full_name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid Email').required('Required'),
            phone: Yup.string().required('Required'),
            address: Yup.string().required('Required')
        }),
        onSubmit: async values => {
            const { items = [] } = cart
            const productId = items?.map((item) => `id_in=${item.id}`)
            const query = productId.join('&')

            try {

                const products = await fetchProducts(query)
                let total = 0;
                items.forEach((item) => {
                    const product = products?.find((p) => p.id === item.id)
                    total += item.qty * product.price.toFixed(2)
                })

                const order = await createOrder({
                    ...values, total: String(total),
                })
                router.push(`/order/${order.code}`)
            } catch (err) {
                console.log("🚀 ~ checkout ~ err", err.response.data)
            }
        },
    });
    const { errors, touched } = formik
    return (
        <Layout>
            <Head>
                <title>El-Dokkan | Checkout</title>
            </Head>
            <div className="max-w-6xl mx-auto mt-10 px-2">
                <div className="text-center text-2xl font-bold py-5 text-gray-700">
                    Checkout
                </div>
                <Carthead />
                <div>
                </div>
                {cart.items.map((item, idx) => <CartItem item={item} key={idx} />)}
                {cart.itemsPriceTotal ? (
                    <>
                        <div className="mx-auto mt-8 ">
                            <p className="text-center text-gray-600 py-3"> Personal Details </p>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                                    <div className="relative ">
                                        {touched.full_name && errors.full_name && <span className="text-red-400 text-xs absolute -top-4">{errors.full_name}</span>}
                                        <input
                                            id="full_name"
                                            name="full_name"
                                            type="text"
                                            placeholder="Full Name"
                                            onChange={formik.handleChange}
                                            value={formik.values.full_name}
                                            className="p-3 rounded w-full"
                                        />
                                    </div>
                                    <div className="relative">
                                        {touched.email && errors.email && <span className="text-red-400 text-xs absolute -top-4">{errors.email}</span>}
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                            className="p-3 rounded w-full"

                                        />
                                    </div>
                                    <div className="relative">
                                        {touched.phone && errors.phone && <span className="text-red-400 text-xs absolute -top-4">{errors.phone}</span>}

                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="Phone"
                                            onChange={formik.handleChange}
                                            value={formik.values.phone}
                                            className="p-3 rounded w-full"
                                        />
                                    </div>
                                    <div className="relative">
                                        {touched.address && errors.address && <span className="text-red-400 text-xs absolute -top-4">{errors.address}</span>}

                                        <input
                                            id="address"
                                            name="address"
                                            type="address"
                                            placeholder="Address"
                                            onChange={formik.handleChange}
                                            value={formik.values.address}
                                            className="p-3 rounded w-full"
                                        />
                                    </div>
                                </div>
                                <button className="mx-auto w-full" type="submit">
                                    <a className="flex mt-4 justify-between  rounded  text-center overflow-hidden text-white bg-gray-700  group">
                                        <span className=" flex-1 py-2 text-white bg-purple-500 group-hover:bg-purple-600 flex items-center justify-center transition ease-linear">
                                            Proceed to Pay
                                        </span>
                                        <span className=" py-2.5 flex-1">${' '}{cart.itemsPriceTotal.toFixed(2)} | Total Items: ({cart.itemsCountTotal})  </span>
                                    </a>
                                </button>
                            </form>
                        </div>

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

