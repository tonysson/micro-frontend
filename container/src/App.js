import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MarketingApp from './components/MarketingApp';
import { StylesProvider , createGenerateClassName} from '@material-ui/core/styles'
import Header from './components/Header';

// When starting building the application for production rather than generate classes like jss1 or jss2, generate classes with 'ma'
const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
  });

export default () => {
    return (
        <StylesProvider generateClassName={generateClassName}>
            <BrowserRouter>
            <div>
                <Header/>
                <MarketingApp/>
            </div>
        </BrowserRouter>
        </StylesProvider>
        
    )
}