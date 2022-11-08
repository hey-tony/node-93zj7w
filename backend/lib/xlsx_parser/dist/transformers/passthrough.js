"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassThroughTransformer = void 0;
const transformer_factory_1 = require("./transformer_factory");
/**
 * Noop transformer
 */
class PassThroughTransformer extends transformer_factory_1.XlsxTransformer {
    constructor() {
        super();
    }
    transform(entry) {
        return new Promise(async (resolve, reject) => {
            resolve(entry);
        });
    }
}
exports.PassThroughTransformer = PassThroughTransformer;
