


$(document).ready(function () {

    BindAssignSupervisor();


});




function BindAssignSupervisor() {
    $.ajax({
        type: "GET",
        url: "AssignSupervisorReport/AssignSupervisorList",
        data: "",
        cache: false,
        success: function (data) {

       
            $('#tblassignsupervisor').DataTable().destroy();
            $("#tblassignsupervisor tbody").empty();

            var tabledatabody = '';

            $.each(data, function (index, value) {

                tabledatabody += '<tr>';
                tabledatabody += ' <td>' + value.Supervisorname + '</td>';
                tabledatabody += ' <td>' + value.Companyname + '</td>';
                tabledatabody += ' <td>' + value.Shiftname + '</td>';
               
                tabledatabody += ' </tr>';
            });
            $("#tblassignsupervisor tbody").append(tabledatabody);
            $.fn.dataTable.ext.errMode = 'none';
            $('#tblassignsupervisor').DataTable({
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




