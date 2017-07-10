$(document).ready(function () {
    $("#result").hide();

    $("#submit_btn").click(function () {
        var name = $("#testname").val();
        var emailfrom = $("#email").val();
        var subject = $("#subject").val();
        var message = $("#message").val();

        $.getJSON("/Account/sendEmail?name=" + name + "&emailfrom=" + emailfrom + "&subject=" + subject + "&message=" + message, function (data) {
            if (data) {
                $("#result").text("ok");
                $("#result").show();
            }
            else {
                $("#result").text("Not ok");
                $("#result").show();
            }
        });
    });

});
