// import './cart-icon.scss'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import { CartIconContainer, ItemCount } from './cart-icon.styles'

const CartIcon = ({toggleCart}) => {
  const { cartQuantity } = useContext(CartContext)
  
  return (
    <CartIconContainer onClick={toggleCart} >
        <ShoppingIcon className='shopping-icon' />
        <ItemCount >{cartQuantity}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon