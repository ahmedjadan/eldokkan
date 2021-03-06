import ProductsList from './ProductsList'


export default function ProductItem({ products, errors }) {
  
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mx-auto max-w-7xl my-12 px-2 ">
            {products && products.map((product, idx) => (
                <ProductsList product={product} key={idx} />
            ))}

        </div>
    )
}
