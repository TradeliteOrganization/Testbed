import { currencies } from "../mockData/currencies.js";

export const getCurrencyInfo = (currencyId) =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(currencies[currencyId]), Math.random() * 1000);
    });
