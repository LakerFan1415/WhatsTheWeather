const SelectCity = (props) => {

    const { handleClick } = props;

    return (
        <div>
            <input id = 'city-input' type='text' placeholder='Enter A City'></input>
            <button id='city-btn' onClick={handleClick}>Enter</button>
        </div>
    )
}

export default SelectCity;