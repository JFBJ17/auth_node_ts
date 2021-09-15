import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';

export default function Register() {

    const history = useHistory();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const register = () => {
        axios.post("http://localhost:4000/register", {
            username,
            password
        }, {
            withCredentials: true
        }).then(res => {
            console.log(res.data)
            if (res.data === "success") {
                // return window.location.href = "/";
                return history.push("/");
            }
        })
    }

    return (
        <div>
            <h1>Register</h1>
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
            <button onClick={register}>Register</button>
        </div>
    )
}
