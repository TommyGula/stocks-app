import instance from "../Config/Axios";

const KEY = '66780bf1fc356234f0a38742f8313206';
//const KEY = 'demo';

export function getProfile(ticker) {
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