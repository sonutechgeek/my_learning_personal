function Timer() {
  this.getTimer = function (toDate, i, view) {
    var deadline = "";
    var x = "";
    var days = "";
    var hours = "";
    var now = "";
    var t = "";
    var minutes = "";
    var seconds = "";
    var time = "";
    deadline = getDateTime(toDate);
    x = setInterval(function () {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      hh = today.getHours();
      ii = today.getMinutes();
      ss = today.getSeconds();
      today = mm + "/" + dd + "/" + yyyy;
      currentDateTime =
        yyyy + "-" + mm + "-" + dd + " " + hh + ":" + ii + ":" + ss;
      now = getDateTime(currentDateTime);
      t = deadline - now;
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((t % (1000 * 60)) / 1000);
      if (view.toLowerCase() == "circle") {
        time = `<div class='col-1'> <div class='timer_div_'><span class='font-weight-bold timer_'>${days}</span> <br/><span class='font-weight-bold time_1'>Days</span></div></div><div class='col-1 collon_circle_timer'><span>:</span></div>
                    <div class='col-1'> <div class='timer_div_'><span class='font-weight-bold timer_'>${
                      hours < 10 ? "0" + hours : hours
                    }</span> <br/><span class='font-weight-bold time_1'>Hours</span></div></div><div class='col-1 collon_circle_timer'><span>:</span></div>
                    <div class='col-1'> <div class='timer_div_'><span class='font-weight-bold timer_'>${
                      minutes < 10 ? "0" + minutes : minutes
                    }</span> <br/><span class='font-weight-bold time_1'>Mins</span></div></div><div class='col-1 collon_circle_timer'><span>:</span></div> 
                    <div class='col-1'> <div class='timer_div_'><span class='font-weight-bold timer_'>${
                      seconds < 10 ? "0" + seconds : seconds
                    }</span> <br/><span class='font-weight-bold time_1'>Secs</span></div></div>`;
        //                if (days == 0) {
        //                    //time = hours + " h :" + minutes + " m :" + seconds + " s";
        //                    //                time = (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);
        //                } else {
        //                    //                hours = parseInt(hours) + 24 * parseInt(days);
        //                    //                time = hours + ":" + (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);
        //                }
      }
      if (view.toLowerCase() == "normal") {
        time = `
                        <div style='width:20%;text-align:center;'><span>${days}</span><br/><span class='normal_timer'>Days</span></div><div style='width:3%'>:</div>
                        <div style='width:20%;text-align:center;'>${
                          hours < 10 ? "0" + hours : hours
                        }<br/><span class='normal_timer'>Hrs</span></div><div style='width:3%'>:</div>
                        <div style='width:20%;text-align:center;'>${
                          minutes < 10 ? "0" + minutes : minutes
                        }<br/><span class='normal_timer'>Mins</span></div><div style='width:3%'>:</div>
                        <div style='width:20%;text-align:center;'>${
                          seconds < 10 ? "0" + seconds : seconds
                        }<br/><span class='normal_timer'>Secs</span></div>`;
      }
      $(`#card-timer-${i}`).html(time);
      if (t < 0) {
        delete_cookie("setCart");
        delete_cookie("setView");
        location.reload();
        // loadComponent("home", "REQ002");
      }
    }, 1000);
  };

  function getDateTime(toDate) {
    var dateArr = toDate.split(" ");
    var tdate = dateArr[0];
    var ttime = dateArr[1];
    var tdateArr = tdate.split("-");
    if (parseInt(tdateArr[0]) < 1970 || parseInt(tdateArr[0]) >= 3018)
      return "0";
    if (parseInt(tdateArr[1]) <= 0 || parseInt(tdateArr[1]) > 12) return "0";
    if (parseInt(tdateArr[2]) <= 0 || parseInt(tdateArr[2]) > 31) return "0";
    var year = parseInt(tdateArr[0]);
    var month = parseInt(tdateArr[1]) - 1;
    var day = parseInt(tdateArr[2]) - 1;
    var ttimeArr = ttime.split(":");
    if (parseInt(ttimeArr[0]) < 0 || parseInt(ttimeArr[0]) >= 24) return "0";
    if (parseInt(ttimeArr[1]) < 0 || parseInt(ttimeArr[1]) >= 60) return "0";
    if (parseInt(ttimeArr[2]) < 0 || parseInt(ttimeArr[2]) >= 60) return "0";
    var hour = parseInt(ttimeArr[0]);
    var minute = parseInt(ttimeArr[1]);
    var sec = parseInt(ttimeArr[2]);
    var yearDays = yearToDays(year);
    var yearInMsec = yearDays * 24 * 60 * 60 * 1000;
    var monthDays = monthToDays(year, month);
    var monthInMsec = monthDays * 24 * 60 * 60 * 1000;
    var dayInMsec = day * 24 * 60 * 60 * 1000;
    var hourInMsec = hour * 60 * 60 * 1000;
    var minutesInMsec = minute * 60 * 1000;
    var secondsInMsec = sec * 1000;
    var dateInMs =
      yearInMsec +
      monthInMsec +
      dayInMsec +
      hourInMsec +
      minutesInMsec +
      secondsInMsec;
    return dateInMs;
  }

  function yearToDays(year) {
    var days = 0;
    for (let i = 1970; i < year; i++) {
      if (i % 4 == 0) {
        if (i % 100 != 0) days += 366;
        else if (i % 400 != 0) days += 365;
        else days += 366;
      } else days += 365;
    }
    return days;
  }

  function monthToDays(year, month) {
    if (month >= 2) {
      var daysfeb = 28;
      if (year % 4 == 0) {
        if (year % 100 != 0) daysfeb = 29;
        else if (year % 400 == 0) daysfeb = 29;
      }
      var monthdays = 0;
      for (; month > 0; month--) {
        if (month == 2) monthdays += daysfeb;
        else if (month > 7) {
          if (month % 2 == 0) monthdays += 31;
          else monthdays += 30;
        } else if (month % 2 == 0) monthdays += 30;
        else monthdays += 31;
        //console.log(monthdays);
      }
      return monthdays;
    } else return month * 31;
  }
}
