import instance from "../Config/Axios";

//const KEY = '66780bf1fc356234f0a38742f8313206';
const KEY = '56be73829f1161d68cdc3a5d3769e6f0';
//const KEY = 'demo';

export async function getProfile(ticker) {
    return instance.get(`profile/${ticker}?apikey=${KEY}`)
}

export function getIncomeStatement(ticker, limit) {
    return instance.get(`income-statement/${ticker}?limit=${limit}&apikey=${KEY}`)
}

export function getBalanceSheet(ticker, limit) {
    return instance.get(`balance-sheet-statement/${ticker}?limit=${limit}&apikey=${KEY}`)
}

export function getCashFlowStatement(ticker, limit) {
    return instance.get(`cash-flow-statement/${ticker}?apikey=${KEY}&limit=${limit}`)
}

export function getSymbols() {
    return instance.get(`stock/list?&apikey=${KEY}`)
}

export function getProfileAndIncomeStatement(ticker) {
    const api1 = `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${KEY}`;
    const api2 = `https://financialmodelingprep.com/api/v3/income-statement/${ticker}?limit=120&apikey=${KEY}`
    const urls = [api1, api2]

    return getAllUrls(urls);
}

async function getAllUrls(urls) {
    try {
        var data = await Promise.all(
            urls.map(
                url =>
                    fetch(url).then(
                        (response) => response.json()
                    )
            ));
        return data
    } catch (error) {
        console.log(error)
        throw (error)
    }
}