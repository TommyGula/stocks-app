import React, { useEffect, useState } from 'react';

import NavDetails from '../components/NavDetails';

const Navbar = (props) => {
    const ticker = props.ticker;

    const [state, setState] = useState('profile')

    function changeTab(index) {
        console.log('Hola')
        setState(index)
    }

    return(
        <div className="Navbar">
            <ul className="Navbar_items">
                <li onClick={() => changeTab('profile')}>Profile</li>
                <li onClick={() => changeTab('income')}>Income Statement</li>
                <li onClick={() => changeTab('balance')}>Balance Sheet</li>
                <li onClick={() => changeTab('cashflow')}>Cash Flow Statement</li>
            </ul>
            <NavDetails ticker={ticker} state={state}/>
        </div>
    )
};

export default Navbar;