import { Request, Response, NextFunction } from 'express';
import connect from '../database';

export const isAdministratorMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const { user }: any = req;
    const conn = await connect();
    if (user) {
        try {
            const [row]: any = await conn.query('SELECT * FROM users WHERE username = ?', [user.username]);
            if (row[0].isAdmin) {
                return next();
            }
            return res.send("Sorry, only admin's can perform this");
        } catch (error) {
            console.log(error)
        }
    }
    return res.send('Sorry, you arent logged in');
}