import passport from 'passport';
import passportLocal from 'passport-local';
import session from 'express-session';
import crypto from 'crypto';
import { areCredentialsValid } from './auth.controller';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy( {
    usernameField: 'email',
    passwordField: 'password'
}, async (username:string, password:string, cb:any) => {
    if(!username || !password) { return cb(null, false, { message: 'Incorrect email or password' }) };

    const areValid: boolean = await areCredentialsValid( {where: {email: username, password}} );

    if ( areValid ) {
        cb(null, { email: username, password });
    } else {
        cb(null, false, { message: 'Incorrect email or password' });
    }
} ));

passport.serializeUser(function(user:any, done:any) {
    done(null, user);
});
    
passport.deserializeUser(function(user:any, done:any) {
    done(null, user);
});

export {passport, LocalStrategy, crypto, session};