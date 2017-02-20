import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../service/weather.service';
import { Weather } from '../model/weather';

import {WEATHER_COLORS} from '../constants/constants';

declare var Skycons: any;

@Component({
    moduleId: module.id,
    selector: 'weather-app',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [ WeatherService ]
})

export class WeatherComponent implements OnInit {
    pos: Position;
    weatherData = new Weather(null,null,null,null,null);
    currentSpeedUnit = "kph";
    currentTempUnit = "fahrenheit";
    currentLocation = "";
    icons = new Skycons({ "color": "#FFF"});
    dataRecieved = false;
    constructor(private service: WeatherService){ }

    ngOnInit(){
        this.getCurrentLocation()
    }

    getCurrentLocation(){
        this.service.getCurrentLocation()
            .subscribe(position =>{
                    this.pos = position;
                    this.getCurrentWeather();
                    this.getLocationName();

    },
            err => console.error(err));

    }

    getCurrentWeather(){
        this.service.getCurrentWeather(this.pos.coords.latitude,this.pos.coords.longitude)
            .subscribe(weather => {
                 this.weatherData.temp = weather["currently"]["temperature"],
                 this.weatherData.summary = weather["currently"]["summary"],
                 this.weatherData.wind = weather["currently"]["windSpeed"],
                 this.weatherData.humiditiy = weather["currently"]["humidity"],
                 this.weatherData.icon = weather["currently"]["icon"]
                console.log("Weather Data:", this.weatherData);
                 this.setIcon();
                 this.dataRecieved = true;
                },
                err => console.error(err));

    }

    getLocationName(){
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(location=>{
                console.log(location);
                this.currentLocation = location["results"][1]["formatted_address"];
                console.log("Name: ", this.currentLocation)
            })
    }

    toggleUnits(){
        this.toggleTempUnit();
        this.toggleSpeedUnits();
    }

    toggleTempUnit(){
        if(this.currentTempUnit == 'fahrenheit'){
            this.currentTempUnit = 'celsius';
        }else{
            this.currentTempUnit = 'fahrenheit';
        }
    }

    toggleSpeedUnits(){
        if(this.currentSpeedUnit == 'kph'){
            this.currentSpeedUnit =  'mph';
        }else{
            this.currentSpeedUnit = 'kph';
        }
    }


    setIcon(){
        this.icons.add("icon", this.weatherData.icon);
        this.icons.play();
    }

    setStyles(): Object{
        if(this.weatherData.icon){
            this.icons.color = WEATHER_COLORS[this.weatherData.icon]["color"]
            return WEATHER_COLORS[this.weatherData.icon];
        }else{
            this.icons.color = WEATHER_COLORS["default"]["color"]
            return WEATHER_COLORS["default"];
        }
    }

}