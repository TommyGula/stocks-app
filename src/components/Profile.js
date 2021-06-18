import React from 'react'

const Profile = (props) => {
    const data = props.data;
    const state = props.state;

    if (state === 'close') {
        return(
            <div className="Profile"></div>
        )
    } else {
        return(
            <div className="Profile">
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