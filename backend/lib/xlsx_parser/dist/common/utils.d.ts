import { IXmlData, IXmlFlowResultItem } from "./interfaces";
/**
 * Wraps a single item or an array and always returns
 * an array.
 * @param {object|Array<any>} val - Item or items to wrap
 * @returns {Array<any>} Array or single item wrapped in array
 */
export declare const alwaysArray: (val: object | Array<any>) => any[];
/**
 * Helper function that simplifies the XML-Flow structure to make
 * working with XML data easier.
 * @param {IXmlFlowResultItem} xml - XML-Flow result data
 * @returns {IXmlData}
 */
export declare const extractXmlData: (xml: IXmlFlowResultItem) => IXmlData;
/**
 * Returns all text from parent and child nodes.
 * @params {IXmlData} xmlJsonNode - Node to parse.
 * @returns {string[]} List of strings
 */
export declare const getText: (xmlJsonNode: IXmlData) => string[];
/**
 * Removes leading and trailing whitespace from an
 * array of strings.
 * @param {string[]} list - Array of strings
 * @return {string[]}
 */
export declare const trim: (list: string[]) => string[];
