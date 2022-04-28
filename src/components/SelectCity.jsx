const SelectCity = (props) => {

    const { clickChange } = props;

    return (
        <div>
            <input id = 'city-input' type='text' placeholder='Enter A City'></input>
            <button id='city-btn' onClick={clickChange}>Enter</button>
        </div>
    )
}

export default SelectCity;