import { tournaments } from "../mockData/tournaments.js";

export const getTournamentInfo = (entityId) =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(tournaments[entityId]), Math.random() * 1000);
    });
