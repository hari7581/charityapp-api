const express = require('express')
const cors = require('cors');

const dotenv = require('dotenv');
const { UserController } = require("./user/user-controller");
const { RequestController } = require("./request/request-controller");
const { DonationController } = require("./donation/donation-controller");
dotenv.config();

const app = express()
app.use(express.json());
app.use(cors());
const port = 3500 

const userController = new UserController();
app.post('/api/v1/auth/login', userController.login);
app.get('/api/v1/users', userController.getAllUsers);
app.get('/api/v1/users/search', userController.searchByRole);
app.get('/api/v1/users/:id', userController.findOne);
app.post('/api/v1/users', userController.save);
app.put('/api/v1/users/:id', userController.updateUserDetails);
app.patch('/api/v1/users/:id', userController.changePassword);
app.delete('/api/v1/users/:id', userController.delete);
const requestController = new RequestController();
app.get('/api/v1/requests', requestController.getAllRequests);
app.post('/api/v1/requests', requestController.save);
app.put('/api/v1/requests/:id', requestController.updateRequestDetails);
app.delete('/api/v1/requests/:id', requestController.delete);

const donationController = new DonationController();
app.get('/api/v1/donations', donationController.getAllDonations);
app.post('/api/v1/donations', donationController.save);
app.patch('/api/v1/donations/:id', donationController.updateDonationDetails);
app.get('/api/v1/donations/:id', donationController.findOne);
app.get('/api/v1/donations', donationController.getMyDonations);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))