import { SocketModeClient } from "@slack/socket-mode"

import {SLACK_APP_TOKEN} from "../config/slack.tokens.js";
import * as events from "../constants/slackEvents.constants.js"
import * as eventsHandlers from "../eventsHandlers/slack.eventsHandlers.js"

const socketModeClient = new SocketModeClient({
    appToken: SLACK_APP_TOKEN
});

socketModeClient.on(events.MESSAGE, eventsHandlers.handleMessageEvent);

export default socketModeClient;