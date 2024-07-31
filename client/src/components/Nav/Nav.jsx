import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../services/users'
import './Nav.css'

function NavBar({ user, setUser }) {
    const navigate = useNavigate();

    // Function to sign user out and remove token
    const onSignOut = async () => {
        try {
            await logout()
            setUser(null)
            navigate('/')
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // Navigation options for nav bar if user is loged in
    const authenticatedOptions = (
        <>
            <NavLink className='navLink' to="/">Home</NavLink>
            <NavLink className='navLink' to="/jobs-applied" >Jobs Applied</NavLink>
            <NavLink className='navLink' to="/search" >Search</NavLink>
            <NavLink className='navLink' onClick={onSignOut} >Sign Out</NavLink>
        </>
    );

    // Navigation options for nav bar if user is not loged in
    const unauthenticatedOptions = (
        <>
            <NavLink className='navLink' to='/login'>Login</NavLink>
            <NavLink className='navLink' to='/register'>Register</NavLink>
        </>
    );

    return (
        <nav className='navbarContainer'>
            <div className='navUsername'>
                {user && <h4>{`Welcome ${user.username}`}</h4> }
            </div>
            <div className='navLinks'>
                {user ? authenticatedOptions : unauthenticatedOptions}
            </div>
        </nav>
    )
}

// Define PropTypes for the NavBar component
NavBar.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
    setUser: PropTypes.func.isRequired,
};

export default NavBar;