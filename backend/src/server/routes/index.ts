import * as Hapi from '@hapi/hapi';
import home from './home';
import upload from './upload';

const routes: Hapi.ServerRoute[] = [...home, ...upload];
export default routes;
