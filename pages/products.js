import useSWR from 'swr'

import Layout from '@/src/Layout/Layout'
import ProductItem from '@/src/components/ProductItem'


export default function products() {
    const { data, error } = useSWR('https://dry-plateau-13030.herokuapp.com/products')
    if (error) {
        return <div>Error</div>
    }
    if (!data) {
        return <Layout> <div className="max-w-7xl mx-auto text-center">Loading......</div> </Layout>
    }
    return (
        <Layout>
            <div className="max-w-7xl mx-auto">
                <ProductItem products={data} />
            </div>
        </Layout>
    )
}
