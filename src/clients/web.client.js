import {WebClient} from "@slack/web-api";

import {SLACK_BOT_TOKEN} from "../config/slack.tokens.js";

const webClient = new WebClient(SLACK_BOT_TOKEN);

export const sendMessage = async (message, channel, ts) => {
    await webClient.chat.postMessage({
        channel: channel,
        text: message,
        thread_ts: ts
    });
}

export const sendReaction = async (reaction, channel, ts) => {
    await webClient.reactions.add({
        channel: channel,
        timestamp: ts,
        name: reaction
    });
}

export const getUsers = async () => {
    let response = await webClient.users.list();
    return response;
}