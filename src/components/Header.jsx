const Header = ({setChartNumber, chartNumber, handleMenuClick}) =>{

    return(
        <div id = 'header'>
            <h1>Weather Forecast</h1>
            <ul>
                <li onClick={handleMenuClick} ><a href="#">Current</a></li>
                <li onClick={handleMenuClick} ><a href="#">2-Day Forecast</a></li>
                <li onClick={handleMenuClick} ><a href="#">7-Day Forecast</a></li>
            </ul>
        </div>
    )
}

export default Header;