import React, {useEffect, useState} from 'react';
import API from '../utils/API';

export default function Table(props){
    let [players, setPlayers] = useState(props.players)
    let [store, setStore] = useState({
        loggedInPlayer: '',
        tableNumber: ''
    })
    useEffect(()=>{
        const raw = JSON.parse(localStorage.getItem('data'))
        console.log(props.id)
        console.log(raw.loggedInPlayer)
        setStore({loggedInPlayer: raw.loggedInPlayer, tableNumber: props.id})
        console.log("player: " + JSON.stringify(store))
    }, [])

    function launchTable(){
        console.log("Props: " + props.id)
        localStorage.setItem('data', JSON.stringify(store));
        API.newPlayer(props.id, {player: store.loggedInPlayer}).then(res => {
            // console.log("Table id: " + res.data)
        }).catch(err => console.log("launch Table error"))
        window.location.replace("/play")
    }

    return(
        <div>
            <p style={style.averageText}>Average</p>
            <button onClick={launchTable} className="valign-wrapper" style={style.circle}>
                <p style={style.numText} >{players}</p>
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