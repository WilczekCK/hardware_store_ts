import passport from 'passport';
import passportLocal from 'passport-local';
import crypto from 'crypto';

const LocalStrategy = passportLocal.Strategy;

export {passport, LocalStrategy, crypto};