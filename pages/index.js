import { fetchAllProducts } from '../services/fetchData'
import Layout from '@/Layout/Layout'
import Hero from '@/components/Hero'
import ProductItem from '@/components/ProductItem'

export default function index({ products }) {

  return (
    <Layout>
      {/* <Hero /> */}
      <div>
        <ProductItem products={products} />
        { }
      </div>
    </Layout>
  )
}



//with REST API

export async function getStaticProps() {
  // const data = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/'products'`)
  // const products = await data.json()
  const products = await fetchAllProducts('/products')


  return {
    props: { products },
    revalidate: 1
  }
}
// export async function getStaticProps() {
//   const graphcms = new GraphQLClient('http://localhost:1337/graphql');
//   const { products } = await graphcms.request(
//     `{
//       products(limit: 5) {
//         slug
//         name
//         price

//         product_image {
//           formats
//             }
//             category {
//               name
//               slug
//             } 
//       }
//     }`
//   );
//   return {
//     props: { products },
//     revalidate: 2
//   }
// }


// export const getServerSideProps = async () => {
//   const { data } = await client.query({
//     query: gql`
//       query {
//         products{
//           name
//           slug
//           price
//             product_image {
//               formats
//             }  
//         }
//       }

//     `,
//   });
//   return {
//     props: { products: data.products, },
//   }
// }