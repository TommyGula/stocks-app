import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProfile } from '../Service/StockService';

import '../styles/components/Stock.css';

import Logo from '../static/Logo.svg';
import Loader from '../components/Loader';
import Button from '@material-ui/core/Button';

const Stock = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState(undefined);


    const stock = props.stock;
    const yearBack = 0;
    const BPE = 8.5;

    useEffect(
        () => {
            const data = getProfile(stock)
            data.then(data => {
                setData(data.data)
                console.log("HOLAAA" + data.data)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
                setError(true)
            })
        },

        []
    )


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
                <td><img src={data[yearBack].image || Logo} alt="" /></td>
                <td className="Stock_name">{stock}</td>
                <td>$ {data[yearBack].price}</td>
                {
                    data[yearBack].changes > 0
                        ? <td className="Higher">{data[yearBack].changes} %</td>
                        : <td className="Lower">{data[yearBack].changes} %</td>
                }
{/*                     {
                        ((data[1][yearBack].eps * (BPE + 2 * ((data[1][yearBack].netIncome / data[1][yearBack + 4].netIncome) ** (1 / 5))) * 4.4) / 2.96).toFixed(2) > data[0][yearBack].price
                            ? <td className="Higher">
                                $ {((data[1][yearBack].eps * (BPE + 2 * ((data[1][yearBack].netIncome / data[1][yearBack + 4].netIncome) ** (1 / 5))) * 4.4) / 2.96).toFixed(2)}
                            </td>
                            : <td className="Lower">
                                $ {((data[1][yearBack].eps * (BPE + 2 * ((data[1][yearBack].netIncome / data[1][yearBack + 4].netIncome) ** (1 / 5))) * 4.4) / 2.96).toFixed(2)}
                            </td>
                    } */}
                <td>
                    <Button size="medium" variant="contained" color="primary" style={{padding:0}}>
                        <Link to={"/stock/" + stock}>VER DETALLE 
                        </Link>
                    </Button>
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