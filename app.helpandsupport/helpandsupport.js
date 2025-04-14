var problemsList = {};
var subProblems = {};
var selectedSubProblems = [];
var userImgSrc = "";
var fallbackSrc = "./app.static/img/images/userlogo.png";

$("document").ready(function () {
  requestTabClick("raiserequest");
  $("#issueDescriptionDiv").hide();
  const imgElement = document.querySelector(".img-responsive");
  userImgSrc = imgElement.getAttribute("src");
});
function requestTabClick(tabName) {
  var tabname = tabName.toLowerCase();
  $(".help_common_center").hide();
  $(".help_tabs").addClass("help_inactiveTab");
  $("#" + tabname).removeClass("help_inactiveTab");
  if (tabname == "raiserequest") {
    $("#raiseRequestCentre").show();
    $("#requestStatusCentre").hide();
  } else {
    $("#raiseRequestCentre").hide();
    $("#requestStatusCentre").show();
    getAllComplaintStatus();
  }
  getProblemList();
}
function selectProblem(selectedRadio) {
  document
    .querySelectorAll(".problem-item")
    .forEach((item) => item.classList.remove("active"));
  selectedRadio.closest(".problem-item").classList.add("active");
}

function getProblemList() {
  var param = {
    mobile: user.mobileno,
    custcode: user.custcode,
  };
  $("#show_problem_details").html("");
  $("#issueDescriptionDiv").hide();
  $("#issueDescription").val("");
  let problemHtml = "";
  selectedSubProblems = [];
  loadData("helpSupport", "REQ001", "PROBLEM_TYPE", param, "COMMON").then(
    (responseArr) => {
      if (responseArr.problem) {
        problemsList = responseArr.problem_category;
      }
      if (responseArr.problem_category) {
        subProblems = responseArr.problem;
      }
      if (problemsList) {
        Object.keys(problemsList).forEach((problemId) => {
          problemHtml += `
                <label class="problem-item" for="problem${problemId}">
                    ${problemsList[problemId]}
                    <input type="radio" name="problem" id="problem${problemId}" value="${problemId}" style="font-size:15px;" onchange="showSubProblems('${problemId}', '${problemsList[problemId]}')">
                    <span class="tick-icon">
                        <img src="app.static/img/svg/greentick.svg" alt="green tick">
                    </span>
                </label>
            `;
        });
      }
      $("#show_problem_details").html(problemHtml);
    }
  );
}

function showSubProblems(problemId, selectedProblem) {
  const subProblemList = subProblems[problemId];
  $("#issueDescriptionDiv").show();

  if (!subProblemList) {
    alert("No sub-problems available for this problem.");
    return;
  }
  let subProblemHtml = "";
  subProblemHtml = `<label class="problem-item active" for="problem${problemId}">
              ${selectedProblem}
              <input type="hidden" name="selectedProblem" id="selectedProblem" value="${problemId}" >
              <span class="tick-icon">
                  <img src="app.static/img/svg/greentick.svg" alt="green tick">
              </span>
          </label>`;
  subProblemHtml += `<div class="d-flex">`;
  Object.keys(subProblemList).forEach((subProblemId) => {
    subProblemHtml += `
            <label class="problem-item" for="subProblem${subProblemId}">
                ${subProblemList[subProblemId]}
                <input 
                    type="radio" 
                    name="subProblem" 
                    id="subProblem${subProblemId}" 
                    value="${subProblemId}" 
                    onchange="selectSubProblem(this, '${subProblemList[subProblemId]}')">
            </label>
        `;
  });
  subProblemHtml += `</div>`;
  subProblemHtml += `<label class="problem-item" onclick="showProblems()">Main Menu</label>`;
  subProblemHtml += `
        <div class="mt-3 d-flex justify-content-start align-items-center gap-3">
            <div class="upload-container position-relative mx-2">
                <label class="upload-icon" for="uploadProblemImage" title="Upload Problem Image">
                <img id="uploadedProblemImage" src="app.static/img/myprofile/add-photo.png" alt="Upload Problem" class="upload-image">
                <input type="file" id="uploadProblemImage" class="d-none" onchange="handleFileUpload(this, 'uploadedProblemImage', 'removeProblemImage')">
                </label>
                <button type="button" class="remove-icon  position-absolute" id="removeProblemImage" onclick="resetImage('uploadedProblemImage', 'removeProblemImage','uploadProblemImage')">
                &times;
                </button>
            </div>
            <div class="upload-container position-relative mx-2">
                <label class="upload-icon" for="uploadSupportingImage" title="Upload Supporting File">
                <img id="uploadedSupportingFile" src="app.static/img/myprofile/add-photo.png" alt="Upload Support" class="upload-image">
                <input type="file" id="uploadSupportingImage" class="d-none" onchange="handleFileUpload(this, 'uploadedSupportingFile', 'removeSupportingImage')">
                </label>
                <button type="button" class="remove-icon  position-absolute" id="removeSupportingImage" onclick="resetImage('uploadedSupportingFile', 'removeSupportingImage','uploadSupportingImage')">
                &times;
                </button>
            </div>
        </div>`;
  $("#show_problem_details").html(subProblemHtml);
}

