import * as hoursRepository from '../../repositories/hours.repositoriy.js';
import logger from "../../loaders/logger.js"

export const getHours = () => {
    logger.info('Fetching working hours from repository');
    let hours = hoursRepository.getHours();
    logger.debug(`Responding to request with hours: ${JSON.stringify(hours)}`);
    return hours;
}

export const updateHours = (hours) => {
    logger.info(`Updating woking hours: ${JSON.stringify(hours)}`);
    let updatedHours = hoursRepository.updateHours(hours);
    logger.debug(`Responding to request with updated woking hours: ${JSON.stringify(updatedHours)}`);
    return updatedHours;
}

export const getMinutesTillOpening = (currentDate = new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Cairo"}))) => {
    logger.info(`Calculating minutes till office opens.`);

    const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    let currentDay = currentDate.getDay();

    let hours = hoursRepository.getHours();

    if (hours[weekDays[currentDay]].isOpen) {
        if (hours[weekDays[currentDay]].opening > currentDate.getHours()) {
            // The office will open later today.
            let openingDate = new Date(currentDate);
            openingDate.setHours(hours[weekDays[currentDay]].opening, 0, 0, 0);
            return Math.round((openingDate - currentDate) / (1000 * 60))
        } else if (hours[weekDays[currentDay]].closing > currentDate.getHours()) {
            // The office is currently open.
            return 0;
        }
        // The office has already closed today.
    }
    // The office is either closed or has already closed today.

 
    let daysOffset = 1;
    while (!hours[weekDays[(currentDay + daysOffset) % 7]].isOpen && daysOffset <= 7) {
        daysOffset++
    }

    if (daysOffset > 7) {
        // The office is indefinitly closed.
        return Infinity;
    }

    // The office will open in 'daysOffset' day(s) from now.
    let openingDate = new Date(currentDate);
    openingDate.setDate(currentDate.getDate() + daysOffset)
    openingDate.setHours(hours[weekDays[(currentDay + daysOffset) % 7]].opening, 0, 0, 0);
    return Math.round((openingDate - currentDate) / (1000 * 60))
}