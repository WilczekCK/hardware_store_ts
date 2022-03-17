import passport from 'passport';
import passportLocal from 'passport-local';
import passportCustom from 'passport-custom';
import session from 'express-session';

import { areCredentialsValid } from './auth.controller';
import { compareData } from './hashing.controller';
import { getUsers, UserPayload } from './user.controller'
import { User } from '../models';

const LocalStrategy = passportLocal.Strategy;
const CustomStrategy = passportCustom.Strategy;

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

passport.serializeUser(function(user:any, done:any) {
    console.log(`Serialize info: ${user.id}`);
    done(null, user);
});
    
passport.deserializeUser(function(user:any, done:any) {
    console.log(`Deserialize info: ${user}`);
    return done(null, user);
});

const findActualUserLogged = (sessions: Array<string>, token:any) => {
    function findUserKey(val:any) {
        if( val === token ){
            return val;
        }
    }

    return sessions.findIndex(findUserKey);
}

const isUserLogged = async (req:any, res:any) => {
    const sessionOrder = findActualUserLogged( Object.keys(req.sessionStore.sessions), req.headers.authorization );

    if( sessionOrder > -1 ) {
      return true;
    } 

    return false;
}

const refreshUserInfo = async (req: any, res: any) => {
    const sessionOrder:number = findActualUserLogged( Object.keys(req.sessionStore.sessions), req.headers.authorization );
    const sessions:string[] = Object.values(req.sessionStore.sessions);

    if ( ! await isUserLogged(req, res) )  {
        return false;
    }

    const sessionString:string = sessions[sessionOrder];
    const sessionObject:Record<string, Record<string, string>> = JSON.parse( sessionString );

    return sessionObject.passport.user;
}

const requireLogin = async (req:any, res:any, next: any) => {
    if( await isUserLogged(req, res) ) {
        next();
        return true;
    } 
    
    return false;
}


export {passport, LocalStrategy, SQLiteStore, session, requireLogin, isUserLogged, refreshUserInfo};