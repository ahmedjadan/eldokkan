import Head from 'next/head'
import Layout from '@/src/Layout/Layout'
import ProductItem from '@/src/components/ProductItem'
import useSWR from 'swr'

export default function index() {

  const { data, error } = useSWR('https://dry-plateau-13030.herokuapp.com/products?_limit=5')

  if (error) {
    return <div>Error</div>
  }
  if (!data) {
    return <Layout> <div className="max-w-7xl mx-auto text-center">Loading......</div> </Layout>
  }
  return (
    <Layout>
      <Head>
        <title>El-Dokkan | Home</title>
      </Head>
      {/* <Hero /> */}
      <div>
        <ProductItem products={data} errors={error} />
        { }
      </div>
    </Layout>
  )
}



//with REST API

export async function getServerSideProps() {
  const data = await fetch(`https://dry-plateau-13030.herokuapp.com/products`)
  console.log("getServerSideProps ~ data", data)

  const products = await data.json()
  //const products = await fetchAllProducts('/products')

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
//          id
//         name
//         price
//         description
//         product_image{
//           url
//           formats
//         }
//             category {
//               name
//               slug
//                id
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