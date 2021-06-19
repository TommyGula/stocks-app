import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/components/Stock.css';

import Loader from '../components/Loader';

const Stock = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState(undefined);

    const stock = props.stock;
    const yearBack = 0;
    const BPE = 15;
    const KEY = '66780bf1fc356234f0a38742f8313206';
    //const KEY = 'demo'

    const api1 = `https://financialmodelingprep.com/api/v3/profile/${stock}?apikey=${KEY}`;
    const api2 = `https://financialmodelingprep.com/api/v3/income-statement/${stock}?limit=120&apikey=${KEY}`
    const urls = [api1, api2]

    useEffect(
        () => {
            const data = getAllUrls(urls);
            data.then(data => {
                setData(data)
                setLoading(false)
                console.log(data)
            }).catch(err => {
                setLoading(false)
                setError(true)
            })
        },

        []
    )

    async function getAllUrls(urls) {
        try {
            var data = await Promise.all(
                urls.map(
                    url =>
                        fetch(url).then(
                            (response) => response.json()
                        )
                        ));
/*             console.log(data) */
            return data
    
        } catch (error) {
            console.log(error)
    
            throw (error)
        }
    }

    if (loading && !data) {
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
                <td><img src={data[0][yearBack].image} alt="" /></td>
                <td className="Stock_name">{stock}</td>
                <td>$ {data[0][yearBack].price}</td>
                {
                    data[0][yearBack].changes > 0
                        ? <td className="Higher">{data[0][yearBack].changes} %</td>
                        : <td className="Lower">{data[0][yearBack].changes} %</td>
                }
                    {
                        ((data[1][yearBack].eps * (BPE + 2 * ((data[1][yearBack].netIncome / data[1][yearBack + 4].netIncome) ** (1 / 5))) * 4.4) / 2.96).toFixed(2) > data[0][yearBack].price
                            ? <td className="Higher">
                                $ {((data[1][yearBack].eps * (BPE + 2 * ((data[1][yearBack].netIncome / data[1][yearBack + 4].netIncome) ** (1 / 5))) * 4.4) / 2.96).toFixed(2)}
                            </td>
                            : <td className="Lower">
                                $ {((data[1][yearBack].eps * (BPE + 2 * ((data[1][yearBack].netIncome / data[1][yearBack + 4].netIncome) ** (1 / 5))) * 4.4) / 2.96).toFixed(2)}
                            </td>
                    }
                <td>
                    <button className="button-1">
                        <Link to={"/stock/" + stock}>VER DETALLE 
                        </Link>
                    </button>
                </td>
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