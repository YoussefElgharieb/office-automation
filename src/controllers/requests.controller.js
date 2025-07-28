import * as requestsService from "../services/requests.service.js";

export const requestElevatorActivation = (req, res) => {
    requestsService.requestElevatorActivation();
    res.status(200).json({ message: 'Request added successfully' });
}