// import './checkout-item.scss'

// import { useContext } from 'react'
// import { CartContext } from '../../contexts/cart.context'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action'
import { Arrow, BaseSpan, CheckoutItemContainer, ImageContainer, Quantity, RemoveButton, Value } from './checkout-item.styles'

const CheckoutItem = ({item}) => {
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const { name, quantity, price, imageUrl } = item
    // const { removeItemFromCart, addItemToCart, clearItemFromCart } = useContext(CartContext)
    
    const addItemHandler = () => dispatch(addItemToCart(cartItems, item))
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, item))
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, item))

    return (
        <CheckoutItemContainer >
            <ImageContainer>
                <img src={imageUrl} alt={`img: ${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity >
                <Arrow onClick={removeItemHandler}>
                    &#10094;
                </Arrow>
                <Value>
                    {quantity}
                </Value>
                <Arrow onClick={addItemHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <BaseSpan>${price.toFixed(2)}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem