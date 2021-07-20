import axios from "axios";

export function findProductbyCode( code ){
    return axios.get('http://localhost:4000/api/products/product', { params: {code} });
}