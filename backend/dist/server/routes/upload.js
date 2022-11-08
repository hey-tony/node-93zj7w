"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../../../lib/xlsx_parser/dist");
const routeUpload = {
    method: 'POST',
    path: '/upload',
    options: {
        payload: {
            output: 'stream',
            multipart: {
                output: 'stream'
            },
            parse: true,
            maxBytes: 524288e3,
            allow: 'multipart/form-data',
        },
        handler: async (request, h) => {
            const payload = request.payload;
            const data = await new dist_1.default().parse(payload.file);
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
exports.default = [routeUpload];
