$.validator.setDefaults({
    submitHandler: function () {
        debugger;
       
        var assignsupervisordetails = {};
        assignsupervisordetails.AssignSupervisorID = $("#hdnassignsupervisor").val();
        assignsupervisordetails.CompanyID = $("#ddlcompanyname").val();
        assignsupervisordetails.SupervisorName = $("#ddlsupervisor").val();
        assignsupervisordetails.ShiftName = $("#ddlshift").val();
        
        
        

        $.ajax({
            type: "POST",
            url: "AssignSupervisor/AssignNewSupervisor",
            data: assignsupervisordetails,
            cache: false,
            success: function (data) {

                if (data == 1) {
                    $("#spantext").text("Create Assign Supervisor");
                    $('#assignsupervisorform')[0].reset();
                    $("#hdnassignsupervisor").val(0);
                    BindAssignSupervisor();
                    $.alert({
                        title: '',
                        content: 'Assign Supervisor saved successfully!',
                        type: 'green',
                    });
                }
                else if (data == 2) {
                    $.alert({
                        title: '',
                        content: 'Assign Supervisor already exist!',
                        type: 'red',
                    });
                }
                else if (data == 3) {
                    $.alert({
                        title: '',
                        content: 'Checklist details updated successfully!',
                        type: 'green',
                    });
                }
                else {
                    $.alert({
                        title: '',
                        content: 'Some thing went wrong. please try after sometime!',
                        type: 'red',
                    });
                }
            }
        });
    }
});


$(document).ready(function () {
    $("#spantext").text("Assign Supervisor");
    LoadCompany();
    LoadSupervisor();
    LoadShift();
    BindAssignSupervisor();
    
    // page validaton using jquery
    $("#assignsupervisorform").validate({
        rules: {
            ddlcompanyname: "required",
            ddlsupervisor: "required",
            ddlshift:"required",

        },
        messages: {
            ddlcompanyname: "Please select company name",
            ddlsupervisor: "Please select supervisor Name",
            ddlshift: "Please select shift name",
            

        }
    });

    //end
});

function resetalldata()
{
    $("#spantext").text("Create Assign Supervisor");
    $("#hdnassignsupervisor").val(0);
}
function LoadCompany() {
    $.ajax({
        type: "GET",
        url: "Company/CompanyList",
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
        }
    });
}
function LoadSupervisor() {
    $.ajax({
        type: "GET",
        url: "Supervisor/SupervisorList",
        data: "",
        cache: false,
        success: function (data) {

            $("#ddlsupervisor").html("");
            $('#ddlsupervisor').append($('<option>', {
                value: "",
                text: "Select Supervisor"
            }));
            $.each(data, function (i, value) {

                $('#ddlsupervisor').append($('<option>', {
                    value: value.SupervisorID,
                    text: value.FirstName + " " + value.MiddleName + " " + value.LastName
                }));
            })
        }
    });
}
function LoadShift() {
    $.ajax({
        type: "GET",
        url: "AssignSupervisor/loadshift",
        data: "",
        cache: false,
        success: function (data) {

            $("#ddlshift").html("");
            $('#ddlshift').append($('<option>', {
                value: "",
                text: "Select Shift"
            }));
            $.each(data, function (i, value) {

                $('#ddlshift').append($('<option>', {
                    value: value.ShiftID,
                    text: value.ShiftName + " ( " + value.StartTime + " ||  " + value.EndTime+")"
                }));
            })
        }
    });
}

function BindAssignSupervisor() {
    $.ajax({
        type: "GET",
        url: "AssignSupervisor/AssignSupervisorList",
        data: "",
        cache: false,
        success: function (data) {

            debugger;
            $('#tblassignsupervisor').DataTable().destroy();
            $("#tblassignsupervisor tbody").empty();

            var tabledatabody = '';
           
            $.each(data, function (index, value) {
            
                    tabledatabody += '<tr>';
                    tabledatabody += ' <td>' + value.Supervisorname + '</td>';
                    tabledatabody += ' <td>' + value.Companyname + '</td>';
                    tabledatabody += ' <td>' + value.Shiftname + '</td>';
                    tabledatabody += ' <td><a href="javascript:void(0);" onclick=EditAssignSupervisor(' + value.AssignSupervisorID + ')> <i class="glyphicon glyphicon-edit"></i></a></td>';
                    tabledatabody += ' <td><a href="javascript:void(0);" onclick=RemoveCompany(' + value.AssignSupervisorID + ')><i class="glyphicon glyphicon-remove-sign"></i></a></td>';
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
                //columnDefs: [{
                //    className: 'control',
                //    orderable: false,
                //    targets: -2
                //}]
                responsive: true
            });

        }
    });
}

function EditAssignSupervisor(id) {
    
    $('#addcompany').trigger('click');
    $("#spantext").text("Edit Assign Supervisor");
    $.ajax({
        type: "GET",
        url: "AssignSupervisor/Getdetialsbyid",
        data: { assignsupervisorid:id },
        cache: false,
        success: function (data) {
            $("#hdnassignsupervisor").val(data.AssignSupervisorID);
            $("#ddlcompanyname").val(data.CompanyID);
            $("#ddlsupervisor").val(data.SupervisorName);
            $("#ddlshift").val(data.ShiftName);
            
        }
    });
}