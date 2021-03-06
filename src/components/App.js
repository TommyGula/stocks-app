import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import StockList from '../pages/StockList';
import StockDetail from '../pages/StockDetail';
import Header from '../components/Header';
import Container from '../components/Container';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import GlobalState from '../Context/GlobalState';

function App () {
    return(
        <GlobalState>
            <BrowserRouter>
                <Header/>
                <Container>
                    <Route path='/' exact component={StockList}/>
                    <Route path='/stock/:ticker' exact component={StockDetail}/>
                    <Route path='/signin' exact component={SignIn}/>
                    <Route path='/signup' exact component={SignUp}/>
                </Container>
            </BrowserRouter>
        </GlobalState>
    )
};

export default App;