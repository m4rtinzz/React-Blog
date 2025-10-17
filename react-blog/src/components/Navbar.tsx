import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
        <h2><Link to={`/`}>Blog</Link></h2>
        <ul>
            <li><Link to={`/`}>Home</Link></li>
            <li><Link to={`/blog`}>Blog</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/dashboard">Painel</Link></li>
                <li><a href="#" onClick={handleLogout}>Sair</a></li>
              </>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
        </ul>
    </nav>
  )
}

export default Navbar