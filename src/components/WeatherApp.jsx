import { useEffect, useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import { FaWind } from "react-icons/fa";

const api = 'cdn3gzxeejnao9w3wewekxyny4nwjur52jgd1lxq';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [search, setSearch] = useState(null);

    

    const fetchWeatherData = async ()=>{
        try {
            const response = await fetch(`https://www.meteosource.com/api/v1/free/point?sections=current%2Chourly&language=en&units=auto&key=${api}&place_id=${city}`);
            if(response.status !== 200){
                throw new Error('Failed to fetch weather Data!');
            }

            const data = await response.json();
            console.log(data);
            setWeatherData(data);
            setSearch(true);
        } catch (error) {
            console.log(error);
            setSearch(null);
            alert('Failed to fetch weather Data!');
        }
        
    }

    
    useEffect(()=>{
        if(city && search){
            fetchWeatherData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city, search])

  return (
    <>
        <div className="searchBar">
            <input 
                type="text" 
                name="search" 
                placeholder="Enter city"
                value={city}
                onChange={(e)=> setCity(e.target.value)}
            />
            <button onClick={fetchWeatherData}>
                <FaSearchLocation />
            </button>
        </div>
        {search &&
            <div className="weather-report">
                {weatherData ? 
                (<div>
                    <div>
                        <img src={`https://www.meteosource.com/static/img/ico/weather/${weatherData?.current?.icon_num}.svg`} alt="Weather mood" />
                    </div>
                    <div>
                        <h1 className="temp">{Math.round(weatherData?.current?.temperature)}°c</h1>
                        <p className="summary">{weatherData?.current?.summary}</p>
                    </div>
                    <div className="footer">
                        <section>
                           <p>{weatherData?.timezone}</p>
                        </section>
                        <section className="wind">
                            <FaWind />
                            <p>{weatherData?.current?.wind?.speed}Km/h</p>
                        </section>
                    </div>
                </div>) : 
                (<div>
                    <h3>Weather Report is Unavailable</h3>
                </div>)}
            </div>
        }
    </>
  )
}

export default WeatherApp;