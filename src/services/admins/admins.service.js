import * as adminsRepository from '../../repositories/admins.repository.js';
import * as usersService from '../users.service.js'
import logger from '../../loaders/logger.js';

export const getAdmins = async () => {
    logger.info('Fetching current admin IDs');

    const adminIds = adminsRepository.get();
    logger.debug(`Retrieved IDs: ${JSON.stringify(adminIds)}`);

    logger.info('Fetching user details for IDs');
    const admins = await usersService.getUsers(adminIds);

    logger.debug(`Responding to request with admins: ${JSON.stringify(admins)}`);
    return admins;
};

export const updateAdmins = async (ids) => {
    logger.info('Validating provided IDs', { ids });

    logger.info('Fetching user details for provided IDs');
    const admins = await usersService.getUsers(ids);

    logger.info('Updating admin IDs', { ids });
    adminsRepository.update(ids);

    logger.debug(`Responding to request with updated admins: ${JSON.stringify(admins)}`);
    return admins;
}
