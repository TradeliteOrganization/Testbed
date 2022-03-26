export const getUserCurrency = async () => {
    const response = await fetch(
        "https://api.ipgeolocation.io/ipgeo?apiKey=c56ed09b75d4426486fc20d13a23779a"
    );
    const userInfo = await response.json();

    return userInfo.currency.code;
};