function handleFileUpload(input, imgElementId, removeButtonId) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imgElement = document.getElementById(imgElementId);
      imgElement.src = e.target.result;
      const removeButton = document.getElementById(removeButtonId);
      removeButton.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    alert("No file selected.");
  }
}

function resetImage(imgElementId, removeButtonId, inputFieldId) {
  const imgElement = document.getElementById(imgElementId);
  const removeButton = document.getElementById(removeButtonId);
  const inputField = document.getElementById(inputFieldId);
  // console.log("inputField ",inputField);
  imgElement.src = "app.static/img/myprofile/add-photo.png";
  removeButton.style.display = "none";
  // console.log("teste",document.querySelector(`input#${removeButtonId.replace("remove", "upload")}`));
  inputField.value = "";
}

function showProblems() {
  getProblemList();
}

function selectSubProblem(radio, text) {
  const subProblemId = radio.value;
  const problemObject = { problem: subProblemId, text };
  selectedSubProblems = [problemObject];
  const allLabels = document.querySelectorAll(".problem-item");
  allLabels.forEach((label) => label.classList.remove("selected"));
  radio.parentElement.classList.add("selected");
  console.log("Selected Sub-Problem:", selectedSubProblems);
}

async function submitProblem() {
  const issueDescription = document
    .getElementById("issueDescription")
    .value.trim();
  const selectedProblem = $("#selectedProblem").val();
  const selectedSubProblem = $('input[name="subProblem"]:checked').val();
  if (selectedProblem == "" || selectedProblem == undefined) {
    successErrorAlert("error", "", "Please select problem first");
    return false;
  }
  if (selectedSubProblem == "" || selectedSubProblem == undefined) {
    successErrorAlert("error", "", "Please select any sub problem");
    return false;
  }
  const uploadProblemImageInput = document.getElementById("uploadProblemImage");
  const uploadSupportingFileInput = document.getElementById(
    "uploadSupportingImage"
  );
  const fileToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ base64: reader.result, name: file.name });
      reader.onerror = () => reject(`Failed to read file: ${file.name}`);
      reader.readAsDataURL(file);
    });
  };
  let problemImage = null;
  let supportingFile = null;
  let problemImageBase64 = "";
  let supportingFileBase64 = "";
  let problemImageName = "";
  let supportingFileName = "";
  try {
    if (uploadProblemImageInput.files[0]) {
      problemImage = await fileToBase64(uploadProblemImageInput.files[0]);
      if (problemImage != null || problemImage != "") {
        problemImageBase64 = problemImage.base64;
        problemImageName = problemImage.name;
      }
    }
    if (uploadSupportingFileInput.files[0]) {
      supportingFile = await fileToBase64(uploadSupportingFileInput.files[0]);
      if (supportingFile != null || supportingFile != "") {
        supportingFileBase64 = supportingFile.base64;
        supportingFileName = supportingFile.name;
      }
    }
  } catch (error) {
    console.error("File processing error:", error);
    alert(error);
    return;
  }

  var raiserequestParam = {
    action: "savecomplaints",
    mobileno: user.mobileno,
    emailid: user.email,
    retcode: user.custcode,
    problem_id: selectedProblem,
    claimpending: selectedSubProblem,
    remark: issueDescription,
    filename: problemImageName,
    filename2: supportingFileName,
    attachment: problemImageBase64,
    attachment2: supportingFileBase64,
  };
  //console.log("Data to be submitted:", raiserequestParam);
  loadData(
    "helpSupport",
    "REQ001",
    "REGISTER_COMPLAINT",
    raiserequestParam,
    "COMMON"
  ).then((responseArr) => {
    //console.log("responseArr at save", responseArr);
    if (responseArr.status.toUpperCase() == "SUCCESS") {
      successErrorAlert("success", "", responseArr.message);
      showProblems();
    } else {
      successErrorAlert("error", "", responseArr.message);
    }
  });
}

