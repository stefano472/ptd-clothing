import { CART_ACTION_TYPES } from "./cart.types";


export const setCartToggle = (boolean) => {
    return {
        type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
        payload: boolean
    }
}

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

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return {
        type: CART_ACTION_TYPES.SET_CART_ITEMS,
        payload: newCartItems
    }
}

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return {
        type: CART_ACTION_TYPES.SET_CART_ITEMS,
        payload: newCartItems
    }
}

export const clearItemFromCart = (cartItems, productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear)
    return {
        type: CART_ACTION_TYPES.SET_CART_ITEMS,
        payload: newCartItems
    }
}