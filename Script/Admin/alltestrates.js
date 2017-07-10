$(document).ready(function () {
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
});
