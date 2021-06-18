import React, { Children } from 'react';

import '../styles/components/Container.css';

const Container = (props) => {
    return(
        <div className="Container">
            {props.children}
        </div>
    )
};

export default Container;