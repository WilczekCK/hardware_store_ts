import passport from 'passport';
import passportLocal from 'passport-local';
import session from 'express-session';

import { areCredentialsValid } from './auth.controller';
import { getUsers, UserPayload } from './user.controller'
import { User } from '../models';

const LocalStrategy = passportLocal.Strategy;
const SQLiteStore = require('connect-sqlite3')(session);

passport.use(new LocalStrategy( {
    usernameField: 'email',
    passwordField: 'password',
}, async (username:string, password:string, cb:any) => {
    if(!username || !password) { return cb(null, false, { message: 'Incorrect email or password' }) };

    const areValid: boolean = await areCredentialsValid( {where: {email: username, password}} );

    if ( areValid ) {
        const [User]: any = await getUsers({ where: {email: username} });
        cb(null, { id: User.id, nickname: User.firstName });
    } else {
        cb(null, false, { message: 'Incorrect email or password' });
    }
} ));

passport.serializeUser(function(user:any, cb:any) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username });
    });
});
    
passport.deserializeUser(function(user:any, cb:any) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

export {passport, LocalStrategy, SQLiteStore, session};