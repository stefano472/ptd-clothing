import { createSelector } from "reselect";

const selectCartReducer = state => state.cart

export const selectCartItems = createSelector(
    [selectCartReducer],
    cart => cart.cartItems
)

export const selectCartToggle = createSelector(
    [selectCartReducer],
    cart => cart.cartToggle
)

export const selectCartCount = createSelector(
    [selectCartItems],
    cartItems => {
        return cartItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.quantity
        }, 0)
    }
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => {
        return cartItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price * currentItem.quantity
        }, 0)
    }
)
 