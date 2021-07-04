import React, { useEffect, useState } from 'react';

import NavDetails from '../components/NavDetails';

import '../styles/components/Navbar.css'

const Navbar = (props) => {
    const ticker = props.ticker;

    const [state, setState] = useState('profile')

    function changeTab(index) {
        setState(index)
    }

    return(
        <div className="Navbar">
            <ul className="Navbar_items">
                {
                    state === 'profile'        
                    ? <li className="option" onClick={() => changeTab('profile')}><h3>Profile</h3></li>
                    : <li className="option2" onClick={() => changeTab('profile')}><h3>Profile</h3></li>
                }
                {
                    state === 'income'        
                    ? <li className="option" onClick={() => changeTab('income')}><h3>Income Statement</h3></li>
                    : <li className="option2" onClick={() => changeTab('income')}><h3>Income Statement</h3></li>
                }
                {
                    state === 'balance'        
                    ? <li className="option" onClick={() => changeTab('balance')}><h3>Balance Sheet</h3></li>
                    : <li className="option2" onClick={() => changeTab('balance')}><h3>Balance Sheet</h3></li>
                }
                {
                    state === 'cashflow'        
                    ? <li className="option" onClick={() => changeTab('cashflow')}><h3>Cash Flow Statement</h3></li>
                    : <li className="option2" onClick={() => changeTab('cashflow')}><h3>Cash Flow Statement</h3></li>
                }

            </ul>
            <NavDetails ticker={ticker} state={state}/>
        </div>
    )
};

export default Navbar;