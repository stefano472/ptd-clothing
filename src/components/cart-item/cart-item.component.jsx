// import './cart-item.scss'

import { CartItemContainer, ItemDetails } from "./cart-item.styles"

const CartItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem

  return (
    <CartItemContainer>
        <img src={imageUrl} alt={`img: ${name}`} />
        <ItemDetails>
            <span className='name'>{name}</span>
            <span className='price'>{quantity} x ${price.toFixed(2)}</span>
        </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem