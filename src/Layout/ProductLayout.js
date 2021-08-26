import { useContext } from 'react'
import Images from '@/src/components/Images'
import { CartContext } from '@/src/components/context/CartContext'

export default function ProductLayout({ products, children }) {
  const { addToCart } = useContext(CartContext)
  console.log(products)
  return (
    <div className="max-w-5xl mx-auto px-2 lg:px-0 ">
      {products && products.map((product) => (
        <div className="grid md:grid-cols-4 grid-cols-1  mx-auto  mt-20" key={product.id}>
          <div className="grid md:col-span-2 w-full h-[300px] bg-gray-300 bg-cover rounded-lg ">
            <Images image={product} width={600} height={200} layout="responsive" />
          </div>
          <div className="grid md:col-span-2 px-4">
            <div className="">
              <div className="text-2xl text-gray-700"> {product.name} </div>
              <div className="border-b my-2 py-1 text-gray-500"> ${' '}{product.price} </div>
            </div>
            <div className="">
              <div className="border-b my-2 py-1  text-gray-500 flex items-center justify-start">Category :
                <span className="bg-indigo-100 px-2 rounded mx-2">{product.category.name}</span>
              </div>
              <p> {product.description}  </p>
            </div>
            <div className="mt-3">
              <button
                onClick={() => addToCart(product)}
              >
                <div className="inline-flex overflow-hidden text-white bg-indigo-500 rounded group">
                  <span className="px-3.5 py-2 text-white bg-indigo-600 group-hover:bg-indigo-700 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                  </span>
                  <span className="pl-4 pr-5 py-2.5">Add to Cart</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      ))}
      <div>
        {children}
      </div>
    </div>
  )
}
