import { createContext, useState } from "react";

export const CartContext = createContext({
    cartToggle: false,
    setCartToggle: () => {}
})

export const CartProvider = ({children}) => {
    const [ cartToggle, setCartToggle ] = useState(false)

    const value = { cartToggle, setCartToggle }

    return <CartContext.Provider value={value} >{children}</CartContext.Provider>

}