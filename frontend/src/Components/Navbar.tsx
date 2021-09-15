import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { myContext } from '../Pages/Context';
import axios from 'axios';

export default function Navbar() {
    const ctx = useContext(myContext);

    const logout = () => {
        axios.get("http://localhost:4000/logout", { withCredentials: true })
            .then(res => {
                if (res.data === "success") return window.location.href = "/";
            })
    }

    return (
        <div className="NavContainer">
            {
                ctx ? (
                    <>
                        <Link onClick={logout} to="/logout">Logout</Link>
                        {(ctx.isAdmin) ? (<Link to="/admin">Admin</Link>) : <></>}
                        <Link to="/profile">Profile</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )
            }
            <Link to="/">Home</Link>
        </div>
    )
}
