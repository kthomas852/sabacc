import React from 'react';
import API from '../utils/API';

export default function Table(){
    
    function launchTable(){
        API.newPlayer("tuns@yahoo.com").then(res => {
        window.location.replace("/play")
        }).catch(err => console.log(err))
    }

    return(
        <div>
            <p style={style.averageText}>Average</p>
            <button onClick={launchTable} className="valign-wrapper" style={style.circle}>
                <p style={style.numText} >5</p>
            </button>
        </div>
    )
}

const style = {
    circle: {
        borderRadius: '50%',
        height: '50px',
        width: '50px',
        backgroundColor: 'green',
        textAlgin: 'center'
    },
    numText: {
        color: 'white',
        fontWeight: 'bold',
        textAlgin: 'center',
        textShadow: '1px 1px red'
    },
    averageText: {
        textAlgin: 'center',
        color: 'blue'
    }
}