import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue'



// Mount function to start up the app

const mount = (el) => {
   const app = createApp(Dashboard);
   // Tell vue to mount a component in the DOM, mount function is related to vue js
   app.mount(el);
}


// If we are in development mode and isolation, call the mount function immediately
// defaultHistory option makes us use createBrowserHistory in isolation mode when developing the marketing app

if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_dashboard-dev-root');
    if(devRoot){
        mount(devRoot);
    }
}



// we are running through the container and we should export the mount function
export { mount }
