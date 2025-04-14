user = getuserdata();
var uploadDocumentNumber = '';
var document_verify = 'MANUAL';
var kycDocumentId = '';
var docType = '';
var docMessage = '';
//AADHAR_CARD_BACK
$('document').ready(function () {
    $('#Document_header').on("click", "#back-to-Document-screen", function () {
        captureClicks('1', '', '');
        loadComponent("account", "REQ002");
    });
    $('#kyc-img-cancel-btn').on("click", function () {
        $('#kyc-common-modal').modal("hide");
        if (document_verify != "MANUAL" && $('#kyc-image-type').val() != "AADHAR_CARD_FRONT") {
//            $("#image").attr("src", "");
            $("#kyc-uploaded-images").attr("src", "");
            $('#kyc-image-type').val("");
            $('#kyc-image-name').val("");
            $("#kyc-image").val("");
            $("#kyc-uploaded-images").val("");
        }
    });
    $('#kyc-img-pan-cancel-btn').on("click", function () {
        $('#kyc-common-modal-pan').modal("hide");
    });
});

function kycTabButton() {
//    $("#document_message").text("Upload Pan Card");
    ducomentVerify();
    getKycStatusData();
}


function ducomentVerify() {
    var param = {};
    //        loadData('invoice', 'REQ001', 'KYC_DOCUMENT_VERIFYS', param, 'COMMON').then(responseArr => {
    loadData('invoice', 'REQ001', 'KYC_DOCUMENT_VERIFY', param, 'COMMON').then(responseArr => {
        console.log(responseArr);
        if (responseArr.status.toUpperCase() == "SUCCESS") {
            document_verify = responseArr.document_verify.toUpperCase();
        }
        //        document_verify = "MANUAL";
        uploadPancard();
    });
}

//function getDropDown() {
//    $("#document_message").text("Upload " + $('#selecter_document option:selected').text());
//    var getDocument = $('#selecter_document option:selected').val();
//    if (getDocument.toLowerCase() == "pancard") {
//        uploadPancard();
//    } else {
//        uploadAdhar();
//    }
//}

