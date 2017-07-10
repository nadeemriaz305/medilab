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
                $("#testname").val(data.test_name);
                $("#testrate").val(data.test_rate);
             } else {
                 $("#testid_error").text("No such Test Found.");
                 $("#testid_error").css("color", "red");
                 $("#testid_error").show();
            }
        });
    });
    $("#submit").click(function () {
        var testid = $("#testid").val();
        if (testid == "") {
            $("#testid_error").text("Test ID is required.");
            $("#testid_error").css("color", "red");
            $("#testid_error").show();
            return;
        }

        var testname = $("#testname").val();
        var testrate = $("#testrate").val();
        if (testname == "" || testrate == "") {
            $("#testid_error").text("No such Test Exist.");
            $("#testid_error").css("color", "red");
            $("#testid_error").show();
        }
        $.getJSON("/Admin/deleteTest?testid="+testid, function (data) {
            if (data) {
                $("#result").text("Successfully Deleted.");
                $("#result").css("color", "purple");
                $("#result").show();

                $("#testname").val("");
                $("#testrate").val("");

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

    $("#testid").keyup(function () {
        $("#result").hide();
        $("#testid_error").text("");
        $("#testid_error").hide();

        $("#testname").val("");
        $("#testrate").val("");
        $("#testname").prop("readonly", true);
        $("#testrate").prop("readonly", true);
    });
});
