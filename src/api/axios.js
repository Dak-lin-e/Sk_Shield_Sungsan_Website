import axios from 'axios'

const instance = axios.create({
    baseURL: "https://www.themoviedb.org/3",

    params:{
        api_key:"753dcdc9d2fc58a0ecc502e0b470cfef",
        language:"ko-KR",

    }       
   });

   export default instance;
    