$.validator.setDefaults({
    submitHandler: function () {
        debugger;
        var organizationdetails = {};
        organizationdetails.OrgID = $("#hdnorganization").val();
        organizationdetails.OrganizationName = $("#txtcompanyname").val();
        organizationdetails.FirstName = $("#txtfirstname").val();
        organizationdetails.MiddleName = $("#txtmiddle").val();
        organizationdetails.LastName = $("#txtlastname").val();
        organizationdetails.Designation = $("#txtDesignation").val();
        organizationdetails.EmailID = $("#txtusername").val();
        organizationdetails.Password = $("#txtpassword").val();
        organizationdetails.Mobile = $("#txtownermobile").val();
        organizationdetails.Gender = $("#ddlGender").val();
        organizationdetails.State = $("#ddlstate").val();
        organizationdetails.City = $("#ddlcity").val();

        $.ajax({
            type: "POST",
            url: "Organization/AddEditOrganization",
            data: organizationdetails,
            cache: false,
            success: function (data) {

                if (data == 1) {
                    $("#hdnorganization").val(0)
                    LoadOrganization();
                    $.alert({
                        title: '',
                        content: 'Organization details saved successfully!',
                        type: 'green',
                    });

                }
                else if (data == 2) {
                    $.alert({
                        title: '',
                        content: 'Organization name already exist!',
                        type: 'red',
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

    $("#spantext").text("Create Organization");
    // load Organization 
    LoadOrganization();
    //end
    // page validaton using jquery
    $("#Organizationform").validate({
        rules: {
            txtcompanyname: "required",
            txtfirstname: "required",
            txtmiddle: "required",
            txtlastname: "required",
            txtDesignation: "required",
            txtusername: {
                required: true,
                email: true
            },
            txtpassword: "required",
            txtownermobile: {
                required: true,
                number: true,
                minlength: 10,
                maxlength: 10

            },
            ddlstate: "required",
            ddlcity: "required",
            ddlGender: "required",
            



        },
        messages: {
            txtcompanyname: "Please enter organization name",
            txtfirstname: "Please enter first name",
            txtmiddle: "Please enter middle name",
            txtlastname: "Please enter last name",
            txtusername: {
                required: "Please enter user email address",
                email: "Please enter valid email address"
            },
            txtpassword: "Please enter password",
            txtownermobile: {
                required: "Please enter owner mobile number",
                number: "Only number allowed",
                minlength: "Mobile length should be 10 digit",
                maxlength: "Mobile length should be 10 digit",

            },
            ddlstate: "Please select state",
            ddlcity: "Please select state",
            ddlGender: "Please select Gender",
        }
    });

    //end
});


function Cancel()
{

    $("#spantext").text("Create Organization");
    $('#Organizationform')[0].reset();
    $("#hdnorganization").val(0);
}
function LoadOrganization()
{
    $.ajax({
        type: "GET",
        url: "Organization/OrgnizationList",
        data: "",
        cache: false,
        success: function (data) {

            $('#tblorganization').DataTable().destroy();
            $("#tblorganization tbody").empty();

            var tabledatabody = '';
            $.each(data, function (index, value) {
                tabledatabody += '<tr>';


               
                tabledatabody += ' <td>' + value.OrganizationName + '</td>';
                tabledatabody += ' <td>' + (value.FirstName + " " + value.MiddleName + " " + value.LastName) + '</td>';
                tabledatabody += ' <td>' + value.EmailID + '</td>';
                tabledatabody += ' <td>' + value.Mobile + '</td>';
                tabledatabody += ' <td>' + value.Designation + '</td>';
                tabledatabody += ' <td>' + value.State + '</td>';
                tabledatabody += ' <td>' + value.City + '</td>';
                
                tabledatabody += ' <td><a href="javascript:void(0);" onclick=EditOrganization(' + value.OrgID + ')> <i class="glyphicon glyphicon-edit"></i></a></td>';
                tabledatabody += ' <td><a href="javascript:void(0);" onclick=RemoveOrganization(' + value.OrgID + ')><i class="glyphicon glyphicon-remove-sign"></i></a></td>';
                tabledatabody += ' </tr>';
            });
            $("#tblorganization tbody").append(tabledatabody);
            $.fn.dataTable.ext.errMode = 'none';
            $('#tblorganization').DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "ordering": true,
                "info": true,
                "autoWidth": false,
                "responsive": true
            });
        }
    });
}


function EditOrganization(OrgID) {
    
    $('#addorganization').trigger('click');
    $("#spantext").text("Edit Organization");
    $.ajax({
        type: "GET",
        url: "Organization/GetByOrgnizationListID",
        data: { ID: OrgID },
        cache: false,
        success: function (data) {

            //organizationdetails.OrgID = 0;
            $("#hdnorganization").val(data.OrgID)
             $("#txtcompanyname").val(data.OrganizationName);
             $("#txtfirstname").val(data.FirstName);
             $("#txtmiddle").val(data.MiddleName);
             $("#txtlastname").val(data.LastName);
             $("#txtDesignation").val(data.Designation);
             $("#txtusername").val(data.EmailID);
             $("#txtpassword").val(data.Password);
             $("#txtownermobile").val(data.Mobile);
             $("#ddlGender").val(data.Gender);
             $("#ddlstate").val(data.State);
             $("#ddlcity").val(data.City);
        }
    });
}

function RemoveOrganization(OrgID) {
   
    
    $.ajax({
        type: "GET",
        url: "Organization/RemoveOrgnizationList",
        data: { ID: OrgID },
        cache: false,
        success: function (data) {
            $("#spantext").text("Create Organization");
            $('#Organizationform')[0].reset();
            $("#hdnorganization").val(0);
            LoadOrganization();
            $.alert({
                title: '',
                content: 'Organization details saved successfully!',
                type: 'green',
            });
        }
    });
}