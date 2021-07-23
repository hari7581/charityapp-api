const { UserService } = require("./user-service");
const userService = new UserService();
class UserController {
    login(req, res) {
        let { email, password } = req.body;

        userService.login(email, password).then(result => {
            let user = result;
            console.log(user);
            res.status(200).json(user);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.status(500).json({ errorMessage: err.message });
        });
    }

    getAllUsers(req, res) {

        userService.getAllUsers().then(result => {
            let users = result;
            console.log(users);
            res.status(200).json(users);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.status(500).json({ erorMessage: err.message });
        });
    }

    searchByRole(req, res) {

        let role = req.query.role;
        console.log("Role:" + role);

        userService.searchUsers(role).then(result => {
            let users = result;
            console.log(users);
            res.json(users);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.status(500).json({ erorMessage: err.message });
        });
    }

    findOne(req, res) {

        let userId = req.params.id;
        console.log(userId);
        userService.findOne(userId).then(result => {
            let user = result;
            console.log(user);
            res.status(200).json(user);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.status(404).json({ errorMessage: err.message });
        });
    }

    save(req, res) {

        let user = req.body;
        userService.save(user).then(result => {
            let data = result;
            res.status(201).json(data);
        }).catch(err => {
            console.error("Error", err.message);
            res.status(500).json({ errorMessage: err.message });
        });
    }

    changePassword(req, res) {

        let userId = req.params.id;
        let { password } = req.body;

        userService.changePassword(userId, password).then(result => {
            let data = result;
            res.status(200).json(data);
        }).catch(err => {
            console.error("Error", err.message);
            res.json({ errorMessage: err.message });
        });
    }

    updateUserDetails(req, res) {

        let userId = req.params.id;
        let user = req.body;
        user._id = userId;

        userService.update(user).then(result => {
            let data = result;
            res.status(200).json(data);
        }).catch(err => {
            console.error("Error", err.message);
            res.status(500).json({ errorMessage: err.message });
        });
    }

    delete(req, res) {
        let userId = req.params.id;
        userService.delete(userId).then(result => {
            let data = result;
            res.status(200).json(data);
        }).catch(err => {
            console.error("Error", err.message);
            res.status(500).json({ errorMessage: err.message });
        });
    }
}
exports.UserController = UserController;