function getAllComplaintStatus() {
  let requeststatusParam = {
    mobileno: user.mobileno,
    emailid: user.email,
    retcode: user.custcode,
  };
  let allComplaintHtml = "";
  $("#requestStatusCentre").html("");
  //console.log("Response for chat:", requeststatusParam);
  loadData(
    "helpSupport",
    "REQ001",
    "COMPLAINT_REQUEST_STATUS",
    requeststatusParam,
    "COMMON"
  ).then((responseArr) => {
    //console.log("Response at chat ", responseArr);
    if (responseArr.status.toUpperCase() == "SUCCESS") {
      responseArr.data.forEach((complaint) => {
        const dateObj = new Date(complaint.complaint_date);
        const formattedDate = dateObj.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        const formattedTime = dateObj.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        allComplaintHtml += `
                    <div class="main_content">
                        <div class="date-time">
                            <span>${formattedDate}</span> <span>${formattedTime}</span>
                        </div>
                        <div class="message">
                            <div class="show_message_first_div"><span>${
                              complaint.problem
                            }</span></div> 
                            <div class="show_message_last_div" ><span class="show_message" id="show_message${
                              complaint.complaint_no
                            }"
                                style="color: #901393;" 
                                onclick="complainChat('${
                                  complaint.complaint_no
                                }','${complaint.status}')">Show Message
                                <img style="${
                                  parseInt(complaint.totalUnread) > 0
                                    ? "display:inline-block;"
                                    : "display:none;"
                                }"" id="chatIcon_${
          complaint.complaint_no
        }" src="./app.static/img/images/chat_notification.png">
                            </span></div>
                        </div>
                        <div class="status" id="status_${
                          complaint.complaint_no
                        }">
                            <span class='font-weight-bold'>Status-</span> 
                            <span class="class='font-weight-bold' ${
                              complaint.status.toLowerCase() === "pending"
                                ? "pending"
                                : "closed"
                            }" id="${complaint.status.toLowerCase()}">${
          complaint.status
        }</span>
                        </div>
                    </div>
                    <div class="message-show" style="display:none;" id="messageshow${
                      complaint.complaint_no
                    }"></div>`;
      });
      $("#requestStatusCentre").html(allComplaintHtml);
    } else {
      successErrorAlert("error", "", responseArr.message);
    }
  });
}

function complainChat(complain_no, status) {
  let requeststatusChatParam = {
    intMobileNo: user.mobileno,
    intComplaintNo: complain_no,
  };
  let chatStatusshow = "";
  markConversationAsRead(complain_no);

  loadData(
    "helpSupport",
    "REQ001",
    "COMPLAINT_CHAT_STATUS",
    requeststatusChatParam,
    "COMMON"
  ).then((responseArr) => {
    // console.log("responseArr all complet res",responseArr);
    if (responseArr.status.toUpperCase() == "SUCCESS") {
      $(".message-show").hide();
      $(".status").show();
      $(`#messageshow${complain_no}`).show();
      $(`#status_${complain_no}`).hide();
      $(`.show_message`).css("visibility", "visible");
      $(`#show_message${complain_no}`).css("visibility", "hidden");
      responseArr.data.forEach((complaint) => {
        const dateObj = new Date(complaint.datConversation);
        const formattedTime = dateObj.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        if (complaint.txtCustomerRemark) {
          chatStatusshow += `
                        <div class="message-by-user">
                            <div id="text">${complaint.txtCustomerRemark}<br /><br />
                                <span id="times">${formattedTime}</span>
                            </div>
                            <div id="user">
                                <img class="setUserImg" src="${userImgSrc}" alt="User Logo">
                            </div>
                        </div>`;
        }
        if (complaint.txtBOUserRemark) {
          chatStatusshow += `
                        <div class="message-by-team">
                            <div id="logo">
                                <img src="./app.static/img/images/chatlogo.png" alt="Team Logo">
                            </div>
                            <div id="content">
                                <span id="text">${complaint.txtBOUserRemark}</span>
                                <span id="time">${formattedTime}</span>
                            </div>
                        </div>`;
        }
        if (complaint.txtImageData) {
          chatStatusshow += `
                        <div id="showtxtImage" style="width:350px; margin-left:auto; margin-top:18px;">
                            <img src=${complaint.txtImageData} alt="" style="width:100%; border-radius:10px;">
                        </div>`;
        }
      });
      if (status.toUpperCase().trim() == "PENDING") {
        chatStatusshow += `
                <div class="chat-start">
                    <textarea class="text-box-user-query" id="text-box-user-query${complain_no}" placeholder="Write your query here..."></textarea>
                    <div class="position-relative text-center">
                        <label class="upload-icon" for="uploadedConversationImage_${complain_no}" title="Upload Supporting File">
                            <img id="uploadedConversationFile_${complain_no}" src="app.static/img/myprofile/add-photo.png" alt="Upload Support" class="upload-image">
                        <input type="file" id="uploadedConversationImage_${complain_no}" class="d-none" onchange="handleFileUpload(this, 'uploadedConversationFile_${complain_no}', 'removeConversationImage_${complain_no}')">
                        </label>
                            <button type="button" class="remove-icon position-absolute" style="right:-12px;" id="removeConversationImage_${complain_no}" onclick="resetImage('uploadedConversationFile_${complain_no}', 'removeConversationImage_${complain_no}','uploadedConversationImage_${complain_no}')">
                        &times;
                        </button>   
                    </div>
                    <button type="button" onclick="sendComplainQuery(${complain_no})" class="reply-btn">Send</button>
                </div>`;
      }
      $(`#messageshow${complain_no}`).html(chatStatusshow);
    } else {
      successErrorAlert("error", "", responseArr.message);

      // $(`#messageshow${complain_no}`).html(`
      //     <div class="chat-start">
      //         <textarea class="text-box-user-query" id="text-box-user-query${complain_no}" placeholder="Write your query here..."></textarea>
      //         <button type="button" onclick="sendComplainQuery(${complain_no})" class="reply-btn">Send</button>
      //     </div>`);
    }
    const imgElements = document.querySelectorAll(".setUserImg");
    imgElements.forEach((img) => {
      if (userImgSrc && userImgSrc.startsWith("data:image/")) {
        img.setAttribute("src", userImgSrc);
      } else {
        img.setAttribute("src", fallbackSrc);
      }
    });
  });
}

