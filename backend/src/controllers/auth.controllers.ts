import { RequestHandler } from 'express';
import connect from '../database';
import bcrypt from 'bcryptjs';

export const registrar: RequestHandler = async (req, res): Promise<Response | void | Record<string, any>> => {
    const conn = await connect();
    const { username, password } = req?.body;
    if (!username || !password || typeof username !== "string" || typeof password !== "string") {
        res.send("Improper values");
        return;
    }
    const [row]: any = await conn.query('SELECT * FROM users WHERE username = ?', [username]);
    if (!!row[0]) return res.send('User Already Exists');
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        username,
        password: hashedPassword
    }
    await conn.query('INSERT INTO users SET ?', [newUser]);
    res.send('success');
}

export const login: RequestHandler = (req, res) => {
    res.send("success");
}

export const logout: RequestHandler = (req, res) => {
    req.logout();
    res.send('success');
}

export const getUser: RequestHandler = (req, res) => {
    res.send(req.user);
}

export const deleteUser: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const conn = await connect();
    await conn.query('DELETE FROM users WHERE id = ?', [id]);
    res.send('success');
}

export const getUsers: RequestHandler = async (req, res) => {
    const conn = await connect();
    const [rows]: any = await conn.query('SELECT * FROM users');
    const filterdUsers: any = [];
    rows.forEach((item: any) => {
        const userInformation = {
            id: item.id,
            username: item.username,
            isAdmin: item.isAdmin
        }
        filterdUsers.push(userInformation);
    });
    res.send(filterdUsers);
}