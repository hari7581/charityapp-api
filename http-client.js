
  
const axios = require('axios');

class HttpClient {

    headers;    
    constructor(){
        const apiKey = Buffer.from(process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD).toString('base64');
        console.log(apiKey);
        this.headers  =  {
            'Authorization': `Basic ${apiKey}`
        };
       // console.log(this.headers);
    }

    async get(url){
        console.log("URL:" , url);
        return axios.get(url, { headers: this.headers });
    }

    async post(url, data){
        console.log("URL:", url ,"data:", JSON.stringify(data));
        return axios.post(url,data, { headers: this.headers });
    }

    async patch(url,data){
        console.log("URL:", url ,"data:", JSON.stringify(data));
        return axios.patch(url,data, { headers: this.headers });
    }

    async put(url,data){
        console.log("URL:", url ,"data:", JSON.stringify(data));
        return axios.put(url,data, { headers: this.headers });
    }

    async delete(url){
        console.log("URL:", url );
        return axios.delete(url, { headers: this.headers });
    }
}

exports.HttpClient = HttpClient;