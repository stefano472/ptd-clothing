import { createContext, useState, useEffect } from "react";

import PRODUCTS from '../shop-data.json'

export const ProductsContext = createContext(
    {
        products: [],
        setProducts: () => null
    }
)

export const ProductsProvider = ({children}) => {
    const [ products, setProducts ] = useState(null)

    const value = { products, setProducts }

    useEffect(() => {
        setProducts(PRODUCTS)
        // console.log(products)
    }, [products])

    return <ProductsContext.Provider value={value} >{children}</ProductsContext.Provider>
}