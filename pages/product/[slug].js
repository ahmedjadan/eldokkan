import Link from 'next/link'
import Head from 'next/head'
import useSWR from 'swr'
import ProductLayout from '@/src/Layout/ProductLayout'
import Layout from '@/src/Layout/Layout'
import Images from '@/src/components/Images'

export default function products({products}) {
  
  const { data: products_attach, error } = useSWR('https://dry-plateau-13030.herokuapp.com/products')

  const product = products?.map(({ name }) => name)
  const proID = products?.find((pr) => pr.id)

  const attached = products_attach?.filter((f) => proID?.id !== f.id)

  if (error) {
    return <div>Error {error} </div>
  }
  if (!products_attach) {
    return <Layout>
      <div className="max-w-6xl mx-auto text-center">
        Loading......
      </div>
    </Layout>
  }
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
            {attached && attached.map((product, idx) => (
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


export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`https://dry-plateau-13030.herokuapp.com/products/?slug=${slug}`)
  const products = await res.json()

  return {
    props: { products, }
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