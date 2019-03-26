import React, {useState, useEffect} from 'react';
import {Table} from 'react-materialize';
import API from '../utils/API';

export default function Top5(){
    const [top, setTop] = useState([
        {
            name: "",
            score: ""
        },
        {
            name: "",
            score: ""
        },
        {
            name: "",
            score: ""
        },
        {
            name: "",
            score: ""
        },
        {
            name: "",
            score: ""
        }
    ])

    function fecthTop(){
        API.getTop().then((response) =>{
            setTop(response.data);
        })
    }

    useEffect(()=>{
            fecthTop();
    }, [])
    return(
        <Table style={style.text}>
            <thead>
                <p style={{textAlign: 'center', fontWeight: 'bold'}}>Leader Board</p>
                <tr>
                <th data-field="id">Name</th>
                <th data-field="price">Score</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                <td>{top[0].name}</td>
                <td>{top[0].score}</td>
                </tr>
                <tr>
                <td>{top[1].name}</td>
                <td>{top[1].score}</td>
                </tr>
                <tr>
                <td>{top[2].name}</td>
                <td>{top[2].score}</td>
                </tr>
                <tr>
                <td>{top[3].name}</td>
                <td>{top[3].score}</td>
                </tr>
                <tr>
                <td>{top[4].name}</td>
                <td>{top[4].score}</td>
                </tr>
            </tbody>
        </Table>
    )
}

const style = {
    text:{
        color: 'white',
        textShadow: '1px 1px grey'
    }
}