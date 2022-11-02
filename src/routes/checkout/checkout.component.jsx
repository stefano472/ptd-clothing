import { useContext } from "react"
import CheckoutItem from "../../components/checkout-item/checkout-item.component"
import { CartContext } from "../../contexts/cart.context"

import './checkout.scss'
const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext)

    return (
        <div className="checkout-container">
            { 
                cartItems.length === 0 &&
                <h2 style={{marginTop: '10px'}}>Your Cart is Empty</h2> 
            }
            {
                cartItems.length !== 0 &&
                <div className="checkout-header">
                    <div className="header-block">
                        <span>Product</span>
                    </div>
                    <div className="header-block">
                        <span>Description</span>
                    </div>
                    <div className="header-block">
                        <span>Quantity</span>
                    </div>
                    <div className="header-block">
                        <span>Price</span>
                    </div>
                    <div className="header-block">
                        <span>Remove</span>
                    </div>
                </div>
            }
            {
                cartItems.length !== 0 && cartItems.map(item => <CheckoutItem key={item.id} item={item} />)
            }
            <div className="total">Total: ${cartTotal.toFixed(2)}</div>
        </div>
    )
}

export default Checkout