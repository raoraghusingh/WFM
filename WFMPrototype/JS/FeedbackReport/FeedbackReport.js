$.validator.setDefaults({
    submitHandler: function () {
        LoadAllFeedback();

    }
});



$(document).ready(function () {

    $("#feedbackreportform").validate({
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
    $('#feedbackreportform')[0].reset();

}
function LoadAllFeedback() {



    $.ajax({
        type: "GET",
        url: "FeedbackReport/AllFeedback",
        data: "",
        cache: false,
        success: function (data) {

            $('#tblfeedbackreport').DataTable().destroy();
            $("#tblfeedbackreport tbody").empty();

            var tabledatabody = '';
            $.each(data, function (index, value) {

                tabledatabody += '<tr>';
           
                tabledatabody += ' <td>' + value.CompanyName + '</td>';
                tabledatabody += ' <td>' + value.Name + '</td>';
                tabledatabody += ' <td>' + value.Mobile + '</td>';
                tabledatabody += ' <td>' + value.Email + '</td>';       
                tabledatabody += ' <td>' + value.Ccomments + '</td>';       

                tabledatabody += ' </tr>';

            });


            $("#tblfeedbackreport tbody").append(tabledatabody);
            $.fn.dataTable.ext.errMode = 'none';

            $('#tblfeedbackreport').DataTable({
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
        url: "FeedbackReport/CompanyList",
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


