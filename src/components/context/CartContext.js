import { useState, createContext, useEffect } from 'react'

export const CartContext = createContext()

//cart context provider
export const CaretProvider = ({ children }) => {
    const [cart, setCart] = useState({
        items: [],
        itemsCountTotal: 0,
        itemsPriceTotal: 0
    })
    const calculateTotalItemsAndPrice = (items) => {
        const itemsCountTotal = items.reduce((prev, curr) => prev + curr.qty, 0)
        const itemsPriceTotal = items.reduce((prev, curr) => {
            return prev + curr.qty * curr.price
        }, 0);
        return {
            itemsCountTotal, itemsPriceTotal,
        }
    }

    //persist to localStorage
    useEffect(() => {
        const cartData = localStorage.getItem('dokkan-cart') || []
        if (cartData) {
            setCart(JSON.parse(cartData))
        }
    }, [])
    useEffect(() => {
        localStorage.setItem('dokkan-cart', JSON.stringify(cart))
    })

    //add to cart 
    const addToCart = (product) => {
        const { items = [] } = cart
        const productsIdx = items.findIndex(item => item.id === product.id)
        if (productsIdx === -1) {
            items.push({
                ...product,
                qty: 1,
            })
        } else {
            items[productsIdx].qty++;
        }
        const Totals = calculateTotalItemsAndPrice(items)
        setCart({
            items, ...Totals
        })
    }
    //decncrement
    const DecrementCartQnty = (product) => {
        const { items = [] } = cart;
        const productIndex = items.find(item => item.id === product.id);
        if (productIndex.qty > 1) {
            productIndex.qty--
        }
        const Totals = calculateTotalItemsAndPrice(items)
        setCart({
            items, ...Totals
        })
    }

    //incrementCartQnty
    const IncrementCartQnty = (product) => {
        const { items = [] } = cart;
        const productIndex = items.find(item => item.id === product.id);

        if (productIndex.qty > 0) {
            productIndex.qty++
        }
        const Totals = calculateTotalItemsAndPrice(items)
        setCart({
            items, ...Totals
        })
    }
    //remove from cart 
    const removeFromCart = (product) => {
        const { items = [] } = cart;
        const productIndex = items.filter(item => item.id !== product.id);
        if (productIndex) {
            items.splice(productIndex, 1);
        }
        setCart({ items, ...calculateTotalItemsAndPrice(items) })
    }

    const clearCart = (product) => {
        const { items = [] } = cart
        // const productsIdx = items.findIndex(item => item.id === product.id)
        // if (productsIdx === -1) {
        //     items.push({
        //         ...product,
        //         qty: 1,
        //     })
        // } else {
        //     items[productsIdx].qty++;
        // }
        setCart({ items: [], ...calculateTotalItemsAndPrice([])})

    }
    return (
        <CartContext.Provider value={{ cart,clearCart, addToCart, removeFromCart, IncrementCartQnty, DecrementCartQnty }}>
            {children}
        </CartContext.Provider>
    )
}
