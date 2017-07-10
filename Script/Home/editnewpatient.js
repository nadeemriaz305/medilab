$(document).ready(function () {
    $("#patientphone").blur(function () {
        //alert("aya");
        var t = $("#patientphone").val();
        if (t == "") {
            $("#patient_phone_error").text("Enter Patient's Phone Number");
            $("#patient_phone_error").show("");
        }
    });
    $("#patientphone").focus(function () {
        //alert("aya");
        $("#patient_phone_error").hide("");
    });
    $("#patientname").focus(function () {
       // alert("aya");
        $("#patient_name_error").hide();
    });
    $("#patientname").blur(function () {
        //alert("aya");
        var t = $("#patientname").val();
        if (t == "") {
            $("#patient_name_error").text("Patient's Name is required");
            $("#patient_name_error").show("");
        }
    });
    $("#patientage").focus(function () {
        //alert("aya");
        $("#patient_age_error").hide("");
    });
    $("#patientage").blur(function () {
        //alert("aya");
        var t = $("#patientage").val();
        if (t == "") {
            $("#patient_age_error").text("Patient's Age is required");
            $("#patient_age_error").show("");
        }
    });
    $("#test_name").keyup(function () {
        var testname = $("#test_name").val();
        var patient_id = $("#p_patient_Id").val();

        $.getJSON("/Home/getPatientSpecificTests?testname=" + testname + "&patient_id=" + patient_id, function (data) {
            var len = data.length;
            var contentData = '';
            for (var i = 0; i < len; i++) {
                contentData += "<tr><td>" + (i + 1) + "</td><td>" + data[i].test_name + "</td><td>" + data[i].test_rate + "</td><td><a href='editpatienttests?testid=@s.patient_test_id' ><span class='input-group-addon material-icons'>delete</span></a></td><td><a href='addnewpatienttests?patient_id=@Model.p.patient_Id&patient_name=@Model.p.patient_name' ><span class='input-group-addon material-icons'>add</span></a></td></tr>";
            }
            $("#tbody").html(contentData);
        });
    });
});
