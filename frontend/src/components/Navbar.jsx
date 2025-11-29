import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">RentEase</Link>
            <ul className="nav-links">
                <li><Link to="/" className="nav-link">Home</Link></li>
                {user ? (
                    <>
                        {user.role === 'admin' && (
                            <li><Link to="/admin" className="nav-link">Dashboard</Link></li>
                        )}
                        <li><button onClick={logout} className="nav-btn">Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login" className="nav-link">Login</Link></li>
                        <li><Link to="/register" className="btn btn-primary">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
