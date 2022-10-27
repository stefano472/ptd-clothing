import './cart-icon.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

const CartIcon = ({toggleCart}) => {
  return (
    <div onClick={toggleCart} className='cart-icon-container'>
        <ShoppingIcon className='shopping-icon' />
        <span className="item-count">0</span>
    </div>
  )
}

export default CartIcon