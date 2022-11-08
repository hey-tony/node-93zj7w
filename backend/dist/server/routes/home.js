"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeIndex = {
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
        const index = 'index.html';
        return h.file(index);
    },
};
const routeStaticFiles = {
    method: 'GET',
    path: '/public/{files*}',
    handler: (request, h) => {
        return h.file(request.params.files);
    },
};
exports.default = [routeIndex, routeStaticFiles];