function uploadAdhar() {
    console.log(document_verify);
    var str = ``;
    str = ` <div class="row align-items-center">
                <div class="col-12 common-doc">
                    <input type="text" class="form-control" id="idcard_input" style="height:55px;" placeholder="Enter ID Card Number" onkeypress="return KeyPressHandler('ALPHANUMCHAR', event, ' ')" oninput="return RegularExpHandler('ALPHANUMCHAR',this.id,'')" maxlength="16">
                </div>
            </div>
            <div class="row align-items-center document-items mt-4">
                <div class='doc_status_class' id='aadhar_card_front_doc_status'></div>
                <div class="col-7">
                    <label for="idcardfront" class="doc-text" id="aadhar_text_front">
                       Upload Aadhar Card Front 
                    </label>
                </div>
                <div class="col-5 text-right">
                    <label for="idcardfront">
                        <img class="camera-browse doc-camera-browser" src="app.static/img/myprofile/uploaddocument.png" id="AADHAR_CARD_FRONT" onclick="return commonModal(this.id,'idcard_input','IDCARD')">
                    </label>
                </div>
            </div>
            <div class="row align-items-center" id="idcard_button_div">
                    <div class="col-12 common-doc">
                        <center><button type="button" class="btn btn-warning btn-block text-white commondoc-btn  profile-anim-btn profile-common-button--greip profile-common-red-button profile-radius-button-25px" id="idcard_input_button" onclick="uploadImage(this.id,'idcard_input','IDCARD');"><span>Upload</span></button></center>
                    </div>
            </div>
            <div class="row align-items-center document-items mt-4" id="adhar_card_back_image_div">
                <div class='doc_status_class' id='aadhar_card_back_doc_status'></div>
                <div class="col-7">
                    <label for="idcardback" class="doc-text" id="aadhar_text_back">
                       Upload Aadhar Card Back
                    </label>
                </div>
                <div class="col-5 text-right">
                    <label for="idcardback">
                        <img class="camera-browse doc-camera-browser" src="app.static/img/myprofile/uploaddocument.png" id="AADHAR_CARD_BACK" onclick="return commonModal(this.id,'idcard_input','IDCARD')">
                    </label>
                </div>
            </div>
            `;
    $("#documnets_div_aadhar").html(str);
    //    document_verify = "MANUAL";
    if (document_verify.toUpperCase() == "AUTO") {
        $("#idcard_input,#idcard_button_div").hide();
        $("#kyc-img-update-btn").show();
        $("#adhar_card_back_image_div").show();
    } else {
        $("#idcard_input,#idcard_button_div").show();
        $("#kyc-img-update-btn").hide();
        $("#adhar_card_back_image_div").hide();
    }
    kycDocumentId = 'idcard_input';
    getKycData('AADHAR_CARD_FRONT');
}
var onloadKyc = true;
function uploadPancard() {
    var str = ``;
    str = `<div class="row align-items-center">
                <div class="col-12 common-doc">
                    <input type="text" class="form-control" id="pancard_input" style="height:55px;" placeholder="Enter Pan Card Number" onkeypress="return KeyPressHandler('ALPHANUMCHAR', event, ' ')" oninput="return RegularExpHandler('ALPHANUMCHAR',this.id,' ')" maxlength="10">
                </div>
            </div>
            <div class="row align-items-center document-items mt-4">
                <div class='doc_status_class' id='pan_card_doc_status'></div>
                <div class="col-7">
                    <label for="pancard" class="doc-text" id="pancard_text">
                       Upload Pan Card
                    </label>
                </div>
                <div class="col-5 text-right">
                    <label for="pancard">
                        <img class="camera-browse doc-camera-browser" src="app.static/img/myprofile/uploaddocument.png" id="PAN_CARD" onclick="return pan_commonModal(this.id,'pancard_input','PAN')"> 
                    </label>
                </div>
            </div>
            <div class="row align-items-center">
                    <div class="col-12 common-doc">
                        <center><button type="button" class="btn btn-warning btn-block text-white commondoc-btn profile-anim-btn profile-common-button--greip profile-common-red-button profile-radius-button-25px" id="pancard_input_button" onclick="pan_uploadImage(this.id,'pancard_input','PAN');"><span>Upload</span></button></center>
                    </div>
            </div>
            `;
    $("#documnets_div").html(str);
    //    document_verify = "MANUAL";
    if (document_verify.toUpperCase() == "AUTO") {
        $("#pancard_input,#pancard_input_button").hide();
        $("#kyc-img-update-btn_pan").show();
    } else {
        $("#pancard_input,#pancard_input_button").show();
        $("#kyc-img-update-btn_pan").hide();
    }
    kycDocumentId = 'pancard_input';
    getKycData('PAN_CARD');
}
function readURL(input) {
    $("#kyc-uploaded-images").attr("src", "");
    if ((input.files[0].size / 1024) > 1024) {
        successErrorAlert("error", "", "File size should be less than or equal 1 MB");
        $("#kyc-images").attr("src", "");
        $("#kyc-uploaded-images").attr("src", "");
        $("#kyc-images").val('');
        $("#kyc-uploaded-images").val('');
        $('#kyc-images-name').text('No file choosen');
        return false;
    }
    let ext = (input.files[0].name).substr((input.files[0].name).lastIndexOf(".") + 1).toLowerCase();
    if (ext == "png" || ext == "jpg" || ext == "jpeg") {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#kyc-uploaded-images').attr('src', e.target.result);
                $('#kyc-image-name').val(input.files[0].name);
                $('#kyc-images-name').text(input.files[0].name);
            };
            reader.readAsDataURL(input.files[0]);
//            $('#img').show();
        }
    } else {
        successErrorAlert("error", "", ext + " File Extension Not Allowed");
        $("#kyc-images").attr("src", "");
        $("#kyc-uploaded-images").attr("src", "");
        $("#kyc-images").val('');
        $("#kyc-uploaded-images").val('');
        $('#kyc-images-name').text('No file choosen');
        return false;
    }
}

