var curgame = 29;
class CalculateCounterTime {


    constructor(playingdatetime) {
        clearInterval(interval);

        // gameData[9] = {
        //             "resultdrawtimestamp":"2019-09-10 21:15:00",
        //             "result":":08:23:24:26:29:30:39:43:44:47:50:53:57:63:67:68:71:73:77:80:",
        //             "drawdate":"2019-12-18",
        //             "drawtime":"17:30:00",
        //             "fp":"15 Lakhs"
        //         }
        // CalculateCounterTime.countdownTimerList = {
        //     "timer-9": "00:00:00",
        // };

        var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

hh = today.getHours() 
ii = today.getMinutes() 
ss = today.getSeconds();


today = mm + '/' + dd + '/' + yyyy;
currentDateTime = yyyy + '-' + mm + '-' + dd + " " + hh + ":" + ii + ":" + ss;

        CalculateCounterTime.timerscountdown = "00:00:00";
        this.start(playingdatetime)
    }

    start(playingdatetime) {
        // currentDateTime = "2018-07-25 10:00:26";
        // for (let key in gameData) {
            // console.log(key + ":" + gameData[key].drawdate + " " + gameData[key].drawtime, currentDateTime);
            // console.log(playingdatetime + "#" + currentDateTime);

            let result = populateList(playingdatetime, currentDateTime);
            CalculateCounterTime.timerscountdown =result;
            // console.log(result);

        // }
        var state = this;
        var that = CalculateCounterTime;
        interval = setInterval(function () {
            // console.log(that.countdownTimerList);

                let timeToDrawArr = that.timerscountdown.split(':');
                // console.log(parseInt(timeToDrawArr[0]) + "#" + parseInt(timeToDrawArr[1]) + "#" + parseInt(timeToDrawArr[2]));
                that.timerscountdown = state.decrementTime(parseInt(timeToDrawArr[0]), parseInt(timeToDrawArr[1]), parseInt(timeToDrawArr[2]));
                state.displayTimer("timer-key-div", that.timerscountdown);
                // $(key).html(that.countdownTimerList[key]);
                if (that.timerscountdown == "00:00:00") {
                    // console.log("time to call API");
                    // alert('Timer UP Let the game be refreshed');
                    // if(gameName[curgame] && key.split('_')[1]==curgame)
                    //     loadComponent('game_'+curgame)
                    clearInterval(interval);
     
                }
            
        }, 1000);
    }

    
    displayTimer(element, timeText) {
        let timerArr = timeText.split(":");
        // let day = timerArr[0];
        let hour = timerArr[0];
        let min = timerArr[1];
        let sec = timerArr[2];
        let timeStr = "";
        // if (day != "00")
        //     timeStr += day + "d ";

        timeStr += hour + ":" + min + ":" + sec;

        $(element).html(timeStr.indexOf('NaN') > -1 ? "" : timeStr);
    }
    decrementTime(hours, minutes, seconds) {
        
        seconds--;
        var dseconds;
        var dminutes;
        var dhours;
        // var ddays;

        if (seconds < 0) {
            minutes = minutes - 1;
            seconds = 59;
        }

        if (minutes < 0) {
            hours = hours - 1;
            minutes = 59;
            seconds = 59;
        }
        if (hours < 0) {
            // days = days - 1;
            hours = 23;
            minutes = 59;
            seconds = 59;
        }
        // if (days <= 0 && hours == 0 && minutes == 0 && seconds == 0) {
        //     days = 0;
        //     hours = 0;
        //     minutes = 0;
        //     seconds = 0;
        // }
        if (seconds < 10)
            dseconds = "0" + seconds;
        else
            dseconds = seconds;
        if (minutes < 10)
            dminutes = "0" + minutes;
        else
            dminutes = minutes;
        if (hours < 10)
            dhours = "0" + hours;
        else
            dhours = hours;
        // if (days < 10)
        //     ddays = "0" + days;
        // else
        //     ddays = hours;
        // console.log(dhours+':'+dminutes+':'+dseconds);
        if (!hours && !minutes && !seconds) {

        }
        // console.log(dhours + ':' + dminutes + ':' + dseconds);
        return  dhours + ':' + dminutes + ':' + dseconds;
        // ddays + ':' +
    }

