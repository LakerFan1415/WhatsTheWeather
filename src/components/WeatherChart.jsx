import Chart from 'chart.js/auto';
import { useEffect } from 'react';


const WeatherChart = ({chartNumber, chartInfo, city }) => {

  //ChartData2 & 3 used for daily temp
  var labels = [];
  var chartData = [];
  var chartData2 = [];
  var chartData3 = [];
  //var data;
  var chartDataset = [];

  /*
    new Date((chartInfo.hourly.dt) * 1000) --> Converts unix standard to readable date and time
  */

    /*
      Implement 2-Day and 7-Day Forecase
      Will work on how to handle current later
    */

  //Converts Dates of hourly information
  const getDatesAndTimes = (d, num) => {
    
    console.log(d)
      labels = [];
      chartData = [];
      chartData2 = [];
      chartData3 = [];
    try {  
      if (num === 1){
        // Gets dates for hourly
        //Hourly is the 2 Day Forecast
        for (let i=0; i < d.hourly.length; i++){
          let date = new Date((d.hourly[i].dt) * 1000).toLocaleString();
          /* No Longer need added to one structure
          dates.push(date);
          */

          labels.push(date)
          chartData.push(d.hourly[i].temp)

        }
        chartDataset.push({
          label: 'Temperature',
          backgroundColor: '#219cd7',
          borderColor: '#219cd7',
          data: chartData,
        })

      } else if (num === 2){
        //Get dates & times for daily
        //Displays 8 Days
        for (let i=0; i < d.daily.length; i++){
          let date = new Date((d.daily[i].dt) * 1000).toDateString();

          //Need to incorporate each 3 temps for one date
          //morn - day - night
          labels.push(date)
          chartData.push(d.daily[i].temp.morn)
          chartData2.push(d.daily[i].temp.day)
          chartData3.push(d.daily[i].temp.night)
        }
        // --> Length is 48 so 2 Days
        //Sets each line for the line chart
        // Blue --> #00d4ff
        // Tan --> #fd8e2d
        // Night --> #070a0a
        chartDataset.push({
          label: 'Morning',
          backgroundColor: '#219cd7',
          borderColor: '#219cd7',
          data: chartData,
        })
        chartDataset.push({
          label: 'Day',
          backgroundColor: '#e0ad81',
          borderColor: '#e0ad81',
          data: chartData2,
          })
        chartDataset.push({
          label: 'Night',
          backgroundColor: '#070a0a',
          borderColor: '#070a0a',
          data: chartData3,
        })

      } else {
          for (let i=0; i < 24; i ++){
            let date = new Date((d.hourly[i].dt) * 1000).toLocaleString();

            labels.push(date)
            chartData.push(d.hourly[i].temp)
          }
          chartDataset.push({
            label: 'Temperature',
            backgroundColor: '#219cd7',
            borderColor: '#219cd7',
            data: chartData,
          })
          console.log(labels)
        
      }

    }catch(e){

        console.log(e)
      }

      console.log(chartDataset)
  }

  getDatesAndTimes(chartInfo, chartNumber)


  var data = {
    labels: labels,
    datasets: chartDataset,
  }

  const config = {
      type: 'line',
      data,
      options: {
        plugins: {
          title: {
            display: true,
            text: city //Format the city name & size
          }
        }
      }
      
    //Add setup for multi-line chart
  }

    //Make Each Chart for each number
    // 0 --> Current
    // 1 --> 2-Day Forecast
    // 2 --> 7-Day Forecast

    /*if(chartInfo.daily){
      chartInfo.daily.forEach(e => {
        console.log(e.temp)
      })
    }
    */
    
    // Takes chartInfo --> Sets Labels
    // Work on this
    


      useEffect(() => {
        let chartParent = document.getElementById('charts');
        if (chartParent.childNodes[0]) {chartParent.removeChild(document.getElementById('aChart'))};
        if(chartNumber != null){
          let el = document.createElement('canvas');
          el.id = 'aChart';
          chartParent.appendChild(el);
          //Background Color of the canvas
          document.getElementById('aChart').style.backgroundColor = '#c5d8ef';
          let chart = new Chart(
            document.getElementById('aChart'),
            config
          )
        }
      })

    return(
        <div id='charts'>
            
        </div>
    )
}

export default WeatherChart;