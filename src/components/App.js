import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import StockList from '../pages/StockList';
import StockDetail from '../pages/StockDetail';

function App () {
    return(
        <BrowserRouter>
            <Route path='/' exact component={StockList}/>
            <Route path='/stock/:ticker' exact component={StockDetail}/>
        </BrowserRouter>
    )
};

export default App;