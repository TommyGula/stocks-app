import React, { useState, useEffect } from 'react';
import { getSymbols } from '../Service/StockService';

import '../styles/pages/StockList.css';

import Stock from '../components/Stock';

const StockList = () => {
    //const [stocks, setStocks] = useState(undefined)
    const [loading, setLoading] = useState(false)
    //const stocks = ['AAPL']
    
    const stocks = [
        {
            symbol:"AAPL"
        },
/*         {
            symbol:"SPY"
        },
        {
            symbol:"MSFT"
        },
        {
            symbol:"BIIB"
        }, */
    ]

/*     useEffect(
        () => {
            getSymbols()
            .then(response => {
                setStocks(response.data)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
        }
    ) */

    if (loading || !stocks) {
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
{/*                             <th>INTRINSIC VALUE</th> */}
                            <th>DETALLE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((item) => {
                            return(
                                <Stock stock={item.symbol}/>
                                //<Stock stock={item}/>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }


};

export default StockList;