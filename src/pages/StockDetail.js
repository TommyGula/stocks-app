import React, { useEffect, useState } from 'react';

import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { getProfile } from '../Service/StockService';

import '../styles/pages/StockDetail.css';

const StockDetail = (props) => {
    const [ticker, setTicker] = useState(props.match.params.ticker);
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(
        () => {
            getProfile(ticker)
            .then(response=>{
                setData(response.data[0]);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setError(true)
            })
        },

        []
    )

    if (loading && !data) {
        return(
            <Loader/>
        )
    }

    if (error) {
        return(
            <div className="Error">Error!</div>
        )
    } else {
        return(
            <div className="StockDetail">
                <div className="StockDetail_child index">
                    <div className="index_logo">
                        <h1 className="bigger">{data.companyName}</h1>
                        <img src={data.image} alt="" />
                    </div>
                    <div className="index_price">
                        <h1 className="bigger">{data.price}</h1>
                        {
                            data.changes > 0
                            ? <h1 className="Higher">+{data.changes} %</h1>
                            : <h1 className="Lower">{data.changes} %</h1>
                        }
                    </div>
                </div>
                <Navbar ticker={ticker}/>
            </div>
        );
    }

};

export default StockDetail;