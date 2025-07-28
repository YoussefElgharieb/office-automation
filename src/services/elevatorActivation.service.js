import {sendMessage, sendReaction} from "../clients/web.client.js";
import logger from "../loaders/logger.js"

const eventRequests = new Map();
const apiRequests = new Map()


export const addRequestFromEvent = (eventId, channel, ts) => {
    logger.info(`Elevator activation requested from event.`, { eventId, channel, ts });
    let timeout = setTimeout(async () => {
        logger.error(`Elevator activation request from event timed out.`, { eventId, channel, ts });
        eventRequests.delete(eventId);
        await sendMessage('Error: no elevator activation microcontroller responded. Try again later or contact your administrator', channel, ts);
        await sendReaction('thumbsdown', channel, ts);
    }, 60 * 1000);

    eventRequests.set(eventId, {channel, ts, timeout});
}

export const addRequestFromApi = () => {
    const timestamp = Date.now();
    logger.info(`Elevator activation requested from API`, {timestamp});

    const timeout = setTimeout(async () => {
        logger.warn(`Elevator activation request from API timed out`, {timestamp})
        apiRequests.delete(timestamp);
    }, 60 * 1000);

    apiRequests.set(timestamp, timeout);
}

export const  clearRequests = async () => {
    logger.info(`Clearing all elevator activation requests.`, {
        eventActivationRequestsCount: eventRequests.size,
        apiActivationRequestsCount: apiRequests.size,
    })

    for (const [, { channel, ts, timeout }] of eventRequests) {
        clearTimeout(timeout);
        await sendMessage('Elevator activated.', channel, ts);
        await sendReaction('thumbsup', channel, ts);
    }
    eventRequests.clear();

    for (const timeout of apiRequests.values()) {
        clearTimeout(timeout);
    }
    apiRequests.clear();
}

export const isActivationRequested = () =>{
    const hasPendingActivationRequests = eventRequests.size > 0 || apiRequests.size > 0;
    logger.debug(`Checking if elevator activation is requested`, {
        eventCount: eventRequests.size,
        apiCount: apiRequests.size,
        hasPendingActivationRequests,
    });
    return hasPendingActivationRequests;
}
