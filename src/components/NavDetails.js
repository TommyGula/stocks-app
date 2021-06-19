import React, { useEffect, useState } from 'react';

import Profile from '../components/Profile';
import IncomeStatement from '../components/IncomeStatement';
import BalanceSheet from '../components/BalanceSheet';
import CashFlowStatement from '../components/CashFlowStatement';

import '../styles/components/NavDetails.css';

const NavDetails = (props) => {
    const state = props.state
    const ticker = props.ticker;

    if (state === 'profile') {
        return(
            <Profile ticker={ticker}/>
        )
    }
    if (state === 'income') {
        return(
            <IncomeStatement ticker={ticker}/>
        )
    }
    if (state === 'balance') {
        return(
            <BalanceSheet ticker={ticker}/>
        )
    }
    if (state === 'cashflow') {
        return(
            <CashFlowStatement ticker={ticker}/>
        )
    }
};

export default NavDetails;