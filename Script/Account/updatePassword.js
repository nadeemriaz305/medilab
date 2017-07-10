$(document).ready(function () {
    $("#password_error").hide();
    $("#c_password_error").hide();
    $("#result").hide();
    $("#password").focus(function () {
        $("#password_error").hide();
    });
    $("#c_password").focus(function () {
        $("#c_password_error").hide();
    });
    $("#submit_btn").click(function () {
        var password = $("#password").val();
        var c_password = $("#c_password").val();
        var username = $("#username").val();

        if (password == "") {
            $("#password_error").text("New Password is required.");
            $("#password_error").css("color", "red");
            $("#password_error").show();
            return;
        }
        if (c_password == "") {
            $("#c_password_error").text("Confirm Password is required.");
            $("#c_password_error").css("color", "red");
            $("#c_password_error").show();
            return;
        }
        if (password != c_password) {
            $("#c_password_error").text("Both Passwords should match.");
            $("#c_password_error").css("color", "red");
            $("#c_password_error").show();
            return;
        }
        if (username == "") {
            $("#result").text("Username is missing");
            $("#result").show();
            return;
        }

        $.getJSON("/Account/updatePasswrd?username=" + username + "&pwd=" + password, function (data) {
            if (data) {
                $("#result").css("color", "purple");
                $("#result").text("Redirecting...");
                $("#result").show();
                window.location.href = "/Home/Dashboard";
            }
            else {
                $("#result").text("Cannot update Password.");
                $("#result").css("color", "red");
                $("#result").show();
            }
        });
    });

});
