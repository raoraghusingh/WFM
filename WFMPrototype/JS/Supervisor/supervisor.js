$.validator.setDefaults({
    submitHandler: function () {      
        if ($("#hdnsupervisor").val() == "1") {
            UpdateSupervisor();
        }
        else {
            var supervisordetails = {};         
            supervisordetails.FirstName = $("#txtfirstname").val();
            supervisordetails.MiddleName = $("#txtmiddlename").val();
            supervisordetails.LastName = $("#txtlastname").val();
            supervisordetails.FatherName = $("#txtfathername").val();
            supervisordetails.EmailID = $("#txtemail").val();
            supervisordetails.Password = $("#txtpassword").val();
            supervisordetails.Mobile = $("#txtmobile").val();
            supervisordetails.Gender = $("#ddlgender").val();
            supervisordetails.State = $("#ddlstate").val();
            supervisordetails.City = $("#ddlcity").val();
            supervisordetails.ParmanentAddress = $("#txtparmanentaddress").val();
            supervisordetails.CurrentAddress = $("#txtcurrentaddress").val();
            supervisordetails.IDProof = $("#fuidproof").val();
            $.ajax({
                type: "POST",
                url: "Supervisor/AddSupervisor",
                data: supervisordetails,
                cache: false,
                success: function (data) {

                    if (data == 1) {
                        $.alert({
                            title: '',
                            content: 'Supervisor details saved successfully!',
                            type: 'green',
                        });
                        LoadSupervisors();
                    }
                    else if (data == 2) {
                        $.alert({
                            title: '',
                            content: 'Supervisor email id already exist!',
                            type: 'red',
                        });
                    }
                    else {
                        $.alert({
                            title: '',
                            content: 'Something went wrong. please try after sometime!',
                            type: 'red',
                        });
                    }
                }
            });
        }
    }
});



$(document).ready(function () {
 

    $("#supervisorform").validate({
        rules: {
            txtfirstname: "required",
            txtmiddlename: "required",
            txtlastname: "required",
            txtfathername: "required",
            txtemail: {
                required: true,
                email: true
            },
            txtpassword: "required",
            txtmobile: {
                required: true,
                number: true,
                minlength: 10,
                maxlength: 10

            },
            ddlgender: "required",
            ddlstate: "required",
            ddlcity: "required",
            txtparmanentaddress: "required",
            txtcurrentaddress: "required",
            fuidproof: "required",
        },
        messages: {
            txtfirstname: "Please enter first name",
            txtmiddlename: "Please enter middle name",
            txtlastname: "Please enter last name",
            txtfathername: "Please enter father name",
            txtemail: {
                required: "Please enter email address",
                email: "Please enter valid email address"
            },
            txtpassword: "Please enter password",
            txtmobile: {
                required: "Please enter mobile number",
                number: "Only number allowed",
                minlength: "Mobile length should be 10 digit",
                maxlength: "Mobile length should be 10 digit",
            },
            ddlgender: "Please select gender",
            ddlstate: "Please select state",
            ddlcity: "Please select city",
            txtparmanentaddress: "Please enter parmanent address",
            txtcurrentaddress: "Please enter current address",
            fuidproof: "Please choose id proof",           

        }
    });

    //end
    // page validaton using jquery
    $("#spantext").text("Add Supervisor");
    // load Organization 
    LoadSupervisors();
});

function Cancel() {

    $("#spantext").text("Add Supervisor");
    $('#supervisorform')[0].reset();
    $("#hdnsupervisor").val(0);
    $("#hdnsupervisorID").val(0);
}
function LoadSupervisors() {
    $.ajax({
        type: "GET",
        url: "Supervisor/SupervisorList",
        data: "",
        cache: false,
        success: function (data) {

            $('#tblsupervisor').DataTable().destroy();
            $("#tblsupervisor tbody").empty();

            var tabledatabody = '';
            $.each(data, function (index, value) {
                tabledatabody += '<tr>';

                tabledatabody += ' <td>' + value.FirstName + '</td>';
                tabledatabody += ' <td>' + value.MiddleName + '</td>';
                tabledatabody += ' <td>' + value.LastName + '</td>';
                tabledatabody += ' <td>' + value.FatherName + '</td>';
                tabledatabody += ' <td>' + value.EmailID + '</td>';
                tabledatabody += ' <td>' + value.Password + '</td>';
                tabledatabody += ' <td>' + value.Mobile + '</td>';
                tabledatabody += ' <td>' + value.Gender + '</td>';
                tabledatabody += ' <td>' + value.State + '</td>';
                tabledatabody += ' <td>' + value.City + '</td>';
                tabledatabody += ' <td>' + value.ParmanentAddress + '</td>';
                tabledatabody += ' <td>' + value.CurrentAddress + '</td>';
                tabledatabody += ' <td>' + value.IDProof + '</td>';
                tabledatabody += ' <td><a href="javascript:void(0);" onclick=EditSupervisor(' + value.SupervisorID + ')> <i class="glyphicon glyphicon-edit"></i></a></td>';
                tabledatabody += ' <td><a href="javascript:void(0);" onclick=RemoveSupervisor(' + value.SupervisorID + ')><i class="glyphicon glyphicon-remove-sign"></i></a></td>';
                tabledatabody += ' </tr>';
            });
            $("#tblsupervisor tbody").append(tabledatabody);
            $.fn.dataTable.ext.errMode = 'none';
            $('#tblsupervisor').DataTable({
                responsive: {
                    details: {
                        type: 'column',
                        target: -2
                    }
                },

                responsive: true
            });
           
        }
    });
}


