import React, { useState, useEffect } from 'react';
import { getCashFlowStatement } from '../Service/StockService';
import Loader from './Loader';

import '../styles/components/CashFlowStatement.css';

const CashFlowStatement = (props) => {
    const ticker = props.ticker;
    const state = props.state;
    const array = [0, 1, 2, 3, 4]

    const notShowed = ['date', 'ebitdaratio', 'operatingIncomeRatio', 'incomeBeforeTaxRatio', 'netIncomeRatio', 'symbol', 'reportedCurrency', 'fillingDate', 'acceptedDate', 'period', 'grossProfitRatio', 'link', 'finalLink'];
    const decimalKeys = []
    // MAPEAR POR FILAS!!!!!

    const [data, setData] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(
        () => {
            getCashFlowStatement(ticker, array.length)
            .then(response=>{
                setData(response.data)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false);
                setError(true)
            })
        },

        []
    )

    console.log(data)

    if (loading === true && data === undefined) {
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
            <div className="CashFlowStatement">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            {array.map((year) => {
                                return(
                                    <th>{data[year].date}</th>
                                )
                            })}
                        </tr>
                    </thead>
                        {
                        Object.keys(data[0]).map((key, value) => {
                            if (notShowed.includes(key) === false) {
                                return(
                                    <tr className="Line">
                                        <th className="key">{key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
          return str.toUpperCase();
        })}</th>
                                        {array.map((year) => {
                                            if (decimalKeys.includes(key)) {
                                                return(
                                                    <td>{data[year][key].toFixed(2)}</td>
                                                )
                                            } else {
                                                return(
                                                    <td>{data[year][key] / 1000000}</td>
                                                )
                                            }
                                        })}
                                    </tr>
                                )
                            }
                        })}

                    <tbody>
                    </tbody>
                </table>
            </div>
        )
    }

};

export default CashFlowStatement;