function commonModal(id, inputId, type) {
    $('#kyc-image-type').val("");
    kycDocumentId = '';
    docType = '';
    if (document_verify.toUpperCase() == "AUTO" || (document_verify.toUpperCase() == "MANUAL" && id == "AADHAR_CARD_BACK")) {
        $("#kyc-image").attr("src", "");
        $("#kyc-image").val("");
        $("#kyc-uploaded-images").attr("src", "");
        $("#kyc-uploaded-images").val("");
        $('#kyc-image-name').val("");
        $("#kyc-img-update-btn").show();
    }
    if (document_verify.toUpperCase() == "MANUAL" && id == "AADHAR_CARD_FRONT") {
        $("#kyc-img-update-btn").hide();
    }
    var param = {'document_type': id, 'custcode': user.custcode};
    //    console.log(param);
    loadData('account', 'REQ001', 'KYC_DOCUMENT_VIEW', param, 'COMMON').then(responseArr => {
        console.log(responseArr);
        if (responseArr.status.toUpperCase() == 'SUCCESS') {
            if (responseArr['data']['docsdata'].length > 0) {
                var responseData = responseArr['data']['docsdata'];
                $('#kyc-uploaded-images').attr("src", responseData[0].document_url);
            } else {
                $("#kyc-uploaded-images").attr("src", "./app.static/img/icon-kyc-docid-upload.png");
            }
            if (responseArr.data['kyc_status'].toUpperCase() == "APPROVED" || responseArr.data['kyc_status'].toUpperCase() == "PENDING") {
                $("#kyc-img-update-btn").hide();
                $("#div_image_upload").hide();
                $("#imgAllowed").hide();
//                $("#h4_kyc_status").html('KYC Status :&nbsp;' + responseArr.data['kyc_status'].toUpperCase());
                $("#h4_kyc_status").html('Documnet Status :&nbsp;' + responseArr['data'].docsdata[0]['document_status'].toUpperCase());
                $("#h4_kyc_status").show();
            } else {
                $("#div_image_upload").show();
                $("#imgAllowed").show();
                $("#h4_kyc_status").hide();
            }
        } else if (responseArr.status.toUpperCase() == 'ERROR') {
            $("#kyc-uploaded-images").attr("src", "./app.static/img/icon-kyc-docid-upload.png");
            $("#kyc-image-name").val("");
            $("#kyc-images-name").text("");
            $("#kyc-images").val("");
            if (id == "AADHAR_CARD_BACK") {
                $("#div_image_upload").show();
            }
        }
    });
    $('#kyc-image-type').val(id);
    $('#kyc-common-modal').modal("show");
    kycDocumentId = inputId;
    docMessage = "Please Enter Valid ID Card No."
}

function uploadImage(id, inputId, type) {
    if (!imageValidation('aadhar'))
        return false;
    Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ad1b26',
        cancelButtonColor: '#fff',
        confirmButtonText: 'Yes'
    }).then((r) => {
        if (r.value) {
            var kyc_documentData = $('#kyc-uploaded-images').attr('src').replace(/^data:(image|application)\/(png|jpg|pdf|jpeg);base64,/, "");
            var document_number = document_verify == "AUTO" ? '' : $("#idcard_input").val().trim();
            if (document_verify == "MANUAL" && $('#kyc-image-type').val() == "AADHAR_CARD_BACK") {
                document_number = "";
            }
            var param = {
                'document_name': $('#kyc-image-name').val(),
                'custcode': user.custcode,
                'document_data': kyc_documentData,
                'document_number': document_number,
                'document_type': $('#kyc-image-type').val()
            };
            console.log(param);
            //            return false;
            loadData('account', 'REQ001', 'KYC_DOCUMENT_UPLOAD', param, 'COMMON').then(responseArr => {
                console.log(responseArr);
                if (responseArr.status.toUpperCase() == 'SUCCESS') {
                    uploadDocumentNumber = responseArr.document_number;
                    successErrorAlert("success", "", responseArr.message);
//                    getIDcardData(uploadDocumentNumber);
                    hideShow();
                    $('#kyc-img-cancel-btn').click();
                    if ($('#kyc-image-type').val() == "AADHAR_CARD_FRONT") {
                        getKycData('AADHAR_CARD_FRONT');
                    } else {
                        getKycData('AADHAR_CARD_BACK');
                    }
                    getKycStatusData();
                } else if (responseArr.status.toUpperCase() == 'ERROR') {
//                        hideShow()
                    $('#kyc-img-cancel-btn').click();
                    successErrorAlert("error", "", responseArr.message);
                }
            });
        }
    });
}

function hideShow() {
    if (document_verify.toUpperCase() == "MANUAL" && $('#kyc-image-type').val() == "AADHAR_CARD_FRONT") {
        document_number = "";
        $("#idcard_button_div").hide();
        $("#kyc-img-update-btn").show();
        $("#adhar_card_back_image_div").show();
    }
}

