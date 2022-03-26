export const getConvertedCurrency = async (baseCurrencyCode, userCurrencyCode, amount) => {
    const response = await fetch(
        `https://api.exchangerate.host/convert?from=${baseCurrencyCode}&to=${userCurrencyCode}&amount=${amount}`
    );
    const info = await response.json();

    return info.result;
};
