$(document).ready(function () {
    $("#testid_error").hide();
    $("#testname_error").hide();
    $("#testrate_error").hide();
    $("#result").hide();

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
                $("#testname").prop("readonly", false);
                $("#testname").val(data.test_name);
                $("#testrate").val(data.test_rate);
                $("#testrate").prop("readonly", false);
             } else {
                 $("#testid_error").text("No such Test Found.");
                 $("#testid_error").show();
            }
        });
    });
    $("#submit").click(function () {
        var testid = $("#testid").val();
        var testname = $("#testname").val();
        var testrate = $("#testrate").val();
        if (testid == "" || testname == "" || testrate == "") {
            $("#testid_error").text("Test ID or some information is missing.");
            $("#testid_error").css("color", "red");
            $("#testid_error").show();
            return;
        }
        $.getJSON("/Admin/testAlreadyExist?testid="+testid+"&testname=" + testname, function (data) {
            if (data) {
                $("#testname_error").show();
                $("#testname_error").text("Test Name Already Exist.");
                $("#testname_error").css("color", "red");
            }
            else {
                $("#testname_error").text("");
                $("#testname_error").hide();
                $.getJSON("/Admin/updateTest?testid= "+testid+"&testname=" + testname + "&testrate=" + testrate, function (data) {
                    if (data) {
                        $("#result").text("Successfully Update.");
                        $("#result").css("color", "purple");
                        $("#result").show();
                        var testname = "";
                        $.getJSON("/Admin/Edit_Test?testname=" + testname, function (data) {
                            var len = data.length;
                            var contentData = '';
                            for (var i = 0; i < len; i++) {
                                contentData += "<tr><td>" + data[i].test_id + "</td><td>" + data[i].test_name + "</td><td>" + data[i].test_rate + "</td></tr>";
                            }
                            $("#tbody").html(contentData);
                        });
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

    $("#testid").focus(function () {
        $("#result").hide();
        $("#testid_error").text("");
        $("#testid_error").hide();

        $("#testrate_error").text("");
        $("#testrate_error").hide();

        $("#testname_error").text("");
        $("#testname_error").hide();


    });

    $("#testname").blur(function () {
        $("#result").hide();
        
        var testname = $("#testname").val();
        if (testname == "") {
            $("#testname_error").text("Test Name is required");
            $("#testname_error").css("color", "red");
            $("#testname_error").show();
        }
    });
    $("#testrate").blur(function () {
        $("#result").hide();

        var testname = $("#testrate").val();
        if (testname == "") {
            $("#testrate_error").text("Test rate is required");
            $("#testrate_error").css("color", "red");
            $("#testrate_error").show();
        }
    });

    $("#testid").keyup(function () {
        $("#result").hide();
        $("#testid_error").text("");
        $("#testid_error").hide();

        $("#testname").val("");
        $("#testrate").val("");
        $("#testname").prop("readonly", true);
        $("#testrate").prop("readonly", true);
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
