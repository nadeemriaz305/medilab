$(document).ready(function () {
    $("#testname_error").hide();
    $("#testrate_error").hide();
    $("#result").hide();

    $("#submit").click(function () {
        $("#result").hide();
        var testname = $("#testname").val();
        var testrate = $("#testrate").val();
        
        if (testname == "") {
            $("#testname_error").text("Test Name is required.");
            $("#testname_error").css("color", "red");
            $("#testname_error").show();
            return;
        }
        if (testrate == "") {
            $("#testrate_error").text("Test Rate is required.");
            $("#testrate_error").css("color", "red");
            $("#testrate_error").show();
            return;
        }
        if (!$.isNumeric(testrate)) {
            $("#testrate_error").text("Test Rate Should be Numeric");
            $("#testrate_error").css("color", "red");
            $("#testrate_error").show();
            return;
        }
        $.getJSON("/Admin/testAlreadyExist?testname=" + testname, function (data) {
            if (data) {
                $("#testname_error").show();
                $("#testname_error").text("Test Name Already Exist.");
                $("#testname_error").css("color", "red");
            }
            else {
                $("#testname_error").text("");
                $("#testname_error").hide();
                $.getJSON("/Admin/Add_Test?testname=" + testname + "&testrate=" + testrate, function (data) {
                    if (data) {
                        $("#result").text("Successfully Added.");
                        $("#result").css("color", "purple");
                        $("#result").show();
                    }
                    else {
                        $("#result").text("Some Problem Occur.");
                        $("#result").css("color", "red");
                        $("#result").show();
                    }
                });
            }
        });
        
    });
    $("#testname").blur(function () {
        $("#result").hide();
        $("#testname_error").text("");
        $("#testname_error").hide();
        var testname = $("#testname").val();

        if (testname == "") {
            $("#testname_error").text("Test Name is required.");
            $("#testname_error").css("color", "red");
            $("#testname_error").show();
            return;
        }

        $.getJSON("/Admin/testAlreadyExist?testname=" + testname, function (data) {
            if (data) {
                $("#testname_error").show();
                $("#testname_error").text("Test Name Already Exist.");
                $("#testname_error").css("color", "red");
            }
            else {
                $("#testname_error").text("");
                $("#testname_error").hide();
            }
        });
    });
    $("#testname").focus(function () {
        $("#result").hide();
        $("#testname_error").text("");
        $("#testname_error").hide();
    });
    $("#testrate").focus(function () {
        $("#result").hide();
        $("#testrate_error").text("");
        $("#testrate_error").hide();
    });
});
