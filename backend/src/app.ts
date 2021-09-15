import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';

import routes from './routes/auth.routes';

import connect from './database';

class App {

    private app: Application;
    private LocalStrategy = passportLocal.Strategy;

    constructor(private port?: string | number) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 5000);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors({
            origin: 'http://localhost:3000',
            credentials: true
        }));
        this.app.use(session({
            secret: 'sessionTest',
            resave: true,
            saveUninitialized: true
        }));
        this.app.use(cookieParser());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        passport.use(new this.LocalStrategy(async (username, password, done) => {
            const conn = await  connect();
            const [row]: any = await conn.query('SELECT * FROM users WHERE username = ?', [username]);
            if (!row[0]) return done(null, false);
            bcrypt.compare(password, row[0].password, (err, result) => {
                if (err) throw err;
                if (result === true) {
                    return done(null, row[0]);
                } else {
                    return done(null, false);
                }
            });
        }));
        passport.serializeUser((user: any, done) => {
            done(null, user.id);
        });
        passport.deserializeUser(async (id: any, done) => {
            const conn = await connect();
            const [row]: any = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
            const userInfo = {
                username: row[0].username,
                isAdmin: row[0].isAdmin
            }
            done(null, userInfo);
        });
    }

    routes() {
        this.app.use(routes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}

export default App;