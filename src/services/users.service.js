import * as webClient from '../clients/web.client.js';
import logger from '../loaders/logger.js';
import ValidationError from "../errors/ValidationError.js";


export const getUsers = async (ids = null) => {
    console.log(ids)
    logger.info('Fetching all users from Slack');

    const response = await webClient.getUsers();

    let users = response.members
        .filter(member =>
            !member.is_bot &&
            member.name !== 'slackbot' &&
            !member.deleted)
        .map(member => ({
            id: member.id,
            name: member.profile.real_name
        }));
    logger.debug(`Fetched ${users.length} users`);

    if (Array.isArray(ids) && ids.length > 0) {
        users = users.filter(user => ids.includes(user.id));
        if (users.length !== ids.length) {
            throw new ValidationError('One or more provided IDs are invalid.');
        }
        logger.debug(`Filtered users to ${users.length} based on provided IDs`);
    }

    return users;
};
