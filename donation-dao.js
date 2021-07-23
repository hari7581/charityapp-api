const { HttpClient } = require("./http-client");
const dotenv = require('dotenv');
dotenv.config();
const httpClient = new HttpClient();


class DonationDAO {
    DB_URL = null;
    constructor() {
      this.DB_URL = process.env.DB_URL;
      console.log("DB_URL=" , this.DB_URL);
    }
  

    async getAllDonations() {

        const url = this.DB_URL + '/donations/_all_docs?include_docs=true';
        console.log(url);
        try{
            
            let result = await httpClient.get(url);
            console.log("Result", result);
            let rows = result.data.rows
            .filter(obj => !obj.id.includes("_design"))
            .map(obj => obj.doc);
            return rows;        
        }
        catch(err){
            this.handleErrorMessage(err);
        };
    }

  
    async findOne(donationId) {
        const url = this.DB_URL + "/donations/" + donationId;    
        try {
          let result = await httpClient.get(url);
          return result.data;
        } catch (err) {
          this.handleErrorMessage(err);
        }
      }
      async save(donation) {    
        const url = this.DB_URL + "/donations";    
        try {
          let result = await httpClient.post(url, donation);
          console.log(result);
          return result.data;
        } catch (err) {
          this.handleErrorMessage(err);
        }
      }
    
      async delete(donation) {
        const url = this.DB_URL + "/donations/" + donation._id + "?rev=" + donation._rev;
        
        try {
          let result = await httpClient.delete(url);
          return result.data;
        } catch (err) {
          this.handleErrorMessage(err);
        }
      }
    
      async update(donation) {
        const url = this.DB_URL + "/donations/" + donation._id + "?rev=" + donation._rev;    
        try {
          let result = await httpClient.put(url, donation);
          return result.data;
        } catch (err) {
          this.handleErrorMessage(err);
        }
      }

    
      handleErrorMessage(err) {
        console.error(err);
        let response = err.response.data;
        let errorMessage = err.response.data.error;
        console.log("errorMessage:" + errorMessage);
        if (response.error == "not_found" ) {
          if (response.reason == "Database does not exist."){
            throw new Error("Database not found");
          }
          else{
            throw new Error("Data not found");
          }
        } else {
          throw new Error(errorMessage);
        }
      }
      async getMyDonations(userId){


        let selector = {
            "selector": {
                "userId": userId.toString('base64')           
            },
            "fields":[ "_id","_rev", "name", "contactno", "amount","status","donate"]
        };

        const url = this.DB_URL + '/donations/_find';
      
        try{
            
            let result = await httpClient.post(url,selector);
            let rows = result.data.docs;
            return rows;        
        }
        catch(err){
            this.handleErrorMessage(err);
        };

    }

}
exports.DonationDAO = DonationDAO;
