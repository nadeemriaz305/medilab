$(document).ready(function () {
    $("#username_error").hide();
    $("#password_error").hide();
    $("#result").hide();
    $("#username").focus(function () {
        $("#username_error").hide();
    });
    $("#password").focus(function () {
        $("#password_error").hide();
    });
    $("#submit_btn").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        if (username == "") {
            $("#username_error").text("Username is required.");
            $("#username_error").css("color", "red");
            $("#username_error").show();
            return;
        }
        if (password == "") {
            $("#password_error").text("Password is required.");
            $("#password_error").css("color", "red");
            $("#password_error").show();
            return;
        }

        $.getJSON("/Account/authenticateUser?nam=" + username + "&pwd=" + password, function (data) {
            if (data) {
                $("#result").css("color", "purple");
                $("#result").text("Redirecting...");
                $("#result").show();
                window.location.href = "/Home/SearchExistPatient";
            }
            else {
                $("#result").text("Username or Password is Incorrect.");
                $("#result").css("color", "red");
                $("#result").show();
            }
        });
    });

});
