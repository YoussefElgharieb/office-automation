import elevatorActivationMicrocontrollersService from '../../services/microcontrollers/elevatorActivationMicrocontrollers.service.js';


export const poll = async (req, res) => {
    const dto = await elevatorActivationMicrocontrollersService.poll(req.params.id);
    res.status(200).json(dto);
}

export const getStatus = (req, res) => {
    let status = elevatorActivationMicrocontrollersService.getStatus();
    res.status(200).json({status});
}