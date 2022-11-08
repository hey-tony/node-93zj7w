import * as Hapi from '@hapi/hapi';
import XlsxParser from '../../../lib/xlsx_parser/dist';

import { HapiRoutePayload } from '../../common/interfaces';

const routeUpload: Hapi.ServerRoute = {
    method: 'POST',
    path: '/upload',
    options: {
        payload: {
            output: 'stream',
            multipart: {
                output: 'stream'
            },
            parse: true,
            maxBytes: 524288e3, // 50 MiB max
            allow: 'multipart/form-data',
        },
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const payload = request.payload as HapiRoutePayload;
            const data = await new XlsxParser().parse( payload.file );
            const success = {
                message: 'File upload success!',
                success: true,
                data
            };
            const response = h.response(success).type('application/json');
            return response;
        },
    },
};

export default [routeUpload];
