import { useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { ReactComponent as PtdLogo } from "../../assets/my-logo.svg"

import { UserContext } from "../../contexts/user.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"

import './navigation.scss'

const Navigation = () => {

    /*
        Pure qui importo il useContext di react, ma siccome voglio solo utilizzare il suo
        valore dichiaro solo la var currentUser che potrò utilizzar edove voglio nel 
        component
    */
    const { currentUser }   = useContext(UserContext)

    return (
        <>
            <div className="navigation">
                <Link className="logo-container" to='/' >
                    <PtdLogo className="logo" style={{filter: 'brightness(0)'}} />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/' >
                        LINK
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
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Navigation