import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find( cartItem => cartItem.id === productToAdd.id)

    if (existingItem) {
        return cartItems.map( (cartItem) => {
            return cartItem.id === productToAdd.id ? 
                {...cartItem, quantity: cartItem.quantity + 1} :
                cartItem
        } )
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingItem = cartItems.find( cartItem => cartItem.id === productToRemove.id)

    if (existingItem.quantity === 1 ) {
        return clearCartItem(cartItems, productToRemove)
    }

    return cartItems.map( (cartItem) => {
        return cartItem.id === productToRemove.id ? 
            {...cartItem, quantity: cartItem.quantity - 1} :
            cartItem
    } )
}
const clearCartItem = (cartItems, productToClear) => {
    return (cartItems.filter((cartItem) => cartItem.id !== productToClear.id))
}

export const CartContext = createContext({
    cartToggle: false,
    setCartToggle: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartQuantity: 0,
    cartTotal: 0
})

export const CartProvider = ({children}) => {
    const [ cartToggle, setCartToggle ] = useState(false)
    const [ cartItems, setCartItems ] = useState([])
    const [ cartQuantity, setCartQuantity ] = useState(0)
    const [ cartTotal, setCartTotal ] = useState(0)

    useEffect(() => {
        /* 
            reduce è un array function molto utile sostanzialmente prende un array e da questo ne restituisce
            un valore, è una funzione che accetta due argomenti il primo è una callback function alla quale
            passo due termini (il primo è la somma di tutte le iterazioni, il secondo è l'elemento che vado ad
            iterare), il secondo è da dove voglio far partire il mio accumulator, nel mio caso 0 ma potrebbe 
            essere 10 o qualsiasi altro numero 
        */
        const newCartQuantity = cartItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.quantity
        }, 0)
        setCartQuantity(newCartQuantity)

    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price * currentItem.quantity
        }, 0)
        setCartTotal(newCartTotal)

    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems, productToClear))
    }



    const value = { cartToggle, setCartToggle, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartQuantity, cartTotal }

    return <CartContext.Provider value={value} >{children}</CartContext.Provider>

}