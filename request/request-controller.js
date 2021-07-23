  
const { RequestService } = require("./request-service");
const requestService = new RequestService();

class RequestController {    



    getAllRequests(req, res) {

        
        requestService.getAllRequests().then(result => {
            let requests = result;
            console.log(requests);
            res.json(requests);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.status(500).json({ erorMessage:  err.message });
        });
    }

    

    searchByname(req, res) {

        let name = req.query.name;
        console.log("Name:" + name);
        
        requestService.searchname(name).then(result => {
            let requests = result;
            console.log(requests);
            res.json(requests);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.status(500).json({ erorMessage:  err.message });
        });
    }

    

    


    findOne(req, res) {

        let requestId = req.params.id;
        console.log(requestId);
        requestService.findOne(requestId).then(result => {
            let request = result;
            console.log(request);            
            res.status(200).json(request);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.status(404).json({errorMessage: err.message});
        });
    }
    save(req, res) {

        let request = req.body;
        requestService.save(request).then(result => {
            let data = result;            
            res.status(201).json(data);
        }).catch(err => {            
            console.error("Error", err.message);
            res.status(500).json({errorMessage: err.message});
        });
    }
    updateRequestDetails(req, res) {

        let requestId = req.params.id;
        let request = req.body;        
        request._id = requestId;

        requestService.update(request).then(result => {
            let data = result;            
            res.status(200).json(data);
        }).catch(err => {            
            console.error("Error", err.message);
            res.status(500).json({errorMessage: err.message});
        });
    }

    delete(req,res){
        let requestId = req.params.id;
        requestService.delete(requestId).then(result => {
            let data = result;            
            res.status(200).json(data);
        }).catch(err => {            
            console.error("Error", err.message);
            res.status(500).json({errorMessage: err.message});
        });
    }


}
exports.RequestController = RequestController;