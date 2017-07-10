$(document).ready(function () {
    $("#username_error").hide();
    $("#color_error").hide();
    $("#result").hide();

    $("#username").focus(function () {
        $("#username_error").hide();
    });
    $("#color").focus(function () {
        $("#color_error").hide();
    });
    $("#submit_btn").click(function () {
        var username = $("#username").val();
        var color = $("#color").val();
        if (username == "") {
            $("#username_error").text("Username is required.");
            $("#username_error").css("color", "red");
            $("#username_error").show();
            return;
        }
        if (color == "") {
            $("#color_error").text("Favourite Color is required.");
            $("#color_error").css("color", "red");
            $("#color_error").show();
            return;
        }

        $.getJSON("/Account/confirmRecovery?username=" + username + "&color=" + color, function (data) {
            if (data) {
                $("#result").css("color", "purple");
                $("#result").text("Redirecting...");
                $("#result").show();
                window.location.href = "/Account/updatePassword?username="+username;
            }
            else {
                $("#result").text("Username or Color is Incorrect.");
                $("#result").css("color", "red");
                $("#result").show();
            }

        });
    });

});
