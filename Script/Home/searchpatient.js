$(document).ready(function () {
    $("#patient_name").keyup(function () {
        var testname = $("#patient_name").val();
        $.getJSON("/Home/getPatient?patient_name=" + testname, function (data) {
            var len = data.length;
            var contentData = '';
            for (var i = 0; i < len; i++) {
                contentData += "<tr><td>" + data[i].patient_Id + "</td><td>" + data[i].patient_name + "</td><td>" + data[i].patient_gender + "</td><td>" + data[i].patient_age + "</td><td>" + data[i].patient_phone + "</td><td><a href='editnewpatient/"+data[i].patient_Id+"' ><span class='input-group-addon material-icons'>edit</span></a></td></tr>";
            }
            $("#tbody").html(contentData);
        }); 
    });
});