function getIDcardData(uploadDocumentNumber, doc_status, doc_id) {
    console.log(kycDocumentId + "---" + uploadDocumentNumber);
    if (doc_status.toUpperCase() == "APPROVED") {
        if (uploadDocumentNumber != '') {
            $("#" + kycDocumentId).show();
            $("#" + kycDocumentId).val(uploadDocumentNumber);
            $("#" + kycDocumentId).prop("disabled", true);
        }
    } else {
        $("#" + kycDocumentId).hide();
    }
}

function imageValidation(action) {
    if (action.toLowerCase() == "pan") {
        if ($('#kyc-uploaded-images_pan').attr('src') == undefined || $('#kyc-uploaded-images_pan').attr('src') == null || $('#kyc-uploaded-images_pan').attr('src') == "undefined" || $('#kyc-uploaded-images_pan').attr('src') == "" || $('#kyc-uploaded-images_pan').attr('src') == "./app.static/img/icon-kyc-docid-upload.png") {
            successErrorAlert("error", "", "Please Select Image");
            return false;
        } else if ($('#kyc-image-type_pan').val() == "") {
            successErrorAlert("error", "", "Please Select Image Type");
            return false;
        } else if ($('#kyc-image-name_pan').val() == "") {
            successErrorAlert("error", "", "Please Select Image Name");
            return false;
        }
    } else {
        if ($('#kyc-uploaded-images').attr('src') == undefined || $('#kyc-uploaded-images').attr('src') == null || $('#kyc-uploaded-images').attr('src') == "undefined" || $('#kyc-uploaded-images').attr('src') == "" || $('#kyc-uploaded-images').attr('src') == "./app.static/img/icon-kyc-docid-upload.png") {
            successErrorAlert("error", "", "Please Select Image");
            return false;
        } else if ($('#kyc-image-type').val() == "") {
            successErrorAlert("error", "", "Please Select Image Type");
            return false;
        } else if ($('#kyc-image-name').val() == "") {
            successErrorAlert("error", "", "Please Select Image Name");
            return false;
        }
    }
    if (document_verify.toUpperCase() != "AUTO") {
        var getIdNumber = $("#" + kycDocumentId).val().trim();
        if ($('#kyc-image-type').val() != "AADHAR_CARD_BACK") {
            if (getIdNumber == null || getIdNumber == undefined || getIdNumber == '' || getIdNumber.length == 0) {
                successErrorAlert("error", "", docMessage);
                return false;
            }
        }
        if (action.toUpperCase() == "PAN") {
            var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
            if (!regex.test(getIdNumber)) {
                successErrorAlert("error", "", docMessage);
                return false;
            }
        }
    }
    return true;
}

