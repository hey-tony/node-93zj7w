"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XlsxTransformer = exports.XlsxTransformerFactory = exports.TransformerType = void 0;
const XmlFlow = require("xml-flow");
var TransformerType;
(function (TransformerType) {
    // ContentType = '[Content_Types]',
    TransformerType["PassThrough"] = "passthrough";
    TransformerType["SharedStrings"] = "xl/sharedStrings";
    TransformerType["Workbook"] = "xl/workbook";
    TransformerType["Worksheet"] = "xl/worksheets/sheet";
})(TransformerType = exports.TransformerType || (exports.TransformerType = {}));
class XlsxTransformerFactory {
    transformers = {};
    createTransformer(type) {
        if (!type) {
            console.error(`Invalid transformer type. ("${type}")`);
        }
        const func = this.transformers[type];
        if (!func) {
            console.error(`Undefined transformer function. (${type})`);
        }
        return new func();
    }
    registerTransformer(type, func) {
        this.transformers[type] = func;
    }
}
exports.XlsxTransformerFactory = XlsxTransformerFactory;
class XlsxTransformer {
    parseXML(stream, xmlTag) {
        return new Promise((resolve, reject) => {
            const xmlStream = XmlFlow(stream);
            const tagName = `tag:${xmlTag}`;
            let data = [];
            xmlStream
                .on(tagName, (tag) => {
                data.push(tag);
            })
                .on('error', (error) => {
                console.error(error);
                reject(error);
            })
                .on('end', () => {
                resolve(data);
            });
        });
    }
}
exports.XlsxTransformer = XlsxTransformer;
