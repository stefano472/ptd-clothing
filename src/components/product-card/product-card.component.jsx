import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'
// import './product-card.scss'
import { ProductCartContainer, Footer, Name, Price } from './product-card.styles'

const ProductCard = ({product}) => {
    const { addItemToCart } = useContext(CartContext)

    const addToCart = () => addItemToCart(product)

    const { name, price, imageUrl } = product
    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={name} />
            <Footer>
                <Name>{name}</Name>
                <Price>$ {price.toFixed(2)}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addToCart} >ADD TO CART</Button>
        </ProductCartContainer>
    )
}

export default ProductCard