function getKycStatusData() {
    $(".kycStatus").text('');
    $(".kycStatus-div-Class").text('');
    var param = {'custcode': user.custcode};
    loadData('account', 'REQ001', 'KYC_DOCUMENT_VIEW', param, 'COMMON').then(responseArr => {
        console.log(responseArr);
        if (responseArr.status.toUpperCase() == 'SUCCESS') {
            $(".kycStatus-div-Class").html('KYC Status :&nbsp;');
            $(".kycStatus").html(responseArr.data['kyc_status'].toUpperCase());
            if (responseArr.data['kyc_status'].toUpperCase() == "APPROVED") {
                $(".kycStatus").css({"color": "green"});
            } else {
                $(".kycStatus").css({"color": "#ffc107"});
            }
        }
    });
}
function getKycData(id) {
    try {
        var param = {'document_type': id, 'custcode': user.custcode};
        $(".doc_kycStatus").text('');
        $(".docStatus-div-Class").text('');
        if (id.toUpperCase() == "PAN_CARD") {
            $('#kyc-uploaded-images_pan').attr("src", "");
        } else {
            $('#kyc-uploaded-images').attr("src", "");
        }
        loadData('account', 'REQ001', 'KYC_DOCUMENT_VIEW', param, 'COMMON').then(responseArr => {
            console.log(responseArr);
            if (responseArr.status.toUpperCase() == 'SUCCESS') {
                if (responseArr['data']['docsdata'].length > 0) {
                    var responseData = responseArr['data']['docsdata'];
                    if (id.toUpperCase() == "PAN_CARD") {
                        $('#kyc-uploaded-images_pan').attr("src", responseData[0].document_url);
                        $("#pancard_text").text("View Pan Card Document");
                    } else {
                        $('#kyc-uploaded-images').attr("src", responseData[0].document_url);
                        if (id.toUpperCase() == "AADHAR_CARD_FRONT") {
                            $("#aadhar_text_front").text("View Aadhar Front Document");
                        } else {
                            $("#aadhar_text_back").text("View Aadhar Back Document");
                        }
                    }
                    $(".docStatus-div-Class").html('Document Status :&nbsp;');
                    $(".doc_kycStatus").text(responseData[0].document_status.toUpperCase());
                    let doc_id = id.toLowerCase();
                    if (responseData[0].document_status.toUpperCase() == "APPROVED") {
                        $(".doc_kycStatus").css({"color": "green"});
                        $("#" + doc_id + "_doc_status").css({"background": "#28a745", "border-color": "#28a745"});
                        $("#" + doc_id + "_doc_status").html(`<span class='doc_status_span_text' style="color:white;">Approved</span>`);
                    } else {
                        $(".doc_kycStatus").css({"color": "#ffc107"});
                        $("#" + doc_id + "_doc_status").html(`<span class='doc_status_span_text' style="color:black;">Pending</span>`);
                        $("#" + doc_id + "_doc_status").css({"background": "#ffc107", "border-color": "#ffc107"});
                    }
                    if (responseArr.data['kyc_status'].toUpperCase() == "APPROVED") {
                        $("#kyc-img-update-btn").hide();
                        if (id.toUpperCase() == "PAN_CARD") {
                            $("#pancard_input_button").hide();
                        } else {
                            $("#idcard_button_div").hide();
                            if (document_verify == "MANUAL") {
                                $("#adhar_card_back_image_div").show();
                            }
                        }
                    } else if (id.toUpperCase() == "AADHAR_CARD_FRONT" && responseArr.data['kyc_status'].toUpperCase() != "APPROVED") {
                        $("#idcard_button_div").hide();
                        if (document_verify == "MANUAL") {
                            $("#adhar_card_back_image_div").show();
                        }
                    } else if (id.toUpperCase() == "PAN_CARD" && responseArr.data['kyc_status'].toUpperCase() == "PENDING") {
                        $("#pancard_input_button").hide();
                    }
//                    else {
//                        $(".kycStatus").css({"color": "#ffc107"});
//                    }
                    getIDcardData(responseData[0].document_number, responseData[0].document_status, id);
                } else {
                    if (id.toUpperCase() == "PAN_CARD") {
                        $('#kyc-uploaded-images_pan').attr("src", "./app.static/img/icon-kyc-docid-upload.png");
                    } else {
                        $('#kyc-uploaded-images').attr("src", "./app.static/img/icon-kyc-docid-upload.png");
                    }
                }
            } else {
                if (id.toUpperCase() == "PAN_CARD") {
                    $('#kyc-uploaded-images_pan').attr("src", "./app.static/img/icon-kyc-docid-upload.png");
                } else {
                    $('#kyc-uploaded-images').attr("src", "./app.static/img/icon-kyc-docid-upload.png");
                }
                /**********Add Condition when status error in **************/
                if (id.toUpperCase() == "AADHAR_CARD_FRONT") {
                    if (document_verify == "MANUAL") {
                        $("#adhar_card_back_image_div").hide();
                    }
                }
            }
            if (onloadKyc) {
                onloadKyc = false;
                uploadAdhar();
                getKycData('AADHAR_CARD_BACK');
            }
        });
    } catch (err) {
        $('#kyc-uploaded-images').attr("src", "");
    }
}

