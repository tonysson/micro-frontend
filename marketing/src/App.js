import React from 'react'
import { Switch,Route, BrowserRouter } from 'react-router-dom'
import { StylesProvider , createGenerateClassName} from '@material-ui/core/styles'
import Landing from './components/Landing';
import Pricing from './components/Pricing';

// When starting building the application for production rather than generate classes like jss1 or jss2, generate classes with 'ma'
const generateClassName = createGenerateClassName({
  productionPrefix: 'ma'
});

export default ()  => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/pricing' component={Pricing} />
                <Route path='/' component={Landing} />
            </Switch>
        </BrowserRouter>
      </StylesProvider>
    </div>
  )
}
