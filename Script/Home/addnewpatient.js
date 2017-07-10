$(document).ready(function () {
    $("#patientphone").focus(function () {
        //alert("aya");
        $("#patient_phone_error").hide("");
    });
    $("#patientname").focus(function () {
       // alert("aya");
        $("#patient_name_error").hide();
    });
    $("#patientage").focus(function () {
        //alert("aya");
        $("#patient_age_error").hide("");
    });

});