async function sendComplainQuery(intComplain_no) {
  let userQuery = $("#text-box-user-query" + intComplain_no).val();
  const uploadedConversationFileInput = document.getElementById(
    "uploadedConversationImage_" + intComplain_no
  );
  const fileToBase64AtChat = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ base64: reader.result, name: file.name });
      reader.onerror = () => reject(`Failed to read file: ${file.name}`);
      reader.readAsDataURL(file);
    });
  };
  let conversationFile = null;
  let conversationFileName = "";
  let conversationFileBase64 = "";
  try {
    if (uploadedConversationFileInput.files[0]) {
      conversationFile = await fileToBase64AtChat(
        uploadedConversationFileInput.files[0]
      );
      if (conversationFile != null || conversationFile != "") {
        conversationFileBase64 = conversationFile.base64;
        conversationFileName = conversationFile.name;
      }
    }
  } catch (error) {
    console.error("File processing error:", error);
    alert(error);
    return;
  }

  if (userQuery == "" && conversationFileBase64 == "") {
    successErrorAlert("error", "", "Image and message both cannot be empty.");
    return false;
  }
  let userComplainParam = {
    intComplaintNo: intComplain_no,
    intMobileNo: user.mobileno,
    txtCustomerMessage: userQuery,
    txtImageData: conversationFileBase64,
  };
  console.log("userComplainParam with img", userComplainParam);
  loadData(
    "helpSupport",
    "REQ001",
    "COMPLAINT_CHAT_USER_MSG",
    userComplainParam,
    "COMMON"
  ).then((responseArr) => {
    if (responseArr.status.toUpperCase() == "SUCCESS") {
      //successErrorAlert("success", "", responseArr.message);
      $(`#show_message${intComplain_no}`).click();
      //console.log("suc", responseArr);
    } else {
      //   console.log("err", responseArr);
      //   alert(responseArr.message);
      successErrorAlert("error", "", responseArr.message);
    }
  });
}

function markConversationAsRead(intComplaintNo) {
  // MARK_CONVERSATION_AS_READ
  let markConversationParam = {
    intComplaintNo: intComplaintNo,
    intMobileNo: user.mobileno,
  };
  // console.log("testetetetehhdhhdhdhgdgghdghteetet",markConversationParam);
  loadData(
    "helpSupport",
    "REQ001",
    "MARK_CONVERSATION_AS_READ",
    markConversationParam,
    "COMMON"
  ).then((responseArr) => {
    console.log("responseArrresponseArr", responseArr);

    if (responseArr.status.toUpperCase() == "SUCCESS") {
      $("#chatIcon_" + intComplaintNo).hide();
      getNotificationBadgeHelpAndSupport();
      console.log("testetetetetete");
    } else {
    }
  });
}
