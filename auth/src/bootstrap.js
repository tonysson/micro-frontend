import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App';


// Mount function to start up the app

const mount = (el , { onNavigate, defaultHistory,initialPath , onSignIn }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath],
    })
    if(onNavigate) {
        history.listen(onNavigate);
    }
    ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el)

    return {
        onParentNavigate(location) {
            const {pathname : nextPathname} = location;
            const {pathname } = history.location;
            if(pathname !== nextPathname){
                history.push(nextPathname);
            }
            
        }
    }
}


// If we are in development mode and isolation, call the mount function immediately
// defaultHistory option makes us use createBrowserHistory in isolation mode when developing the marketing app

if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');
    if(devRoot){
        mount(devRoot, {defaultHistory: createBrowserHistory()});
    }
}



// we are running through the container and we should export the mount function
export { mount }
