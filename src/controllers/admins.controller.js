import * as adminsService from '../services/admins/admins.service.js';

export const getAdmins = async (req, res,next) => {
    try {
        let admins = await adminsService.getAdmins();
        res.status(200).json(admins);
    }
    catch (err) {
        next(err)
    }
}

export const updateAdmins = async (req, res, next) => {
    try {
        const admins = await adminsService.updateAdmins(req.body.ids)
        res.status(200).json(admins);
    }
    catch (err) {
        next(err)
    }
}