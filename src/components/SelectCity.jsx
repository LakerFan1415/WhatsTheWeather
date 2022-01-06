import {React, useEffect} from 'react';

const SelectCity = (props) => {

    const { clickChange } = props;

    return (
        <div style={{backgroundColor: '#c5d8ef'}}>
            <input id = 'city-input' type='text' placeholder='Enter A City'></input>
            <button id='city-btn' onClick={clickChange}>Enter</button>
        </div>
    )
}

export default SelectCity;