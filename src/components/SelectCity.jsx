import {React, useEffect} from 'react';

const SelectCity = (props) => {

    const { clickChange } = props;

    useEffect(() => {
        document.getElementById('city-input').addEventListener('keypress', (e) => {
            if(e.key === 'Enter'){
                clickChange();
            }
        } );
    })

    return (
        <div style={{backgroundColor: '#c5d8ef'}}>
            <input id = 'city-input' type='text' placeholder='Enter A City'></input>
            <button onClick={clickChange}>Enter</button>
        </div>
    )
}

export default SelectCity;