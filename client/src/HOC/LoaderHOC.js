import React, {component} from 'react';
import './loader.css';

const LoaderHOC = (WrappedComponent)=>{
    return class LoaderHOC extends component{
        render(){
            return this.props.floor.length < 0 /* tables array */ ? <div className='loader'></div> : <WrappedComponent {...this.props}/>
        }
    }
}
export default LoaderHOC;