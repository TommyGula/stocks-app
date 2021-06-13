import React from 'react';

import '../styles/pages/StockList.css';

import Stock from '../components/Stock';

const StockList = () => {
    const stocks = ['AAPL']
    //const stocks = ['AAPL', 'INTC', 'BIIB', 'VZ', 'KO', 'AMZN']
    return(
        <div className="StockList">
            <table className="StockList_table">
                <thead>
                    <tr>
                        <th>TICKER</th>
                        <th>REVENUE</th>
                        <th>GROSS PROFIT</th>
                        <th>OPERATING INCOME</th>
                        <th>NET INCOME</th>
                        <th>EPS</th>
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