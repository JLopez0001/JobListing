import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../services/users'

function NavBar({ user, setUser }) {
    const navigate = useNavigate();

    // Function to sign user out and remove token
    const onSignOut = async () => {
        try {
            await logout()
            setUser(null)
            navigate('/login')
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // Navigation options for nav bar if user is loged in
    const authenticatedOptions = (
        <>
            <NavLink to="/jobs-applied" >Jobs Applied</NavLink>
            <NavLink onClick={onSignOut} >Sign Out</NavLink>
        </>
    );

    // Navigation options for nav bar if user is not loged in
    const unauthenticatedOptions = (
        <>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/register'>Register</NavLink>
        </>
    );

    return (
        <nav>
            {user && <h4>{`Welcome ${user.username}`}</h4> }
            <NavLink to="/">Home</NavLink>
            {user ? authenticatedOptions : unauthenticatedOptions}
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