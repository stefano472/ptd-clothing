import Button from '../button/button.component'
import './product-card.scss'
import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

const ProductCard = ({product}) => {
    const { addItemToCart } = useContext(CartContext)

    const addToCart = () => addItemToCart(product)

    const { name, price, imageUrl } = product
    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={name} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">$ {price.toFixed(2)}</span>
            </div>
            <Button buttonType='inverted' onClick={addToCart} >ADD TO CART</Button>
        </div>
    )
}

export default ProductCard