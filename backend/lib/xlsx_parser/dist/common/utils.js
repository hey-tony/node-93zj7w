"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trim = exports.getText = exports.extractXmlData = exports.alwaysArray = void 0;
/**
 * Wraps a single item or an array and always returns
 * an array.
 * @param {object|Array<any>} val - Item or items to wrap
 * @returns {Array<any>} Array or single item wrapped in array
 */
const alwaysArray = (val) => {
    if (val instanceof Array) {
        return val;
    }
    return [val];
};
exports.alwaysArray = alwaysArray;
/**
 * Helper function that simplifies the XML-Flow structure to make
 * working with XML data easier.
 * @param {IXmlFlowResultItem} xml - XML-Flow result data
 * @returns {IXmlData}
 */
const extractXmlData = (xml) => {
    const name = xml['$name'] || '';
    const attrs = xml['$attrs'];
    const markup = xml['$markup'];
    let children = [];
    if (markup && markup.length) {
        if (typeof markup[0] !== 'object') {
            children = markup;
        }
        else {
            children = markup.map((child) => (0, exports.extractXmlData)(child));
        }
    }
    return {
        name,
        ...attrs,
        children
    };
};
exports.extractXmlData = extractXmlData;
/**
 * Returns all text from parent and child nodes.
 * @params {IXmlData} xmlJsonNode - Node to parse.
 * @returns {string[]} List of strings
 */
const getText = (xmlJsonNode) => {
    let text = [];
    let children = xmlJsonNode.children;
    while (children.length) {
        let nestedChildren = [];
        children.forEach(child => {
            if (typeof child === 'string') {
                text.push(child);
            }
            else if (child.children) {
                nestedChildren.push(...child.children);
            }
        });
        children = nestedChildren;
    }
    return text;
};
exports.getText = getText;
/**
 * Removes leading and trailing whitespace from an
 * array of strings.
 * @param {string[]} list - Array of strings
 * @return {string[]}
 */
const trim = (list) => {
    return list.map(str => str.trim());
};
exports.trim = trim;
