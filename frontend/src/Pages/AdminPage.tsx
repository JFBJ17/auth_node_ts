import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function AdminPage() {

    const [users, setUsers] = useState<any>([]);

    useEffect(() => {
        axios.get("http://localhost:4000/allUsers", { withCredentials: true })
            .then(res => setUsers(res.data))
    }, []);
    return (
        <div>
            {
                users.map((user: any) => {
                    return (
                        <ul key={user.id}>
                            <li>Usuario: {user.username}, {(user.isAdmin) ? "Admin" : "No Admin"}</li>
                        </ul>
                    )
                })
            }
        </div>
    )
}
