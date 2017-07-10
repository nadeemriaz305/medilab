$(document).ready(function () {
    $("#name_error").hide();
    $("#username_error").hide();
    $("#password_error").hide();
    $("#password_error").hide();
    $("#c_password_error").hide();

    $("#submit").click(function () {
        var name = $("#nam").val();
        var username = $("#username").val();
        var passwd = $("#passwd").val();
        var c_passwd = $("#c_passwd").val();
        var admin_passwd = $("#admin_passwd").val();
        var color = $("#favourite").val();

        if (name == "") {
            $("#name_error").text("Name is required.");
            $("#name_error").css("color", "red");
            $("#name_error").show();
            return;
        }
        if (username == "") {
            $("#username_error").text("Username is required.");
            $("#username_error").css("color", "red");
            $("#username_error").show();
            return;
        }
        if (passwd == "") {
            $("#password_error").text("Password is required.");
            $("#password_error").css("color", "red");
            $("#password_error").show();
            return;
        }
        if (c_passwd == "") {
            $("#c_password_error").text("Current Password is required.");
            $("#c_password_error").css("color", "red");
            $("#c_password_error").show();
            return;
        }
        if (passwd != c_passwd) {
            $("#c_password_error").text("Both Password Should Match.");
            $("#c_password_error").css("color", "red");
            $("#c_password_error").show();
            return;
        }
        if (admin_passwd == "") {
            $("#admin_password_error").text("Administrator Password is required.");
            $("#admin_password_error").css("color", "red");
            $("#admin_password_error").show();
            return;
        }
        if (color == "") {
            $("#favourite_error").text("Favourite Color is required for password recovery.");
            $("#favourite_error").css("color", "red");
            $("#favourite_error").show();
            return;
        }
        var username = $("#username").val();
        $.getJSON("/Account/ifUsernameAvailable?user=" + username, function (data) {
            if (!data) {
                $("#username_error").text("Username is already occupied.");
                $("#username_error").css("color", "red");
                $("#username_error").show();
            } else {
                $("#username_error").text("");
                $("#username_error").hide();

                $.getJSON("/Account/addAdmin?name=" + name + "&user=" + username + "&pass=" + passwd + "&admin_passwd=" + admin_passwd + "&color="+color, function (data) {
                    if (data == true) {
                        $("#result").text("Admin Added Successfully.");
                        $("#result").css("color", "green");
                        $("#result").show();
                    }
                    else if (data == false) {
                        $("#result").text("Cannot Add Admin. Something is wrong.");
                        $("#result").css("color", "red");
                        $("#result").show();
                    } else {
                        $("#admin_password_error").text(data);
                        $("#admin_password_error").css("color", "red");
                        $("#admin_password_error").show();
                    }
                });
            }
        });
    });

    $("#username").keyup(function () {
        var username = $("#username").val();
        $.getJSON("/Account/ifUsernameAvailable?user=" + username, function (data) {
            if (!data) {
                $("#username_error").text("Username is already occupied.");
                $("#username_error").css("color", "red");
                $("#username_error").show();
            } else {
                $("#username_error").text("");
                $("#username_error").hide();
            }
        });
    });

    $("#username").focus(function () {
        $("#username_error").hide();
        $("#result").hide();
    });
    $("#nam").focus(function () {
        $("#name_error").hide();
        $("#username_error").hide();
        $("#result").hide();
    });
    $("#passwd").focus(function () {
        $("#password_error").hide();
        $("#c_password_error").hide();
        $("#result").hide();
    });
    $("#c_passwd").focus(function () {
        $("#c_password_error").hide();
        $("#result").hide();
    });
    $("#admin_passwd").focus(function () {
        $("#admin_password_error").hide();
        $("#result").hide();
    });
    $("#favourite").focus(function () {
        $("#favourite_error").hide();
        $("#result").hide();
    });

});
