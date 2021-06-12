import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import StockList from '../pages/StockList';

function App () {
    return(
        <BrowserRouter>
            <Route path='/' exact component={StockList}/>
        </BrowserRouter>
    )
};

export default App;