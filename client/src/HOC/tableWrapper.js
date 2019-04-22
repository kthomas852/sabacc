import React from 'react';
//I have no idea what's going on
export default function TableWrapper(T, props){
    return(
        props.map(function(tb){
            console.log("tb" + JSON.stringify(tb))
            return <T id={"3"} players={"2"}/>
        })
    )
}