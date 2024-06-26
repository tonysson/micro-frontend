import React from 'react'
import { Switch,Route, Router } from 'react-router-dom'
import { StylesProvider , createGenerateClassName} from '@material-ui/core/styles'
import Landing from './components/Landing';
import Pricing from './components/Pricing';

// Router => create memory history router and BrowserRouter creates Browser history
// When starting building the application for production rather than generate classes like jss1 or jss2, generate classes with 'ma'
const generateClassName = createGenerateClassName({
  productionPrefix: 'ma'
});

export default ({history})  => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
            <Switch>
                <Route exact path='/pricing' component={Pricing} />
                <Route path='/' component={Landing} />
            </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}
