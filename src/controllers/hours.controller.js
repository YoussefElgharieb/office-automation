import * as hoursService from '../services/hours/hours.service.js';

export const getHours = (req, res) => {
    let hours = hoursService.getHours()
    res.status(200).json(hours);
}

export const updateHours = async (req, res) => {
    let updatedHours = hoursService.updateHours(req.body)
    res.status(200).json(updatedHours);
}

export const getMinutesTillOpening = (req, res) => {
    let minutesTillOpening = hoursService.getMinutesTillOpening()
    res.status(200).json(minutesTillOpening);
}