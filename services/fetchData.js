import axios from 'axios';

const createAxios = () => {
    const params = {
        baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    };
    return axios.create(params);
};

//fetch single product to checkout page
export const fetchProducts = async (query = '') => {
    const { data } = await createAxios().get(`/products?${query}`);
    return data;
};
//create order and post it to strapi backend
export const createOrder = async order => {
    const { data } = await createAxios().post('/orders', order);
    console.log("createOrder", data)
    return data;
}
//fetch all products to the main index.js 
export const fetchAllProducts = async products => {
    const { data } = await createAxios().get(products);
    console.log("fetchAllProducts", data)
    return data;
}

export const fetchOrder = async order => {
    const { data } = await createAxios().get(order);
    console.log("fetchOrder", data)
    return data;
}
export const patchOrder = async (code) => {
    const { data } = await createAxios().patch(`/orders/${code}`);
    console.log("patchOrder ~ data", data)
    return data
}



// export const fetchProducts = async (query = '') => {
//     const url = query ? `/products/?${query}` : '/products'
//     //const { data } = await createAxios().get(url)
//     const response = await fetch(`https://dry-plateau-13030.herokuapp.com/${url}`);
//     const data = await response.json();
//     return data;
// }
// export const CreateOrder = async (order) => {
//     const url = '/orders'
//     const response = await fetch(`http://localhost/13373${url}`, order, {
//         method: "POST",
//         //body: JSON.stringify(data),
//         headers: { "Content-type": "application/json; charset=UTF-8" }
//     })
//     const data = await response.json()
//     return data

// }
// export const CreateOrder = async (order) => {
//     const { data } = await createAxios().post(`/orders/`, order)
//     return data
// }

