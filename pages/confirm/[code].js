import Link from 'next/link'
import Layout from '@/src/Layout/Layout'
import { fetchOrder } from '@/services/fetchData'

export default function confirm({ orders }) {
    return (
        <Layout>
            <div className="max-w-5xl mx-auto mt-20 p-2">
                {orders && orders.map((confirmed) => (
                    <div key={confirmed.id}>
                        <p>Your order no.: {confirmed.code} </p>
                        <p> Total Price: {confirmed.total} </p>
                        <p> Shipment Address:  {confirmed.address} </p>
                        <p> Payment status : <span className="text-green-600"> {confirmed.status}</span> </p>
                    </div>
                ))}
                <Link href="/">
                    <a className="bg-indigo-400 p-2 rounded inline-block text-gray-50">Back Home</a>
                </Link>
            </div>
        </Layout>
    )
}


export async function getServerSideProps({ params: { code } }) {
    const orders = await fetchOrder(`/orders/?code=${code}`)
    return {
        props: { orders, }
    }
}

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