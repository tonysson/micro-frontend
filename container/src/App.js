import React,{ lazy , Suspense, useState } from 'react';
import { BrowserRouter, Route , Switch } from 'react-router-dom';
import { StylesProvider , createGenerateClassName} from '@material-ui/core/styles'
import Header from './components/Header';
import Progress from './components/Progress';


// Lazy loading our components to perform lazy loading
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

// When starting building the application for production rather than generate classes like jss1 or jss2, generate classes with 'ma'
const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
  });

export default () => {
    const [isSignedIn , setIsSignIn] = useState(false);
    return (
        <BrowserRouter>
        <StylesProvider generateClassName={generateClassName}>
            <div>
                <Header onSignOut={() => setIsSignIn(false)} isSignedIn={isSignedIn}/>
                <Suspense fallback={<Progress/>}>
                    <Switch>
                        <Route path="/auth">
                            <AuthLazy onSignIn={() => setIsSignIn(true)} />
                        </Route>
                        <Route path="/" component={MarketingLazy} />
                    </Switch>
                </Suspense>
            </div>
        </StylesProvider>
        </BrowserRouter>
        
    )
}