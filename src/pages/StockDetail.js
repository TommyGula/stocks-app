import React from 'react';

const StockDetail = (props) => {
    const ticker = props.match.params.ticker
    return(
        <div className="Hola">
            {ticker}
        </div>
    );
};

export default StockDetail;