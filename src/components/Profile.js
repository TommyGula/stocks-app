import React, { useEffect, useState } from 'react';

import Loader from '../components/Loader';
import { getProfile } from '../Service/StockService';

const Profile = (props) => {
    const ticker = props.ticker;

    const [data, setData] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(
        () => {
            getProfile(ticker)
            .then(response=>{
                setData(response.data[0])
                setLoading(false)

            })
            .catch(error => {
                setLoading(false);
                setError(true)
            })
        },

        []
    )

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
            <div className="Profile">
                    <h1>Company Profile</h1>
                    <div className="info_container">
                        <div className="info_left">
                            <p>
                                {data.description}
                            </p>
                        </div>
                        <div className="info_right">
                            <p><strong>Industry: </strong>{data.industry} </p>
                            <p><strong>Sector: </strong>{data.sector} </p>
                            <p><strong>CEO: </strong>{data.ceo} </p>
                            <p><strong>Composite: </strong>{data.exchangeShortName} </p>
                            <p><strong>Country: </strong>{data.country} </p>
                        </div>
                    </div>
            </div>
        )
    }
};

export default Profile;