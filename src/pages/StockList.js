import React, { useState, useEffect } from 'react';
import { getSymbols } from '../Service/StockService';

import '../styles/pages/StockList.css';

import Stock from '../components/Stock';

const StockList = () => {
    const [stocks, setStocks] = useState(['AAPL'])
    const [loading, setLoading] = useState(true)
    //const stocks = ['AAPL', 'INTC', 'BIIB', 'VZ', 'KO', 'GOOG']

    useEffect(
        () => {
            getSymbols()
            .then(response => {
                console.log(response)
                setStocks(response.data)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
        }
    )

    if (loading && !stocks) {
        return(
            <h1>Loading...</h1>
        )
    } else {

        return(
            <div className="StockList">
                <table className="StockList_table">
                    <thead>
                        <tr>
                            <th>LOGO</th>
                            <th>TICKER</th>
                            <th>PRICE</th>
                            <th>VAR %</th>
                            <th>INTRINSIC VALUE</th>
                            <th>DETALLE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((item) => {
                            return(
                                <Stock stock={item}/>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }


};

export default StockList;