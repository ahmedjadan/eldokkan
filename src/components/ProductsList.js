import Link from 'next/link'
import { useContext } from 'react'
import { CartContext } from '@/src/components/context/CartContext'
import Images from '@/src/components/Images'

export default function ProductsList({ product }) {
    const { addToCart } = useContext(CartContext)
    return (
        <>
            <div className=" bg-gray-200 dark:bg-[#242731] h-full rounded">
                <Link as={`/product/${product.slug.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')}`} href="/product/[slug]">
                    <a>
                        <div className="flex flex-col relative">
                            <div className="h-[200px]  rounded-md bg-contain bg-center object-cover mb-4">
                                <Images
                                    image={product}
                                    layout="fill"
                                    placeholder="blur"
                                    blurDataURL='L02?BSyG8wH;.8axMwMw8woF%%tS'
                                    objectFit="cover"
                                    alt={product.name}
                                    className="object-cover transform rounded-md hover:translate-y-[-3px] transition duration-500 ease-in-ou bg-center bg-contain min-w-full overflow-hidden"
                                />
                            </div>
                        </div>
                    </a>
                </Link>
                <div className="">
                    <div className="flex bg-gray-100 text-gray-600 py-3 px-1 text-lg items-center justify-between ">
                        <h3>{product.name} </h3>
                        <h3>${product.price} </h3>
                    </div>
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full"
                    >
                        <div className="inline-flex w-full overflow-hidden text-white bg-indigo-600 rounded group ">
                            <span className="px-3.5 py-2 text-white bg-indigo-600 group-hover:bg-indigo-700 flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                            </span>
                            <span className=" py-2.5 text-center mx-auto ">Add to Cart</span>
                        </div>
                    </button>

                </div>
            </div>

        </>

    )
}
