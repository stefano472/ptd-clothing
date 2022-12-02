import './cart-dropdown.scss'

// import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// import { CartContext } from '../../contexts/cart.context'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'

import CartItem from '../cart-item/cart-item.component'

import Button from '../button/button.component'
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles'

const CartDropdown = ({toggleCart}) => {
  // const { cartItems } = useContext(CartContext)
  const cartItems = useSelector(selectCartItems)
  
  const navigate = useNavigate()

  const goToCheckoutHandler = () => {
    navigate('/checkout')
    toggleCart()
  }

  return (
    <CartDropdownContainer >
        <CartItems >
          {
            cartItems.length ? (
              cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
            ) : (
              <EmptyMessage >Your Cart is Empty</EmptyMessage>
            )
          }
        </CartItems>

        <Button onClick={goToCheckoutHandler} >GO TO CHECKOUT</Button>

    </CartDropdownContainer >
  )
}

export default CartDropdown