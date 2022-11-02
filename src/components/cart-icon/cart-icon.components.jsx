import './cart-icon.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const CartIcon = ({toggleCart}) => {
  const { cartQuantity } = useContext(CartContext)
  
  return (
    <div onClick={toggleCart} className='cart-icon-container'>
        <ShoppingIcon className='shopping-icon' />
        <span className="item-count">{cartQuantity}</span>
    </div>
  )
}

export default CartIcon