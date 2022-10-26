import { Outlet, Link } from "react-router-dom"
import { ReactComponent as PtdLogo } from "../../assets/my-logo.svg"

import './navigation.scss'

const Navigation = () => {
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
                <Link className="nav-link" to='/auth' >
                    SIGN IN
                </Link>
            </div>
        </div>
        <Outlet />
    </>
  )
}

export default Navigation