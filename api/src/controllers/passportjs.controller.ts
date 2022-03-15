import passport from 'passport';
import passportLocal from 'passport-local';
import session from 'express-session';

import { areCredentialsValid } from './auth.controller';
import { compareData } from './hashing.controller';
import { getUsers, UserPayload } from './user.controller'
import { User } from '../models';

const LocalStrategy = passportLocal.Strategy;
const SQLiteStore = require('connect-sqlite3')(session);

passport.use(new LocalStrategy( {
    usernameField: 'email',
    passwordField: 'password',
}, async (username:string, password:string, cb:any) => {
    if(!username || !password) { return cb(null, false, { message: 'Incorrect email or password' }) };
    
    const [User]: any = await getUsers( {where: {email: username}} );

    const areValidCredentials: boolean = await areCredentialsValid( {where: {email: username, password}} );
    const isHashedPasswordValid = password === User.password;    

    if ( areValidCredentials || isHashedPasswordValid && User) {
        cb(null, { id: User.id, nickname: User.firstName });
    } else {
        cb(null, false, { message: 'Incorrect email or password' });
    }
} ));

passport.serializeUser(function(user:any, cb:any) {
    console.log(`Serialize info: ${user.id}`);
    cb(null, user.id);
});
    
passport.deserializeUser(async function(id:any, cb:any) {
    console.log(`Deserialize info: ${id}`);
    let user = await getUsers( {where: {id}} );

    if ( user ) {
        return cb(null, user);
    }

});

export {passport, LocalStrategy, SQLiteStore, session};