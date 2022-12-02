// import { useContext } from "react"
import CheckoutItem from "../../components/checkout-item/checkout-item.component"
// import { CartContext } from "../../contexts/cart.context"
import { useSelector } from "react-redux"
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector"

// import './checkout.scss'
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles'

const Checkout = () => {
    // const { cartItems, cartTotal } = useContext(CartContext)
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)

    return (
        <CheckoutContainer>
            { cartItems.length        
                ?   <>
                        <CheckoutHeader>
                            <HeaderBlock>
                                <span>Product</span>
                            </HeaderBlock>
                            <HeaderBlock>
                                <span>Description</span>
                            </HeaderBlock>
                            <HeaderBlock>
                                <span>Quantity</span>
                            </HeaderBlock>
                            <HeaderBlock>
                                <span>Price</span>
                            </HeaderBlock>
                            <HeaderBlock>
                                <span>Remove</span>
                            </HeaderBlock>
                        </CheckoutHeader>

                        {cartItems.map(item => <CheckoutItem key={item.id} item={item} />)}
                    </>
                
                : <h2 style={{marginTop: '10px'}}>Your Cart is Empty</h2> 
            } 
            <Total>Total: ${cartTotal.toFixed(2)}</Total>
        </CheckoutContainer>
    )
}

export default Checkout