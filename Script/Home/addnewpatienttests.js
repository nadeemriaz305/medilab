
$(document).ready(function () {
    $("#testid_error").hide();
    $("#result").hide();

    //For Filling Patient Tests if already have :
    var patient_id = $("#patient_id").val();
    $.getJSON("/Home/getPatientTests?patient_id=" + patient_id, function (data) {
        var len = data.length;
        var contentData = '';
        for (var i = 0; i < len; i++) {
            contentData += "<tr><td>" + (i+1) + "</td><td>" + data[i].test_name + "</td><td>" + data[i].test_rate + "</td></tr>";
        }
        $("#tbody1").html(contentData);
    });
    //*****************************************
    $("#test_name").keyup(function () {
        var testname = $("#test_name").val();
        $.getJSON("/Admin/Edit_Test?testname=" + testname, function (data) {
            var len = data.length;
            var contentData = '';
            for (var i = 0; i < len; i++) {
                contentData += "<tr><td>" + data[i].test_id + "</td><td>" + data[i].test_name + "</td><td>" + data[i].test_rate + "</td></tr>";
            }
            $("#tbody").html(contentData);
        }); 
    });

    $("#testid").blur(function () {
        var testid = $("#testid").val();
        if (testid == "") {
            $("#testid_error").text("Test ID is required.");
            $("#testid_error").css("color", "red");
            $("#testid_error").show();
            return;
        }
        $.getJSON("/Admin/specificTest?testid=" + testid, function (data) {
            if (data != false) {
                $("#testname").val(data.test_name);
                $("#testrate").val(data.test_rate);
             } else {
                 $("#testid_error").text("No such Test Found.");
                 $("#testid_error").show();
            }
        });
    });

    $("#submit").click(function () {
        var testid = $("#testid").val();
        var patient_id = $("#patient_id").val();
        if (patient_id == "") {
            alert("Url does not contain patient ID.");
            return;
        }
        if (testid == "") {
            $("#testid_error").text("Test ID is missing.");
            $("#testid_error").css("color", "red");
            $("#testid_error").show();
            return;
        }
        $.getJSON("/Home/addTestForPatient?testid=" + testid + "&patient_id=" + patient_id, function (data) {
            if (data) {
                $("#result").text("Successfully Added.");
                $("#result").css("color", "purple");
                $("#result").show();

                $("#testid").val("");
                $("#testname").val("");
                $("#testrate").val("");

                $.getJSON("/Home/getPatientTests?patient_id=" + patient_id, function (data) {
                    var len = data.length;
                    var contentData = '';
                    for (var i = 0; i < len; i++) {
                        contentData += "<tr><td>" + (i+1) + "</td><td>" + data[i].test_name + "</td><td>" + data[i].test_rate + "</td></tr>";
                    }
                    $("#tbody1").html(contentData);
                });
            }
            else {
                $("#result").text("Some Problem Occur.");
                $("#result").css("color", "red");
                $("#result").show();
            }
        });
    });

    $("#testid").focus(function () {
        $("#result").hide();
        $("#testid_error").text("");
        $("#testid_error").hide();
    });

    $("#testid").keyup(function () {
        $("#result").hide();
        $("#testid_error").text("");
        $("#testid_error").hide();

        $("#testname").val("");
        $("#testrate").val("");
    });
});
