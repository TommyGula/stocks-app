import React, { useEffect, useState } from 'react';

import Loader from '../components/Loader';
import Profile from '../components/Profile';
import IncomeStatement from '../components/IncomeStatement';
import BalanceSheet from '../components/BalanceSheet';
import CashFlowStatement from '../components/CashFlowStatement';
import Arrow from '../static/Arrow.svg';
import { getProfile } from '../Service/StockService';

import '../styles/pages/StockDetail.css';

const StockDetail = (props) => {
    const ticker = props.match.params.ticker
    const [data, setData] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    //const KEY = '66780bf1fc356234f0a38742f8313206';
    const KEY = 'demo';

    useEffect(
        () => {
            getProfile(ticker, KEY)
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

    const [state, setState] = useState({
        first:'open',
        second:'open',
        third:'open',
        forth:'open',
    });

    const openClose = (order) => {
        if (state[order] === 'close') {
            setState({...state,
                [order]: 'open'
            })
            console.log(state[order])
        } else {
            setState({...state,
                [order]: 'close'
            })
            console.log(state[order])
        }
    }

    if (loading && data === undefined) {
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
                <div className="StockDetail_child Section">
                    <div className="Section_header">
                        <h1>Company Profile</h1>
                        <button className="no-button" onClick={() => openClose('first')}>
                            {
                                state.first === 'open'
                                ? <img className="opened" src={Arrow} alt="" />
                                : <img className="closed" src={Arrow} alt="" />
                            }
                        </button>
                    </div>
                    <Profile data={data} state={state.first}/>
                </div>
                <div className="StockDetail_child Section">
                    <div className="Section_header">
                        <h1>Income Statement</h1>
                        <button className="no-button" onClick={() => openClose('second')}>
                            {
                                state.second === 'open'
                                ? <img className="opened" src={Arrow} alt="" />
                                : <img className="closed" src={Arrow} alt="" />
                            }
                        </button>
                    </div>
                    <IncomeStatement state={state.second} ticker={ticker}/>
                </div>
                <div className="StockDetail_child Section">
                    <div className="Section_header">
                        <h1>Balance Sheet</h1>
                        <button className="no-button" onClick={() => openClose('third')}>
                            {
                                state.third === 'open'
                                ? <img className="opened" src={Arrow} alt="" />
                                : <img className="closed" src={Arrow} alt="" />
                            }
                        </button>
                    </div>
                    <BalanceSheet state={state.third} ticker={ticker}/>
                </div>
                <div className="StockDetail_child Section">
                    <div className="Section_header">
                        <h1>Cash Flow Statement</h1>
                        <button className="no-button" onClick={() => openClose('forth')}>
                            {
                                state.forth === 'open'
                                ? <img className="opened" src={Arrow} alt="" />
                                : <img className="closed" src={Arrow} alt="" />
                            }
                        </button>
                    </div>
                    <CashFlowStatement state={state.forth} ticker={ticker}/>
                </div>
            </div>
        );
    }

};

export default StockDetail;