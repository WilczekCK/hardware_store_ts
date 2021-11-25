import {router as GET}    from './get';
import {router as POST}   from './post';
import {router as DELETE} from './delete';
import {router as PATCH}  from './patch';
import {router as PUT}    from './put';

const routes = [GET, POST, DELETE, PATCH, PUT];

export {routes}