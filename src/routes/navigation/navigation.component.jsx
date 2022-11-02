import { useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { ReactComponent as PtdLogo } from "../../assets/my-logo.svg"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import CartIcon from "../../components/cart-icon/cart-icon.components"

import { UserContext } from "../../contexts/user.context"
import { CartContext } from "../../contexts/cart.context"

import { signOutUser } from "../../utils/firebase/firebase.utils"



import './navigation.scss'

const Navigation = () => {

    /*
        Pure qui importo il useContext di react, ma siccome voglio solo utilizzare il suo
        valore dichiaro solo la var currentUser che potrò utilizzar edove voglio nel 
        component
    */
    const { currentUser } = useContext(UserContext)

    const { cartToggle, setCartToggle } = useContext(CartContext)

    const toggleCart = () => {
        setCartToggle(!cartToggle)
    }

    return (
        <>
            <div className="navigation">
                <Link className="logo-container" to='/' >
                    <PtdLogo className="logo" style={{filter: 'brightness(0)'}} />
                </Link>
                <div className="nav-links-container" >
                    <Link className="nav-link" to='/shop' >
                        SHOP
                    </Link>
                    { 
                        currentUser ? 
                            <span onClick={signOutUser} className="nav-link">
                                SIGN OUT
                            </span>
                        :
                            <Link className="nav-link" to='/auth' >
                                SIGN IN
                            </Link>
                    }
                    <CartIcon toggleCart={toggleCart} />
                </div>
                {
                    cartToggle && <CartDropdown toggleCart={toggleCart} />
                }
            </div>
            <Outlet />
        </>
    )
}

export default Navigation