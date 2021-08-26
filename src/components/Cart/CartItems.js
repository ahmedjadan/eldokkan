import { useContext } from 'react'
import Link from 'next/link'
import { CartContext } from '@/src/components/context/CartContext'
import Images from '@/src/components/Images'

export default function CartItem({ item }) {
    const { removeFromCart, DecrementCartQnty, IncrementCartQnty, cart } = useContext(CartContext)

    return (
        <>
            <div className="flex h-full items-center justify-around   text-lg border-b">
                <Link href={`product/${item.slug}`}>
                    <a className="flex-1 items-center justify-center px-4 py-1  ">
                        <div className="">
                            <Images image={item} width={50} height={50} />
                        </div>
                    </a>
                </Link>
                <div className="flex-1 text-center px-4 py-1 text-gray-600 hidden md:flex">
                    <p className=" "> {item.name} </p>
                </div>
                <div className="flex-1 text-center text-gray-600 px-4 py-1 ">
                    <div className="flex justify-center items-center">
                        <button className="p-2" onClick={() => DecrementCartQnty(item)} disabled={item.qty === 1} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <p className=" "> {item.qty} </p>
                        <button className="p-2" onClick={() => IncrementCartQnty(item)}  >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex-1 text-center px-4 py-1 ">
                    <p className="text-gray-600"> ${' '}{item.price} </p>
                </div>
                <div className="flex-1 text-center px-4 py-1 hidden md:block text-gray-600">
                    <p className=" "> ${' '}{(item.price * item.qty).toFixed(2)} </p>
                </div>
                <button onClick={() => removeFromCart(item)} className="flex-1 itemes-center justify-center flex px-4 py-1">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5  text-gray-600 hover:text-red-400 cursor-pointer transition ease-linear "
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </>
    )
}