/********************Create New Function Regarding New Suggestion*****************/
function readPanURL(input) {
    $("#kyc-uploaded-images_pan").attr("src", "");
    if ((input.files[0].size / 1024) > 1024) {
        successErrorAlert("error", "", "File size should be less than or equal 1 MB");
        $("#kyc-images_pan").attr("src", "");
        $("#kyc-uploaded-images_pan").attr("src", "");
        $("#kyc-images_pan").val('');
        $("#kyc-uploaded-images_pan").val('');
        $('#kyc-images-name_pan').text('No file choosen');

        return false;
    }
    let ext = (input.files[0].name).substr((input.files[0].name).lastIndexOf(".") + 1).toLowerCase();
    if (ext == "png" || ext == "jpg" || ext == "jpeg") {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#kyc-uploaded-images_pan').attr('src', e.target.result);
                $('#kyc-image-name_pan').val(input.files[0].name);
                $('#kyc-images-name_pan').text(input.files[0].name);
            };
            reader.readAsDataURL(input.files[0]);
//            $('#img').show();
        }
    } else {
        successErrorAlert("error", "", ext + " File Extension Not Allowed");
        $("#kyc-images_pan").attr("src", "");
        $("#kyc-uploaded-images_pan").attr("src", "");
        $("#kyc-images_pan").val('');
        $("#kyc-uploaded-images_pan").val('');
        $('#kyc-images-name_pan').text('No file choosen');
        return false;
    }
}
function pan_commonModal(id, inputId, type) {
    $('#kyc-image-type_pan').val("");
    kycDocumentId = '';
    docType = '';
    var param = {'document_type': id, 'custcode': user.custcode};
    //    console.log(param);
    loadData('account', 'REQ001', 'KYC_DOCUMENT_VIEW', param, 'COMMON').then(responseArr => {
        console.log(responseArr);
        if (responseArr.status.toUpperCase() == 'SUCCESS') {
            if (responseArr['data']['docsdata'].length > 0) {
                var responseData = responseArr['data']['docsdata'];
                $('#kyc-uploaded-images_pan').attr("src", responseData[0].document_url);
            } else {
                $("#kyc-uploaded-images_pan").attr("src", "./app.static/img/icon-kyc-docid-upload.png");
            }
            if (responseArr.data['kyc_status'].toUpperCase() == "APPROVED" || responseArr.data['kyc_status'].toUpperCase() == "PENDING") {
                $("#kyc-img-update-btn_pan").hide();
                $("#div_image_upload_pan").hide();
                $("#imgAllowed_pan").hide();
//                $("#h4_kyc_status_pan").html('KYC Status :&nbsp;' + responseArr.data['kyc_status'].toUpperCase());
                $("#h4_kyc_status_pan").html('Documnet Status :&nbsp;' + responseArr['data'].docsdata[0]['document_status'].toUpperCase());
                $("#h4_kyc_status_pan").show();
            } else {
                $("#div_image_upload_pan").show();
                $("#imgAllowed_pan").show();
                $("#h4_kyc_status_pan").hide();
            }
        } else if (responseArr.status.toUpperCase() == 'ERROR') {
            $("#kyc-uploaded-images_pan").attr("src", "./app.static/img/icon-kyc-docid-upload.png");
            $("#kyc-image-name_pan").val("");
            $("#kyc-images-name_pan").text("");
            $("#kyc-images_pan").val("");
        }
    });
    $('#kyc-image-type_pan').val(id);
    $('#kyc-common-modal-pan').modal("show");
    kycDocumentId = inputId;
    docMessage = "Please Enter Valid Pan Card No.";
}
function pan_uploadImage(id, inputId, type) {
    if (!imageValidation('pan'))
        return false;
    Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ad1b26',
        cancelButtonColor: '#fff',
        confirmButtonText: 'Yes'
    }).then((r) => {
        if (r.value) {
            var kyc_documentData = $('#kyc-uploaded-images_pan').attr('src').replace(/^data:(image|application)\/(png|jpg|pdf|jpeg);base64,/, "");
            var document_number = document_verify == "AUTO" ? '' : $("#pancard_input").val().trim();
            var param = {
                'document_name': $('#kyc-image-name_pan').val(),
                'custcode': user.custcode,
                'document_data': kyc_documentData,
                'document_number': document_number,
                'document_type': $('#kyc-image-type_pan').val()
            };
            console.log(param);
            //            return false;
            loadData('account', 'REQ001', 'KYC_DOCUMENT_UPLOAD', param, 'COMMON').then(responseArr => {
                console.log(responseArr);
                if (responseArr.status.toUpperCase() == 'SUCCESS') {
                    uploadDocumentNumber = responseArr.document_number;
                    successErrorAlert("success", "", responseArr.message);
//                    getIDcardData(uploadDocumentNumber);
                    if (document_verify == "MANUAL") {
                        $("#pancard_input_button").hide();
                    }
                    $('#kyc-img-pan-cancel-btn').click();
                    getKycData('PAN_CARD');
                    getKycStatusData();
                } else if (responseArr.status.toUpperCase() == 'ERROR') {
                    if (document_verify == "MANUAL") {
//                            $("#pancard_input_button").hide();
                    }
                    $('#kyc-img-pan-cancel-btn').click();
                    successErrorAlert("error", "", responseArr.message);
                }
            });
        }
    });
}
