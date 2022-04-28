const Header = ({setChartNumber, chartNumber, handleClick}) =>{

        //Focusing on the chart when clicked
    return(
        <div id = 'header'>
            <h1>Weather Forecast</h1>
            <ul>
                <li onClick={handleClick} ><a href=".main-container">Current</a></li>
                <li onClick={handleClick} ><a href=".main-container">2-Day Forecast</a></li>
                <li onClick={handleClick} ><a href=".main-container">7-Day Forecast</a></li>
            </ul>
        </div>
    )
}

export default Header;