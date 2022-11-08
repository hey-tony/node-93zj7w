"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home_1 = require("./home");
const upload_1 = require("./upload");
const routes = [...home_1.default, ...upload_1.default];
exports.default = routes;
