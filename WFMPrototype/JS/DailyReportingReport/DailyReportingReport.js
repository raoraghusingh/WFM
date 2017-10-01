$.validator.setDefaults({
    submitHandler: function () {
        LoadDailyReporting();

    }
});



$(document).ready(function () {

    $("#dailyreportingreportform").validate({
        rules: {
            txtfromdate: "required",
            txttodate: "required",
            ddlcompanyname: "required",

        },
        messages: {
            txtfromdate: "Please choose from date",
            txttodate: "Please choose to date",
            ddlcompanyname: "Please select company name",


        }
    });

  
    BindCompany();


});

function Cancel() {
    $('#dailyreportingreportform')[0].reset();

}



function LoadDailyReporting() {
    $.ajax({
        type: "GET",
        url: "DailyReportingReport/DailyReportingList",
        data: "",
        cache: false,
        success: function (data) {

            $('#tbldailyreportingreport').DataTable().destroy();
            $("#tbldailyreportingreport tbody").empty();

            var tabledatabody = '';
            $.each(data, function (index, value) {

                tabledatabody += '<tr>';

                tabledatabody += ' <td>' + value.CompanyName + '</td>';
                tabledatabody += ' <td>' + value.WorkerName + '</td>';
                tabledatabody += ' <td>' + value.ShiftName + '</td>';
                tabledatabody += ' <td>' + value.Checklist + '</td>';
                tabledatabody += ' <td>' + value.Date + '</td>';
              
                tabledatabody += ' </tr>';
            });
            $("#tbldailyreportingreport tbody").append(tabledatabody);
            $.fn.dataTable.ext.errMode = 'none';
            $('#tbldailyreportingreport').DataTable({
                responsive: {
                    details: {
                        type: 'column',
                        target: -2
                    }
                },

                responsive: true,
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });

        }
    });
}


function BindCompany() {

    $.ajax({
        type: "GET",
        url: "WorkAssignmentReport/CompanyList",
        data: "",
        cache: false,
        success: function (data) {
            $("#ddlcompanyname").html("");
            $('#ddlcompanyname').append($('<option>', {
                value: "",
                text: "Select company"
            }));
            $.each(data, function (i, value) {
                $('#ddlcompanyname').append($('<option>', {
                    value: value.CompanyID,
                    text: value.CompanyName
                }));
            })
        },
        error: function (error) {
            $.alert({
                title: '',
                content: 'Something went wrong. please try after sometime!',
                type: 'red',

            });
        },
    });
}


