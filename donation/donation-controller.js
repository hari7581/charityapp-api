
const { DonationService } = require("./donation-service");
const donationService = new DonationService();

class DonationController {



    getAllDonations(req, res) {


        donationService.getAllDonations().then(result => {
            let donations = result;
            console.log(donations);
            res.json(donations);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.status(500).json({ erorMessage: err.message });
        });
    }
    findOne(req, res) {

        let donationId = req.params.id;
        console.log(donationId);
        donationService.findOne(donationId).then(result => {
            let donation = result;
            console.log(donation);
            res.status(200).json(donation);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.status(404).json({ errorMessage: err.message });
        });
    }
    save(req, res) {

        let donation = req.body;
        donationService.save(donation).then(result => {
            let data = result;
            res.status(201).json(data);
        }).catch(err => {
            console.error("Error", err.message);
            res.status(500).json({ errorMessage: err.message });
        });
    }
    updateDonationDetails(req, res) {

        let donationId = req.params.id;
        let donation = req.body;
        donation._id = donationId;

        donationService.update(donation).then(result => {
            let data = result;
            res.status(200).json(data);
        }).catch(err => {
            console.error("Error", err.message);
            res.status(500).json({ errorMessage: err.message });
        });
    }

    delete(req, res) {
        let donationId = req.params.id;
        donationService.delete(donationId).then(result => {
            let data = result;
            res.status(200).json(data);
        }).catch(err => {
            console.error("Error", err.message);
            res.status(500).json({ errorMessage: err.message });
        });
    }



    getMyDonations(req, res) {

        let userId = req.query.userId;
        console.log("userId:" + userId);

        donationService.searchId(userId).then(result => {
            let donations = result;
            console.log(donations);
            res.json(donations);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.json({ erorMessage: err.message });
        });
    }

}
exports.DonationController = DonationController;