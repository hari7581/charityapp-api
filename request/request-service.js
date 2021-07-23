const { RequestDAO } = require("./request-dao");
const requestDAO = new RequestDAO();

class RequestService {
    

    async  getAllRequests() {
       
        return requestDAO.getAllRequests(); 
    }
    
    async searchname(name) {

        return requestDAO.searchByname(name);
    }

    async findOne(requestId) {

        try{
            let request = await requestDAO.findOne(requestId);
            return request;
        }
        catch(err){
            console.error(err);
            throw new Error(err.message);
        }

       
    }
    async save(request) {

        console.log(request);

        try{
           let exists  =  false; //await requestDAO.findOne();

           if(exists){
               throw new Error("name Already Registered");
           }
           
           let result = await requestDAO.save(request);
           return result;

        }
        catch(err) {
            console.error(err.message);         
            throw new Error(err.message);
         
        };
    }

    async delete(requestId){
       
        try{

            let request = await requestDAO.findOne(requestId);
            if( !request){
                throw new Error("Request Id not found");
            }
            let result = await requestDAO.delete(request);
            return result.data;

        }catch(err ){
            console.log(err.message);
            console.error("Error", err.message);
            throw new Error(err.message);
        }
    }

    async update(request){

        try{
            let actualRecord = await requestDAO.findOne(request._id);
            if( !actualRecord){
                throw new Error("Request Id not found");
            }

            //update - name,email,password
            actualRecord.name = request.name;
            actualRecord.contactno = request.contactno;
            actualRecord.amount = request.amount;
            actualRecord.status = request.status;
            

            let result = await requestDAO.update(actualRecord);
            return result.data;

        }catch(err ){
            console.log(err.message);
            console.error("Error", err.message);
            throw new Error(err.message);
        }
       
    }


    // async save(request) {

    //     console.log(request);

    //     try{
    //        let exists  =  false; //await requestDAO.findOne();

    //        if(exists){
    //            throw new Error("request Already Registered");
    //        }
           
    //        let result = await requestDAO.save(request);
    //        return result;

    //     }
    //     catch(err) {
    //         console.error(err.message);         
    //         throw new Error(err.message);
         
    //     };
    // }
}
exports.RequestService = RequestService;
