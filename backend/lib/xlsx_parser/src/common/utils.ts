import { IXmlData, IXmlFlowResultItem } from "./interfaces";

/**
 * Wraps a single item or an array and always returns
 * an array.
 * @param {object|Array<any>} val - Item or items to wrap
 * @returns {Array<any>} Array or single item wrapped in array
 */
export const alwaysArray = ( val: object|Array<any> ) => {
    if ( val instanceof Array ) {
        return val;
    }
    return [ val ];
}

/**
 * Helper function that simplifies the XML-Flow structure to make
 * working with XML data easier.
 * @param {IXmlFlowResultItem} xml - XML-Flow result data
 * @returns {IXmlData}
 */
export const extractXmlData = ( xml: IXmlFlowResultItem ): IXmlData => {
    const name = xml['$name'] || '';
    const attrs = xml['$attrs'];
    const markup = xml['$markup'];
    let children = [];

    if ( markup && markup.length ) {
        if (typeof markup[0] !== 'object') {
            children = markup;
        } else {
            children = markup.map((child) => extractXmlData(child));
        }
    }

    return {
        name,
        ...attrs,
        children
    };
};

/**
 * Returns all text from parent and child nodes.
 * @params {IXmlData} xmlJsonNode - Node to parse.
 * @returns {string[]} List of strings
 */
export const getText = ( xmlJsonNode: IXmlData ) : string[] => {
    let text: string[] = [];
    let children = xmlJsonNode.children;
    
    while( children.length ) {
        let nestedChildren: IXmlData[] = [];
        children.forEach( child => {
            if ( typeof child === 'string' ) {
                text.push( child );
            }
            else if ( child.children ) {
                nestedChildren.push( ...child.children );
            }
        });
        children = nestedChildren;
    }
    return text;
}

/**
 * Removes leading and trailing whitespace from an
 * array of strings.
 * @param {string[]} list - Array of strings
 * @return {string[]} 
 */
export const trim = ( list: string[] ): string[] => {
    return list.map( str => str.trim() );
}