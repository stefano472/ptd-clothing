import { createContext, useReducer } from "react";

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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE =  {
    cartToggle: false,
    cartItems: [],
    cartQuantity: 0,
    cartTotal: 0
}

// da tenere conto è che il reducer non dovrebbe contenere logica quindi si cerca di isolarla
// sempre all' esterno in modo da aggiornare solamente lo state qua dentrro
const CartReducer = (state, action) => {
    const { type, payload } = action

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                cartToggle: payload
            }
        default:
            throw new Error(`unhandled cartReducer type action ${type}`)
    }
}

export const CartProvider = ({children}) => {

    const [ state, dispatch ] = useReducer(CartReducer, INITIAL_STATE)
    const { cartItems, cartTotal, cartQuantity, cartToggle } = state

    const updateCartItemsReducers = (newCartItems) => {
        const newCartQuantity = newCartItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.quantity
        }, 0)
        const newCartTotal = newCartItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price * currentItem.quantity
        }, 0)
        
        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS,
            payload: {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartQuantity: newCartQuantity
            }
        })
    }

    const setCartToggle = (bool) => {
        dispatch({
            type: CART_ACTION_TYPES.SET_IS_CART_OPEN, 
            payload: bool
        })
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducers(newCartItems)
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove)
        updateCartItemsReducers(newCartItems)
    }

    const clearItemFromCart = (productToClear) => {
        const newCartItems = clearCartItem(cartItems, productToClear)
        updateCartItemsReducers(newCartItems)
    }

    const value = { 
        cartToggle, 
        setCartToggle,
        cartItems,
        addItemToCart, 
        removeItemFromCart,
        clearItemFromCart, 
        cartQuantity, 
        cartTotal 
    }

    return <CartContext.Provider value={value} >{children}</CartContext.Provider>

}