import './cart-item.scss'

const CartItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem

  return (
    <div className='cart-item-container'>
        <img src={imageUrl} alt={`img: ${name}`} />
        <div className="item-details">
            <span className='name'>{name}</span>
            <span className='price'>{quantity} x ${price.toFixed(2)}</span>
        </div>
    </div>
  )
}

export default CartItem