$(document).ready(() => {
  var paramWinner = [];
  paramWinner["count"] = "0";
  paramWinner["action"] = "GETWINNERS";
  loadWinner(paramWinner);
});

function loadWinner(param) {
  loadData("winner", "REQ001", "GETWINNERS", param, "COMMON").then(
    (lotteryArr) => {
      if (lotteryArr.status.toUpperCase() == "SUCCESS") {
        str = `<div id='web_winner_Carousel' class='carousel slide feature_p_slider home-mid-uptraction-crousal' data-ride='carousel' style='max-width:94%; margin: auto;'>`;
        var winnerColorCode = [
          "#e94761",
          "#ee542c",
          "#104899",
          "#7eaf2c",
          "#48150e",
          "#ef9e08",
          "#0e312f",
          "#850c16",
          "#297832",
        ];
        var colorIndex = winnerColorCode.length;
        for (let i = 0; i < lotteryArr["winnerlist"].length - 1; i++) {
          let WinnerBgColorCode = "";
          if (i > colorIndex) {
            WinnerBgColorCode = winnerColorCode[i - colorIndex];
          } else {
            WinnerBgColorCode = winnerColorCode[i];
          }
          if (WinnerBgColorCode == "" || WinnerBgColorCode == undefined) {
            winnerColorCode = "#fd542c";
          }
          str += `<div class="win_cart col-12" style='margin:0px; padding: 5px;'>`;
          str += `<winner-card winid='${
            lotteryArr["winnerlist"][i]["WINID"]
          }' name='${lotteryArr["winnerlist"][i]["NAME"]}' winamt='${
            lotteryArr["winnerlist"][i]["WINAMT"]
          }' drawdate='${beautify(
            lotteryArr["winnerlist"][i]["WINDATE"] + " " + "00:00:00",
            "d-m-y"
          )}'
                                 mdata-phno='${
                                   lotteryArr["winnerlist"][i]["MOBILENo"]
                                 }' lotteryname='${
            lotteryArr["winnerlist"][i]["GAMECODE"]
          }' place='${lotteryArr["winnerlist"][i]["PLACE"]}'
                                 winimage='${
                                   lotteryArr["winnerlist"][i]["IMAGE"]
                                 }', color-code='${WinnerBgColorCode}' lotteryShortName='${
            lotteryArr["winnerlist"][i]["LOTTERYNAME"]
          }'>
                             </winner-card>

             </div>`;
        }
        str += `</div>`;
        $("#winners-image-box").html(str);
        $("#web_winner_Carousel").owlCarousel({
          center: false,
          items: 4,
          autoplay: true,
          autoplayTimeout: 5000,
          loop: true,
          nav: true,
          // autoWidth:"20%",
          responsiveClass: true,
          navText: [
            "<i style='font-size:30px;' class='fa fa-chevron-circle-left'></i>",
            "<i style='font-size:30px;' class='fa fa-chevron-circle-right'></i>",
          ],
          responsive: {
            0: { items: 1.01 },
            570: { items: 1.5 },
            630: { items: 1.75 },
            800: { items: 2 },
            900: { items: 2 },
            930: { items: 3 },
            1130: { items: 3 },
            1315: { items: 4 },
            1400: { items: 4 },
            1600: { items: 4 },
            1700: { items: 4 },
            1900: { items: 5 },
            2200: { items: 6 },
            2500: { items: 7 },
          },

          dots: false,
        });
      } else {
        $("#winners-image-box").html(
          "<div class='col-12'> <h3><B>  <center> Winners will be uploaded soon </center> </B></h3></div>"
        );
      }
    }
  );
}
