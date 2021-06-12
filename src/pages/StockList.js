import React, { useEffect, useState } from 'react';

import '../styles/pages/StockList.css';

import Stock from '../components/Stock';

const StockList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [stock, setStock] = useState(undefined);
    const [intValue, setIntValue] = useState([]);

    useEffect(
        () => {
            fetch('https://financialmodelingprep.com/api/v3/income-statement/GOOG?limit=20&apikey=66780bf1fc356234f0a38742f8313206')
                .then(res => res.json())
                .then(data => {
                    setStock(data)
                    setLoading(false)
                })
                .catch(error => {
                    setLoading(false)
                    setError(true)
                    return error
                })
        },
        []
    );
    

    if (loading || !stock) {
        return(
            <div className="Loading">Loading</div>
        )
    }

    if (error) {
        return(
            <div className="Error">Error</div>
        )
    } else {
        return(
            <div className="StockList">
                {stock.map((item) => {
                    return(
                        <Stock values={item} />
                    )
                })}
            </div>
        )
    }

};

export default StockList;