import React , { useRef , useEffect } from 'react';
import  { mount } from 'marketing/MarketingApp';

export default () => {
    const ref = useRef()

    // When my app load
    useEffect(() => {
        mount(ref.current);
    })

    return <div ref={ref}/>
}