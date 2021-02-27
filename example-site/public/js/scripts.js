function downloadFile(fileName) {
    $("#waiting").show();

    var info = JSON.stringify({ file: fileName, data: $("#excelRoprt").html().trim() });
    // var info = $("#excelRoprt").html().trim();

    var apiAddress = "http://127.0.0.1:8000";
    $.ajax({
        url: apiAddress + "/getFile",
        method: "POST",
        headers: {
            "Content-Type": "text/plain",   // or "application/x-www-form-urlencoded" and "application/json"
        },
        data: info,
        success: function (downloadLink) {
            $("#waiting").hide();
            window.open(apiAddress + downloadLink, "_blank");
        },
        error: function (error) {
            console.log(error);
            $("#waiting").hide();
        }
    });
}

function getExcelFileName() {
    var fileName = prompt("Please enter a file name", "myReport.xls");
    if (fileName != null) {
        if (fileName.indexOf(".xls") == -1) {
            fileName += ".xls";
        }

        downloadFile(fileName);
    }
}



