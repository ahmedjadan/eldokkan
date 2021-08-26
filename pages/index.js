import { GraphQLClient } from 'graphql-request'
import Head from 'next/head'
import { fetchAllProducts } from '@/services/fetchData'
import Layout from '@/src/Layout/Layout'
import Hero from '@/src/components/Hero'
import ProductItem from '@/src/components/ProductItem'

export default function index({ products }) {

  return (
    <Layout>
      <Head>
        <title>El-Dokkan | Home</title>
      </Head>
      {/* <Hero /> */}
      <div>
        <ProductItem products={products} />
        { }
      </div>
    </Layout>
  )
}



//with REST API

export async function getServerSideProps() {
  // const data = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/'products'`)
  // const products = await data.json()
  const products = await fetchAllProducts('/products')


  return {
    props: { products },
  }
}
// export async function getStaticProps() {
//   const graphcms = new GraphQLClient('https://dry-plateau-13030.herokuapp.com/graphql');
//   const { products } = await graphcms.request(
//     `{
//       products{
//         slug
//         name
//         price
//         product_image{
//           url
//           formats
//         }
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

// export async function getServerSideProps({ params }) {
//     const graphcms = new GraphQLClient('http://localhost:1337/graphql');
//     const { orders } = await graphcms.request(
//         `query getOrder($code: String!){
//       orders(where: {code: $code}) {
//         address
//         id
//         total
//         code
//         status   
//       }
//      }`,
//         {
//             code: params.code,
//         }
//     );
//     return {
//         props: {
//             orders,
//         },
//     };
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