function EditSupervisor(SupervisorID) {
    $("#hdnsupervisor").val(1);
    $("#hdnsupervisorID").val(SupervisorID)
    $('#AddSupervisor').trigger('click');
    $("#spantext").text("Edit Supervisor");
    $.ajax({
        type: "GET",
        url: "Supervisor/GetDataBySupervisorID",
        data: { SupervisorID: SupervisorID },
        cache: false,
        success: function (data) {           
            $("#txtfirstname").val(data.FirstName);
            $("#txtmiddlename").val(data.MiddleName);
            $("#txtlastname").val(data.LastName);
            $("#txtfathername").val(data.FatherName);
            $("#txtemail").val(data.EmailID);
            $("#txtpassword").val(data.Password);
            $("#txtmobile").val(data.Mobile);
            $("#ddlgender").val(data.Gender);
            $("#ddlstate").val(data.State);
            $("#ddlcity").val(data.City);
            $("#txtparmanentaddress").val(data.ParmanentAddress);
            $("#txtcurrentaddress").val(data.CurrentAddress);
            $("#fuidproof").val(data.IDProof);
        }
    });
}
function UpdateSupervisor() {
    var supervisordetails = {};

    supervisordetails.FirstName = $("#txtfirstname").val();
    supervisordetails.MiddleName = $("#txtmiddlename").val();
    supervisordetails.LastName = $("#txtlastname").val();
    supervisordetails.FatherName = $("#txtfathername").val();
    supervisordetails.EmailID = $("#txtemail").val();
    supervisordetails.Password = $("#txtpassword").val();
    supervisordetails.Mobile = $("#txtmobile").val();
    supervisordetails.Gender = $("#ddlgender").val();
    supervisordetails.State = $("#ddlstate").val();
    supervisordetails.City = $("#ddlcity").val();
    supervisordetails.ParmanentAddress = $("#txtparmanentaddress").val();
    supervisordetails.CurrentAddress = $("#txtcurrentaddress").val();
    supervisordetails.IDProof = $("#fuidproof").val();
    supervisordetails.SupervisorID = $("#hdnsupervisorID").val();
    $.ajax({
        type: "POST",
        url: "Supervisor/UpdateSupervisor",
        data: supervisordetails,
        cache: false,
        success: function (data) {

            $("#hdnsupervisorID").val(0);
            $("#hdnsupervisor").val(0);
            $("#spantext").text("Add Supervisor");
            LoadSupervisors();
            $("#txtfirstname").val("");
            $("#txtmiddlename").val("");
            $("#txtlastname").val("");
            $("#txtfathername").val("");
            $("#txtemail").val("");
            $("#txtpassword").val("");
            $("#txtmobile").val("");
            $("#ddlgender").val("");
            $("#ddlstate").val("");
            $("#ddlcity").val("");
            $("#txtparmanentaddress").val("");
            $("#txtcurrentaddress").val("");
            $("#fuidproof").val("");
            $.alert({
                title: '',
                content: 'Supervisor details updated successfully!',
                type: 'green',
            });
            LoadSupervisors();

        },
        error: function (error) {
            $.alert({
                title: '',
                content: 'Something went wrong. please try after sometime!',
                type: 'red',

            });
        }

    });

}

function RemoveSupervisor(SupervisorID) {


    $.ajax({
        type: "GET",
        url: "Supervisor/RemoveSupervisor",
        data: { SupervisorID: SupervisorID },
        cache: false,
        success: function (data) {

            LoadSupervisors();
            $.alert({
                title: '',
                content: 'Supervisor details deleted successfully!',
                type: 'green',
            });
        }
    });
}