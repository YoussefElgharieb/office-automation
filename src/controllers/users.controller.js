import * as usersServices from '../services/users.service.js';


export const getUsers = async (req, res, next) => {
    try {
        let users = await usersServices.getUsers();
        res.status(200).json(users);
    }
    catch (err) {
        next(err)
    }
}