$(document).ready(function () {
  getLotteries();
  $("#lottery-select").on("change", function () {
    var param = [];
    param["count"] = "0";
    param["action"] = "GETWINNERSALL";
    param["lotcode"] = $("#lottery-select").val();
    loadWinner(param);
  });
});

function getLotteries() {
  var param = [];
  param["status"] = "ALL";
  loadData("winner", "REQ001", "WINALL_LOTTERY", param, "COMMON").then(
    (responseArr) => {
      if (responseArr.status.toUpperCase() == "SUCCESS") {
        str = `<option value=''><label>All Lottery</label></option>`;
        lotarrlength = responseArr.lotterydetails.length;
        for (let i = 0; i < lotarrlength; i++) {
          str += `<option value='${responseArr.lotterydetails[i].lotcode}'><label>${responseArr.lotterydetails[i].lotname}-${responseArr.lotterydetails[i].lotcode}(${responseArr.lotterydetails[i].drawtime})</label></option>`;
        }
        $("#lottery-select").html(str);
        let param = [];
        param["count"] = "0";
        param["action"] = "GETWINNERSALL";
        loadWinner(param);
      } else {
        swal.fire(responseArr.message);
      }
    }
  );
}

function loadWinner(param) {
  loadData("winner", "REQ001", "GETWINNERS", param, "COMMON").then(
    (lotteryArr) => {
      if (lotteryArr.status.toUpperCase() == "SUCCESS") {
        let str = ``;

        let winnerColorCode = [
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
        let colorIndex = winnerColorCode.length;
        let pickColor = 0;
        console.log("lotteryArr['winnerlist']", lotteryArr["winnerlist"]);
        for (let i = 0; i < lotteryArr["winnerlist"].length; i++) {
          let WinnerBgColorCode = "";
          if (pickColor > colorIndex - 1) {
            pickColor = (pickColor + 1) % pickColor;
          }
          WinnerBgColorCode = winnerColorCode[pickColor];
          pickColor++;
          if (WinnerBgColorCode == "" || WinnerBgColorCode == undefined) {
            winnerColorCode = "#fd542c";
          }
          str += `<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">`;
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
                }' color-code='${WinnerBgColorCode}' lotteryShortName='${
            lotteryArr["winnerlist"][i]["LOTTERYNAME"]
          }'></winner-card></div>`;
        }
        $("#winners-image-box-new").html(str);
      } else {
        $("#winners-image-box-new").html(
          "<div class='col-12'> <h3><B>  <center> Winners will be uploaded soon </center> </B></h3></div>"
        );
      }
    }
  );
}
