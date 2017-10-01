$.validator.setDefaults({
    submitHandler: function () {
        LoadSupervisors();

    }
});



$(document).ready(function () {

    $("#supervisorworkerreportform").validate({
        rules: {
          
          
            ddlcompanyname: "required",
            ddlusertype: "required",

        },
        messages: {         
            ddlcompanyname: "Please select company name",
            ddlusertype: "Please Select user type",

        }
    });


    BindCompany();


});

function Cancel() {
    $('#supervisorworkerreportform')[0].reset();

}
function LoadSupervisors() {
    $.ajax({
        type: "GET",
        url: "SupervisorWorkerReport/SupervisorWorkerList",
        data: {UserType:$('#ddlusertype').val()},
        cache: false,
        success: function (data) {

            $('#tblsupervisorworkerreport').DataTable().destroy();
            $("#tblsupervisorworkerreport tbody").empty();

            var tabledatabody = '';
            $.each(data, function (index, value) {
                tabledatabody += '<tr>';

                tabledatabody += ' <td>' + value.FirstName + '</td>';
                tabledatabody += ' <td>' + value.MiddleName + '</td>';
                tabledatabody += ' <td>' + value.LastName + '</td>';               
                tabledatabody += ' <td>' + value.FatherName + '</td>';            
                tabledatabody += ' <td>' + value.EmailID + '</td>';      
                tabledatabody += ' <td>' + value.Mobile + '</td>';
                tabledatabody += ' <td>' + value.Gender + '</td>';
                tabledatabody += ' <td>' + value.State + '</td>';
                tabledatabody += ' <td>' + value.City + '</td>';
                tabledatabody += ' <td>' + value.ParmanentAddress + '</td>';
                tabledatabody += ' <td>' + value.CurrentAddress + '</td>';
                tabledatabody += ' <td>' + value.IDProof + '</td>';              
                tabledatabody += ' </tr>';
            });
            $("#tblsupervisorworkerreport tbody").append(tabledatabody);
            $.fn.dataTable.ext.errMode = 'none';
            $('#tblsupervisorworkerreport').DataTable({
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
        url: "SupervisorWorkerReport/CompanyList",
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


