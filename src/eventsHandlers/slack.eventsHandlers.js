import {sendMessage, sendReaction} from "../clients/web.client.js";
import * as elevatorActivationRequestsService from "../services/elevatorActivation.service.js";
import elevatorActivationMicrocontrollersService from "../services/microcontrollers/elevatorActivationMicrocontrollers.service.js";
import * as hoursService from "../services/hours/hours.service.js";
import logger from "../loaders/logger.js"
import * as adminsRepository from "../repositories/admins.repository.js"

const processedEventIds = new Set();

export const handleMessageEvent = async ({ack, body}) => {
    await ack();

    const eventId = body.event_id;
    const event = body.event;
    const {channel, ts, text} = event;

    console.log("event", eventId, "channel", channel, "ts", ts, "text", text);
    if (isDuplicate(eventId)) return;


    logger.info(`Handling Slack message event.`, {eventId, channel, ts});

    const botMentionRegex = /^<@[^>]+>\s*/;
    const command = text.replace(botMentionRegex, '').trim().toLowerCase();
    const handler = commandHandlers[command] || commandHandlers.default;
    await handler(eventId, event);
}

const isDuplicate = (eventId) => {
    if (processedEventIds.has(eventId)) {
        console.log("Duplicate event detected, ignoring.");
        return true;
    }

    processedEventIds.add(eventId);
    setTimeout(() => {
        processedEventIds.delete(eventId);
    }, 60 * 60 * 1000);

    return false;
}

const commandHandlers = {
    status: async (eventId, { channel, ts, user: userId }) => {
        logger.info(`Handling 'status' message.`, { eventId, channel, ts });

        const adminIds = adminsRepository.get();
        if(!adminIds.includes(userId)){
            await sendMessage('You are not authorized to perform this action.', channel, ts);
        }
        else{
            const status = elevatorActivationMicrocontrollersService.getStatus();
            await sendMessage(`Microcontrollers status: \n${formatStatus(status)}`, channel, ts);
        }
    },

    default: async (eventId, { channel, ts }) => {
        if (hoursService.getMinutesTillOpening() !== 0) {
            await sendMessage('Error: cannot place an activation request outside of working hours.', channel, ts);
            await sendReaction('thumbsdown', channel, ts);
            return;
        }

        if (!elevatorActivationMicrocontrollersService.isAnyActive()) {
            await sendMessage('Error: no elevator activation microcontroller is currently active.', channel, ts);
            await sendReaction('thumbsdown', channel, ts);
            return;
        }


        await sendMessage('Request received successfully.', channel, ts);
        elevatorActivationRequestsService.addRequestFromEvent(eventId, channel, ts);
    }
};

const formatStatus = (status) => {
    return status.map(({ id, isActive, lastActiveAt }) => {
        const lastActiveAtFormated = lastActiveAt === "Never"
            ? "Never"
            : new Date(lastActiveAt).toLocaleString("en-US", { timeZone: "Africa/Cairo" });

        return `*${id}*: ${isActive ? '🟢 Active' : '🔴 Inactive'} (Last active: ${lastActiveAtFormated})`;
    }).join('\n');
};