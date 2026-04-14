import { Link } from "react-router-dom";
import {  useAuth } from "../context/AuthContext";

export default function Navbar(){
      const { user , logout} = useAuth();
    
    return (
        <nav className="navbar">
            <div className="navbar-container">
               <Link to="/" className="navbar-brand">
                    Tatcha
               </Link>
               <div className="navbar-links">
                    <Link to="/">Home</Link>
                    <Link to="/checkout">Cart</Link>
               </div>
                {!user ? (
                    <div className="navbar-auth">
                        <Link to="/auth" className="btn btn-secondary">Login</Link>
                        <Link to="/auth" className="btn btn-primary">Signup</Link>
                    </div>
                ) : (
                <div className="user-vavbar">
                    <span className="navbar-greeting">Hello, {user.email}</span>
                    <button className="btn btn-secondary" onClick={logout}>Logout</button>
                </div>
                )}
            </div>
         
        </nav>
    )
}
