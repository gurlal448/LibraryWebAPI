$(document).ready(function () {
    $("#btn").click(function () {
        resetFormInput();
        $("#details").slideToggle();
    });
});

// Load Issue Data From Web API in Table
function loadTableData() {
    // Prepare AJAX request for collecting data of Book Issue
    $.ajax({
        type: "GET",
        url: 'api/Issues',
        cache: false,
        success: function (data) {
            const tableBody = $("#tableBody");

            // Clear Previous Content of Table Body
            $(tableBody).empty();

            // If There is No Data
            if (data.length == 0) { 
                const tr = $("<tr></tr>")
                    .append('<td colspan="6" align="center">No Book Issue Details</td>');
                // Add table row in table body
                tr.appendTo(tableBody);
            } else {
                // Iterate all JSON data
                $.each(data, function (key, item) {
                    // prepare a row with table column with data 
                    const tr = $("<tr></tr>")
                        .append($("<td></td>").text(item.bookName))
                        .append($("<td></td>").text(item.studentID))
                        .append($("<td></td>").text(item.issueStatus))
                        .append($("<td></td>").text(item.issueDate))
                        .append($("<td></td>").append('<button class="btn btn-secondary">Edit Record</button>')
                            .on("click", function () {
                                // Call get Issue Details For Edit
                                fetchIssueDetails(item.issueID);
                            })
                        )
                        .append($("<td></td>").append('<button class="btn btn-warning">Delete Record</button>')
                            .on("click", function () {
                                // Call Web API for Remove the Issue Details
                                deleteBookIssue(item.issueID);
                            })
                        );
                    // Add The table row at the end of table body
                    tr.appendTo(tableBody)
                });
            }
        }
    });
}


// Reset Form Input to Original State
function resetFormInput() {
    $('#bookname').val("The Java Programming Language");
    $('#studentid').val("0");
    $('#issuedate').val("");
    $('#issuestatus').val("Issued");
    $("#issueid").val("");
}

// Fetch Book Issue Details using Web API
function fetchIssueDetails(issueid) {
    $.ajax({
        type: "GET",
        url: 'api/Issues/' + issueid,
        contentType: "application/json"
    }).done(function (record) {
        // Set Value of Record to Form Input
        $('#bookname').val(record.bookName);
        $('#studentid').val(record.studentID);
        $('#issuedate').val(record.issueDate);
        $('#issuestatus').val(record.issueStatus);
        $("#issueid").val(record.issueID);
        $("#details").slideToggle();
    });
}

// Call Web API to delete Book Issue Details
function deleteBookIssue(issueid) {
    // Display a Confirm Box to ensure the user decision
    let result = confirm("Sure to Remove this Book Issue Details?");

    if (result) {
        // Request Web API to Delete Sale
        $.ajax({
            type: "DELETE",
            url: 'api/Issues/' + issueid,
        }).done(function (response) {
            // Refresh Sale Details
            loadTableData();
        });
    }
}

// This function used to save Sale or Update Book Issue Details
function saveOrUpdateDetails() {
    // Collect Form Input Data into variable
    let bookname1 = $('#bookname').val();
    let studentid1 = parseInt($('#studentid').val());
    let issuedate1 = $('#issuedate').val();
    let issuestatus1 = $("#issuestatus").val();

    // Collect Issue ID 
    let issueid = $("#issueid").val();
    let updateForm = false;

    if (issueid != "") {
        updateForm = true;
        issueid = parseInt(issueid)
    }

    // Save Details in Book Issue in JSON Form
    let issueData = {
        bookname: bookname1,
        studentid: studentid1,
        issuedate: issuedate1,
        issuestatus: issuestatus1
    };

    let requestType = "POST";
    let urlAddress = 'api/Issues'
    if (updateForm) {
        issueData['issueid'] = issueid;
        requestType = "PUT";
        urlAddress = 'api/Issues/' + issueid;
    }

    // Request the Web API for Insertion
    $.ajax({
        type: requestType,
        url: urlAddress,
        data: JSON.stringify(issueData),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        // Display Insert or Update Message
        let message = "Book Issue Details are Saved in System";
        if (updateForm) {
            message = "Book Issue Details are Updated in System";
        }
        alert(message);
        $("#details").slideToggle();
        resetFormInput();

        loadTableData();
    }).fail(function (xhr, status) {
        // Error Message
        alert("Book Issue Details are not Saved in System")

        $("#details").slideToggle();
        resetFormInput();
    });
}