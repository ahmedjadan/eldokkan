
import Head from 'next/head'
import Layout from '@/src/Layout/Layout'
import ProductItem from '@/src/components/ProductItem'
//


export default function index({ products }) {

  if (!products) {
    return <Layout> <div className="max-w-7xl mx-auto text-center">  </div> </Layout>
  }
  return (
    <Layout>
      <Head>
        <title>El-Dokkan | Home</title>
        <meta key="charSet" charSet="UTF-8" />
        <meta name="robots" content="follow, index" />
        <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
        <meta key="httpEquiv" httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta key="title" name="title" content="El-Dokkan" />
        <meta key="description" name="description" content="modern e-commerce small shop, using Strapi for backend, Nextjs for frontend and payment integration with PayPal, " />
        <meta key="keywords" name="keywords" content="shop, dokkan, e-commerce" />
        <meta key="author" name="author" content="Ahmed Jadan" />
        <meta key="article:published_time" property="article:published_time" content={new Date(date).toISOString()} />
        <meta key="og:title" property="og:title" content={"El-Dokkan | E-commerce" || "By Ahmed Ja'dan"} />
        <meta key="og:description" property="og:description" content="modern e-commerce small shop, using Strapi for backend, Nextjs for frontend and payment integration with PayPal," />
        <meta key="og:type" property="og:type" content="website" />
      </Head>
      <div>
        <ProductItem products={products} />

      </div>
    </Layout>
  )
}



//with REST API

export async function getStaticProps() {
  const data = await fetch(`https://dry-plateau-13030.herokuapp.com/products?_limit=5`)
  console.log("getServerSideProps ~ data", data)

  const products = await data.json()
  //const products = await fetchAllProducts('/products')

  return {
    props: { products },
    revalidate: 2
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