const { DonationDAO } = require("./donation-dao");
const donationDAO = new DonationDAO();

class DonationService {
    

    async  getAllDonations() {
       
        return donationDAO.getAllDonations(); 
    }
    

    async findOne(donationId) {

        try{
            let donation = await donationDAO.findOne(donationId);
            return donation;
        }
        catch(err){
            console.error(err);
            throw new Error(err.message);
        }

       
    }
    async save(donation) {

        console.log(donation);

        try{
           let exists  =  false; //await donationDAO.findOne();

           if(exists){
               throw new Error("name Already Registered");
           }
           
           let result = await donationDAO.save(donation);
           return result;

        }
        catch(err) {
            console.error(err.message);         
            throw new Error(err.message);
         
        };
    }

    async delete(donationId){
       
        try{

            let donation = await donationDAO.findOne(donationId);
            if( !donation){
                throw new Error("Donation Id not found");
            }
            let result = await donationDAO.delete(donation);
            return result.data;

        }catch(err ){
            console.log(err.message);
            console.error("Error", err.message);
            throw new Error(err.message);
        }
    }

    async update(donation){

        try{
            let actualRecord = await donationDAO.findOne(donation._id);
            if( !actualRecord){
                throw new Error("donation Id not found");
            }

            //update - name,email,password
            actualRecord.name = donation.name;
            actualRecord.contactno = donation.contactno;
            actualRecord.amount = donation.amount;
            actualRecord.status = donation.status;
            actualRecord.donate = donation.donate;
            

            let result = await donationDAO.update(actualRecord);
            return result.data;

        }catch(err ){
            console.log(err.message);
            console.error("Error", err.message);
            throw new Error(err.message);
        }
       
    }

    async searchId(userId) {

        return orderDAO.getMyDonations(userId);
    }   
}
exports.DonationService = DonationService;
