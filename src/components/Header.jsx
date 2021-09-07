const Header = ({setChartNumber, chartNumber}) =>{

    /* Adds and removes the selected class */
    const handleClick = (e) => {
        let numbers = {'Current': 0, '2-Day Forecast':1, '7-Day Forecast':2}

        let listEl = document.getElementsByTagName('li');
        for (let i=0; i < listEl.length; i++){
            if (listEl[i].className){
                listEl[i].classList.remove(listEl[i].className);
            }
        }
        e.target.parentNode.classList.add('selected');
        //setChartNumber(numbers[e.target.childNodes[0]])
        setChartNumber(numbers[e.target.innerHTML])
    }

        //Focusing on the chart when clicked
    return(
        <div className={'header'}>
            <h1>The Weather Application</h1>
            <ul>
                <li onClick={handleClick} className='selected'><a>Current</a></li>
                <li onClick={handleClick}><a>2-Day Forecast</a></li>
                <li onClick={handleClick}><a>7-Day Forecast</a></li>
            </ul>
        </div>
    )
}

export default Header;