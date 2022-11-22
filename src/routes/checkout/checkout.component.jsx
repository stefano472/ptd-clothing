import { useContext } from "react"
import CheckoutItem from "../../components/checkout-item/checkout-item.component"
import { CartContext } from "../../contexts/cart.context"

// import './checkout.scss'
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles'

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext)

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