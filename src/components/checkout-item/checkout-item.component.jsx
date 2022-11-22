// import './checkout-item.scss'

import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import { Arrow, BaseSpan, CheckoutItemContainer, ImageContainer, Quantity, RemoveButton, Value } from './checkout-item.styles'

const CheckoutItem = ({item}) => {
    
    const { name, quantity, price, imageUrl } = item
    const { removeItemFromCart, addItemToCart, clearItemFromCart } = useContext(CartContext)
    
    const addItemHandler = () => addItemToCart(item)
    const removeItemHandler = () => removeItemFromCart(item)
    const clearItemHandler = () => clearItemFromCart(item)

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