import React , { useRef , useEffect } from 'react';
import  { mount } from 'auth/AuthApp';
import { useHistory }  from 'react-router-dom';

export default ({onSignIn}) => {
    const ref = useRef()
    // A copy of browser history
    const history = useHistory()
    // pathname renamed to nextPathname is the path our marketing app is trying to navigate to. it comes from the location object
    // When my app load
    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            onNavigate: ({pathname : nextPathname}) => {
                const { pathname } = history.location;
                if(pathname !== nextPathname){
                    // Navigate to nextPathname
                    history.push(nextPathname);
                }
            },
            initialPath : history.location.pathname,
            onSignIn,
        });
        history.listen(onParentNavigate)
    },[])

    return <div ref={ref}/>;
};