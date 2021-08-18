import React, { useEffect, useState } from 'react';

import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { getProfile } from '../Service/StockService';
import TradeModal from '../components/TradeModal';
import { Button } from 'react-bootstrap';

import '../styles/pages/StockDetail.css';

const StockDetail = (props) => {
    const ticker = props.match.params.ticker;
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showReport, setShowReport] = useState(false);

    useEffect(
        () => {
            getProfile(ticker)
            .then(response=>{
                console.log(response.data[0]);
                setData(response.data[0]);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.log("ESTE ERROR"+error)
                setError(true)
            })
        },

        []
    )

    if (loading || !data) {
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
                    <div className="StockDetail_child subIndex">
                        <div className="index_logo">
                            <h1 className="bigger">{data.companyName}</h1>
                            <img src={data.image} alt="" />
                        </div>
                        <div className="index_price">
                            <h1 className="bigger">{data.price}</h1>
                            {
                                data.changes > 0
                                ? <h1 className="Higher">+{data.changes.toFixed(2)} %</h1>
                                : <h1 className="Lower">{data.changes.toFixed(2)} %</h1>
                            }
                        </div>
                    </div>
                    <div className="StockDetail_child button">
                        <Button variant="primary" size="lg" onClick={() => setShowReport(true)}>TRADE</Button>
                    </div>
                </div>
                <Navbar ticker={ticker}/>
                <TradeModal
                    ticker={ticker}
                    show={showReport}
                    setShow={setShowReport}
                    title="Trade Panel"
                    acceptPath="/"
                    price={data.price}
                />
            </div>
        );
    }

};

export default StockDetail;