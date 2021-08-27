import Link from 'next/link'
import Head from 'next/head'

import ProductLayout from '@/src/Layout/ProductLayout'
import Layout from '@/src/Layout/Layout'
import { fetchAllProducts } from '@/services/fetchData'
import Images from '@/src/components/Images'

export default function products({ products, children, products_attach }) {
  const product = products.map(({ name }) => name)
  return (
    <Layout>
      <Head>
        <title>El-Dokkan | {product}</title>
      </Head>
      <ProductLayout products={products}>
        <div className="mx-auto  block mt-20 my-20 ">

          <h1 className="text-center py-4 font-semibold text-gray-700">
            Related Products, You may Consider.
          </h1>

          <div className="w-full grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-2 ">
            {products_attach && products_attach.map((product, idx) => (
              <div className="w-full" key={idx}>
                <Link href={`/product/${product.slug.normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')}`}>
                  <a>
                    <div className="flex flex-col relative">
                      <div className="h-[100px] rounded-md bg-contain bg-center object-cover">
                        <Images image={product} layout="fill" />
                      </div>
                    </div>
                    <div className="text-gray-600"> {product.name} </div>
                  </a>
                </Link>
                <div className="text-gray-600"> ${product.price} </div>
              </div>
            ))}
          </div>
        </div>
      </ProductLayout>
    </Layout>
  )
}

// export const getServerSideProps = async ({ params: { slug } }) => {
//   //const product_found = await fetchAllProducts(`/products/?slug=${slug}`)
//   const res = await fetch(`https://dry-plateau-13030.herokuapp.com/products/?slug=${slug}`)
//   const product_found = await res.json()
//   //
//   const res_attach = await fetch(`https://dry-plateau-13030.herokuapp.com/products`)
//   const products_attach = await res_attach.json()
//   //const products_attach = await fetchAllProducts('/products')


//   return {
//     props: { products: product_found, products_attach }

//   };
// };

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`https://dry-plateau-13030.herokuapp.com/products/?slug=${slug}`)
  const product_found = await res.json()
  //
  const res_attach = await fetch(`https://dry-plateau-13030.herokuapp.com/products`)
  const products_attach = await res_attach.json()

  return {
    props: { products: product_found, products_attach }
  }
}
export async function getStaticPaths() {
  const res = await fetch(`https://dry-plateau-13030.herokuapp.com/products`)
  const products = await res.json()

  return {
    paths: products.map((product) => ({
      params: { slug: String(product.slug) }
    })),
    fallback: false
  }
}






// export async function getServerSideProps({ params }) {
//   const graphcms = new GraphQLClient('http://localhost:1337/graphql');

//   const { products } = await graphcms.request(
//     `query getProduct($slug: String!){
//       products(where: {slug: $slug}) {
//         name
//         id
//         price
//         slug
//         description
//         product_image {
//           formats
//         }
//         category{
//           name
//           slug
//         }
//       }
//      }`,
//     {
//       slug: params.slug,
//     }
//   );
//   return {
//     props: {
//       products,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const graphPaths = new GraphQLClient('http://localhost:1337/graphql');
//   const { products } = await graphPaths.request(`{
//     products {
//       name
//       slug
//       price
//         product_image {
//           url
//         }
//        category{
//           name
//           slug
//         }
//       }
//     }`);

//   return {
//     paths: products.map(({ slug }) => ({ params: { slug } })),
//     fallback: false,
//   };
// }