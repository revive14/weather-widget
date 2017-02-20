"use strict";
var Weather = (function () {
    function Weather(temp, summary, wind, humiditiy, icon) {
        this.temp = temp;
        this.summary = summary;
        this.wind = wind;
        this.humiditiy = humiditiy;
        this.icon = icon;
    }
    return Weather;
}());
exports.Weather = Weather;
//# sourceMappingURL=weather.js.map