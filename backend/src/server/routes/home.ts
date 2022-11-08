import * as Hapi from '@hapi/hapi';

const routeIndex: Hapi.ServerRoute = {
  method: 'GET',
  path: '/',
  handler: async (
    request: Hapi.Request<Hapi.ReqRefDefaults>, 
    h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
  ) => {
    const index = 'index.html';
    return h.file(index);
  },
};

const routeStaticFiles: Hapi.ServerRoute = {
  method: 'GET',
  path: '/public/{files*}',
  handler: (
    request: Hapi.Request<Hapi.ReqRefDefaults>, 
    h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
  ) => {
    return h.file(request.params.files);
  },
};

export default [routeIndex, routeStaticFiles];
