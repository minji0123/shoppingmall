/**
 * 1. default export
 * let a = 10;
 * 
 * export default a;
 * -> import 작명 from './data.js';
 */


/**
 * 2. export 여러 개
 * let a = 10;
 * let b = 100;
 * 
 * export {a,b}
 * -> import {a,b} from './data.js';
 */

/**
 * + 함수, 컴포넌트도 export 가능
 * 
 */

let data = [
    {
        id : 0,
        title : "White and Black",
        content : "Born in France",
        price : 120000
    },

    {
        id : 1,
        title : "Red Knit",
        content : "Born in Seoul",
        price : 110000
    },

    {
        id : 2,
        title : "Grey Yordan",
        content : "Born in the States",
        price : 130000
    }
] 

export default data;