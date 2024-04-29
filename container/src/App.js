import React,{ lazy , Suspense, useState, useEffect } from 'react';
import { Router, Route , Switch, Redirect } from 'react-router-dom';
import { StylesProvider , createGenerateClassName} from '@material-ui/core/styles'
import { createBrowserHistory } from 'history'
import Header from './components/Header';
import Progress from './components/Progress';


// Lazy loading our components to perform lazy loading
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

// When starting building the application for production rather than generate classes like jss1 or jss2, generate classes with 'ma'
const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
  });


// Create history object
const history = createBrowserHistory()

export default () => {

    const [isSignedIn , setIsSignIn] = useState(false);

    useEffect(() => {
        if(isSignedIn) {
            history.push('/dashboard');
        }
    },[isSignedIn])

    return (
        <Router history = {history}>
        <StylesProvider generateClassName={generateClassName}>
            <div>
                <Header onSignOut={() => setIsSignIn(false)} isSignedIn={isSignedIn}/>
                <Suspense fallback={<Progress/>}>
                    <Switch>
                        <Route path="/auth">
                            <AuthLazy onSignIn={() => setIsSignIn(true)} />
                        </Route>
                        <Route path="/dashboard">
                            {!isSignedIn && <Redirect to="/"/>}
                            <DashboardLazy/>
                        </Route>
                        <Route path="/" component={MarketingLazy} />
                    </Switch>
                </Suspense>
            </div>
        </StylesProvider>
        </Router>
        
    )
}