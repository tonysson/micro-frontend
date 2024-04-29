import React from 'react'
import { Switch,Route, Router } from 'react-router-dom'
import { StylesProvider , createGenerateClassName} from '@material-ui/core/styles'
import SignIn from './components/Signin';
import SignUp from './components/Signup';

// Router => create memory history router and BrowserRouter creates Browser history
// When starting building the application for production rather than generate classes like jss1 or jss2, generate classes with 'ma'
const generateClassName = createGenerateClassName({
  productionPrefix: 'au'
});

export default ({history, onSignIn})  => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
            <Switch>
              <Route path='/auth/signin'>
                <SignIn onSignIn={onSignIn}/>
              </Route>
              <Route path='/auth/signup'>
                <SignUp onSignIn={onSignIn} />
              </Route>
            </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}
