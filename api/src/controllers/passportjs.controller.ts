import passport from 'passport';
import passportLocal from 'passport-local';
import session from 'express-session';

import { areCredentialsValid } from './auth.controller';
import { getUsers } from './user.controller'

const LocalStrategy = passportLocal.Strategy;
const SQLiteStore = require('connect-sqlite3')(session);

passport.use(new LocalStrategy( {
    usernameField: 'email',
    passwordField: 'password',
}, async (username:string, password:string, cb:any) => {
    if(!username || !password) { return cb(null, false, { message: 'Incorrect email or password' }) };
    
    const [User]: any = await getUsers( {where: {email: username}} );
    if (!User) return cb(null, false, { message: 'Incorrect email or password' });

    const areValidCredentials: boolean = await areCredentialsValid( {where: {email: username, password}} );

    if ( areValidCredentials ) {
        cb(null, { id: User.id, username: User.firstName });
    } else {
        cb(null, false, { message: 'Incorrect email or password' });
    }
} ));

passport.serializeUser(function(user:any, done:any) {
    done(null, user);
});
    
passport.deserializeUser(function(user:any, done:any) {
    return done(null, user);
});

export {passport, LocalStrategy, SQLiteStore, session};