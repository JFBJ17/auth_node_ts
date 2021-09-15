import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Login() {

    const history = useHistory();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = () => {
        axios.post("http://localhost:4000/login", {
            username,
            password
        }, {
            withCredentials: true
        }).then(res => {
            if (res.data === "success") {
                return window.location.href = "/";
                // return window.location.replace('/');
            }
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="username"
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="text"
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={login}>Login</button>
        </div>
    )
}
