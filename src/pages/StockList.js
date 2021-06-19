import React from 'react';

import '../styles/pages/StockList.css';

import Stock from '../components/Stock';

const StockList = () => {
    //const stocks = ['AAPL']
    const stocks = ['AAPL', 'INTC', 'BIIB', 'VZ', 'KO', 'GOOG']
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

};

export default StockList;