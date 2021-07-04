import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import StockList from '../pages/StockList';
import StockDetail from '../pages/StockDetail';
import HeaderUI from '../components/HeaderUI';
import Header from '../components/Header';
import Container from '../components/Container';

function App () {
    return(
        <BrowserRouter>
            <HeaderUI/>
            <Container>
                <Route path='/' exact component={StockList}/>
                <Route path='/:ticker' exact component={StockDetail}/>
            </Container>
        </BrowserRouter>
    )
};

export default App;