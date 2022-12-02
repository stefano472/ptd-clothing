// import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { ReactComponent as PtdLogo } from "../../assets/my-logo.svg"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import CartIcon from "../../components/cart-icon/cart-icon.components"

// import { UserContext } from "../../contexts/user.context"
import { useSelector, useDispatch } from "react-redux"
import { selectCurrentUser } from '../../store/user/user.selector'
// import { CartContext } from "../../contexts/cart.context"
import { selectCartToggle } from '../../store/cart/cart.selector'
import { setCartToggle } from '../../store/cart/cart.action'

import { signOutUser } from "../../utils/firebase/firebase.utils"



// import './navigation.scss'
import { NavigationContainer, NavLink, NavLinks, LogoContainer } from './navigation.styles'

const Navigation = () => {

    /*
        Pure qui importo il useContext di react, ma siccome voglio solo utilizzare il suo
        valore dichiaro solo la var currentUser che potrò utilizzar edove voglio nel 
        component
    */
    // const { currentUser } = useContext(UserContext)

    // al posto del context utilizzo lo useSelector di redux
    const currentUser = useSelector(selectCurrentUser)

    // const { cartToggle, setCartToggle } = useContext(CartContext)
    const dispatch = useDispatch()

    const cartToggle = useSelector(selectCartToggle)

    const toggleCart = () => {
        dispatch(setCartToggle(!cartToggle))
    }

    return (
        <>
            <NavigationContainer >
                <LogoContainer to='/' >
                    <PtdLogo className="logo" style={{filter: 'brightness(0)'}} />
                </LogoContainer>
                <NavLinks >
                    <NavLink to='/shop' >
                        SHOP
                    </NavLink>
                    { 
                        currentUser ? 
                            <NavLink as='span' onClick={signOutUser} >
                                SIGN OUT
                            </NavLink>
                        :
                            <NavLink to='/auth' >
                                SIGN IN
                            </NavLink>
                    }
                    <CartIcon toggleCart={toggleCart} />
                </NavLinks>
                {
                    cartToggle && <CartDropdown toggleCart={toggleCart} />
                }
            </NavigationContainer >
            <Outlet />
        </>
    )
}

export default Navigation