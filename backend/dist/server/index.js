"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const Hapi = require("@hapi/hapi");
const path = require("path");
const inert = require("@hapi/inert");
const routes_1 = require("./routes/");
const PORT = 9000;
const HOST = 'localhost';
exports.server = Hapi.server({
    port: PORT,
    host: HOST,
    routes: {
        files: {
            relativeTo: path.join(__dirname, '../public'),
        },
    },
});
const init = async () => {
    await exports.server.register(inert);
    exports.server.route(routes_1.default);
    await exports.server.start();
    console.log('Server running on %s', exports.server.info.uri);
};
process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});
init();