    stopInterval() {
        clearInterval(this.interval);
    }
}
// new CalculateCounterTime(gameInfo);

function populateList(counterDate, curDate) {
    var countDownDate = getEpochTime(counterDate);
    var now = getEpochTime(curDate);
    var distance = countDownDate - now;
    var distance_in_seconds = distance / 1000;
    var toggle = distance_in_seconds % 60;
    var seconds = toggle;
    toggle = (distance_in_seconds - seconds) / 60;
    seconds = (seconds < 10) ? ("0" + seconds) : (seconds);
    var minutes = toggle % 60;
    toggle = (toggle - minutes) / 60;
    minutes = (minutes < 10) ? ("0" + minutes) : (minutes);
    // var hours = toggle % 24;
    // toggle = (toggle - hours) / 24;
    // hours = (hours < 10) ? ("0" + hours) : (hours);
    var hours = (toggle < 10) ? ("0" + toggle) : (toggle);
    // this.result = (days < 10)?("0"+days):(days) +":"+(hours < 10)?("0"+hours):(hours)+":"+(minutes < 10)?("0"+minutes):(minutes)+":"+(seconds < 10)?("0"+seconds):(seconds);
    var result = hours + ":" + minutes + ":" + seconds;
    // days + ":" + 
    // console.log(result);

    return result;
}

function getEpochTime(toDate) {

    var dateArr = toDate.split(" ");
    var tdate = dateArr[0];
    var ttime = dateArr[1];
    //
    var tdateArr = tdate.split("-");
    if (parseInt(tdateArr[0]) < 1970 || parseInt(tdateArr[0]) >= 3018)
        return "0";
    if (parseInt(tdateArr[1]) <= 0 || parseInt(tdateArr[1]) > 12)
        return "0";
    if (parseInt(tdateArr[2]) <= 0 || parseInt(tdateArr[2]) > 31)
        return "0";
    var year = parseInt(tdateArr[0]);
    var month = parseInt(tdateArr[1]) - 1;
    var day = parseInt(tdateArr[2]) - 1;
    //
    var ttimeArr = ttime.split(":");
    if (parseInt(ttimeArr[0]) < 0 || parseInt(ttimeArr[0]) >= 24)
        return "0";
    if (parseInt(ttimeArr[1]) < 0 || parseInt(ttimeArr[1]) >= 60)
        return "0";
    if (parseInt(ttimeArr[2]) < 0 || parseInt(ttimeArr[2]) >= 60)
        return "0";
    //
    var hour = parseInt(ttimeArr[0]);
    var minute = parseInt(ttimeArr[1]);
    var sec = parseInt(ttimeArr[2]);
    //
    var yearDays = this.yearToDays(year);
    var yearInMsec = yearDays * 24 * 60 * 60 * 1000;
    var monthDays = this.monthToDays(year, month);
    var monthInMsec = monthDays * 24 * 60 * 60 * 1000;
    var dayInMsec = day * 24 * 60 * 60 * 1000;
    var hourInMsec = hour * 60 * 60 * 1000;
    var minutesInMsec = minute * 60 * 1000;
    var secondsInMsec = sec * 1000;
    var dateInMs = yearInMsec + monthInMsec + dayInMsec + hourInMsec + minutesInMsec + secondsInMsec;

    return dateInMs;
}

function yearToDays(year) {
    var days = 0;
    for (let i = 1970; i < year; i++) {
        if (i % 4 == 0) {
            if (i % 100 != 0)
                days += 366;
            else if (i % 400 != 0)
                days += 365;
            else
                days += 366;
        } else
            days += 365;
    }
    return days;
}

function monthToDays(year, month) {
    if (month >= 2) {
        var daysfeb = 28;
        if (year % 4 == 0) {
            if (year % 100 != 0)
                daysfeb = 29;
            else if (year % 400 == 0)
                daysfeb = 29;
        }
        var monthdays = 0;
        for (; month > 0; month--) {
            if (month == 2)
                monthdays += daysfeb;
            else if (month > 7) {
                if (month % 2 == 0)
                    monthdays += 31;
                else
                    monthdays += 30;
            } else if (month % 2 == 0)
                monthdays += 30;
            else
                monthdays += 31;
            //console.log(monthdays);
        }
        return monthdays;
    } else
        return month * 31;
}
