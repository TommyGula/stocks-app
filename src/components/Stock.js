import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/components/Stock.css';

import Loader from '../components/Loader';

const Stock = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState(undefined);
    //const [data2, setData2] = useState(undefined);

    const stock = props.stock;
    const yearBack = 0;
    const BPE = 15;
    const KEY = '66780bf1fc356234f0a38742f8313206'

    useEffect(
        () => {
            fetch(`https://financialmodelingprep.com/api/v3/income-statement/${stock}?limit=5&apikey=demo`)
                .then(res => res.json())
                .then(stockData => {
                    setData(stockData);
                    setLoading(false)
                    console.log(stockData)
                })
/*                 .then(
                    fetch(`https://financialmodelingprep.com/api/v3/quote/${stock}?apikey=demo`)
                        .then(res => res.json())
                        .then(stockData2 => {
                            setLoading(false)
                            setData2(stockData2);
                        })
                        .catch(err => {
                            setLoading(false)
                            setError(true)
                            return err
                        })
                ) */
                .catch(err => {
                    setLoading(false)
                    setError(true)
                })
        },
        []
    )

    if (loading || !data) {
        return(
            <Loader/>
        )
    };

    if (error) {
        console.log(error)
        return(
            <div className="Error">Error!</div>
        )
    } else {
        return (

            <tr className="Stock">
                <td className="Stock_name">{stock}</td>
                {/* <td>$ {data2[0].price}</td> */}
                <td>$ {data[yearBack].revenue}</td>
                <td>$ {data[yearBack].grossProfit}</td>
                <td>$ {data[yearBack].operatingIncome}</td>
                <td>$ {data[yearBack].netIncome}</td>
                <td>$ {data[yearBack].eps}</td>
                <td>$ {
                        (data[yearBack].eps * (BPE + 2 * ((data[yearBack].netIncome / data[yearBack + 4].netIncome) ** (1 / 5))) * 4.4) / 2.96
                    }
                </td>
                <Link to={"/stock/" + stock}>
                    <td>Ver detalle</td>
                </Link>
            </tr>
        )
    }

}
/* 
<td>$ {char.revenue}</td>
<td>$ {char.grossProfit}</td>
<td>$ {char.operatingIncome}</td>
<td>$ {char.netIncome}</td>
<td>$ {char.eps}</td> */

export default Stock