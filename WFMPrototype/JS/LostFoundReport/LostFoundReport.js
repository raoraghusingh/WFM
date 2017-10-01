$.validator.setDefaults({
    submitHandler: function () {
        LoadLostFound();

    }
});



$(document).ready(function () {

    $("#LostFoundreportform").validate({
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
    $('#LostFoundreportform')[0].reset();

}
function LoadLostFound() {
    $.ajax({
        type: "GET",
        url: "LostFoundReport/LostFoundList",
        data: "",
        cache: false,
        success: function (data) {

            $('#tbllostfoundreport').DataTable().destroy();
            $("#tbllostfoundreport tbody").empty();

            var tabledatabody = '';
            $.each(data, function (index, value) {
                tabledatabody += '<tr>';

                tabledatabody += ' <td>' + value.companyname + '</td>';
                tabledatabody += ' <td>' + value.WorkerName + '</td>';
                tabledatabody += ' <td>' + value.itemname + '</td>';
                tabledatabody += ' <td>' + value.comments + '</td>';
                tabledatabody += ' <td>' + value.date + '</td>';              
                tabledatabody += ' </tr>';
            });
            $("#tbllostfoundreport tbody").append(tabledatabody);
            $.fn.dataTable.ext.errMode = 'none';
            $('#tbllostfoundreport').DataTable({
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


