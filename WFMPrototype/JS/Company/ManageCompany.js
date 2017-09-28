$.validator.setDefaults({
    submitHandler: function () {
        var companydetails = {};
        companydetails.CompanyID = $("#hdncompanyid").val();
        companydetails.CompanyName = $("#txtcompanyname").val();
        companydetails.CompanyPhone = $("#txtcompanyphone").val();
        companydetails.CompanyAddress = $("#txtcompanyaddress").val();
        companydetails.OwnerName = $("#txtownername").val();
        companydetails.EmailID = $("#txtusername").val();
        companydetails.Password = $("#txtpassword").val();
        companydetails.OwnerMobile = $("#txtownermobile").val();
        companydetails.State = $("#ddlstate").val();
        companydetails.City = $("#ddlcity").val();
        
        $.ajax({
            type: "POST",
            url: "Company/AddEditCompany",
            data: companydetails,
            cache: false,
            success: function (data) {
                $("#spantext").text("Create Company");
                $('#companyform')[0].reset();
                $("#hdncompanyid").val(0);
                if (data == 1) {
                    $.alert({
                        title: '',
                        content: 'Company details saved successfully!',
                        type:'green',
                    });
                    LoadCompany();
                }
                else if (data == 2) {
                    $.alert({
                        title: '',
                        content: 'Company name already exist!',
                        type: 'red',
                    });
                }
                else if (data == 3) {
                    $.alert({
                        title: '',
                        content: 'Company details updated successfully!',
                        type: 'green',
                    });
                    LoadCompany();
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
});



$(document).ready(function () {
    $("#spantext").text("Create Company");
    LoadCompany();
    // page validaton using jquery
    $("#companyform").validate({
        rules: {
            txtcompanyname: "required",
            txtcompanyaddress: "required",
            txtcompanyphone: "required",
            txtownername: "required",
            txtusername: {
                required: true,
                email: true
            },
            txtpassword: "required",
            txtownermobile: {
                required: true,
                number:true,
                minlength: 10,
                maxlength: 10
               
            },
            ddlstate: "required",
            ddlcity: "required",
            
            
            
        },
        messages: {
            txtcompanyname: "Please enter company name",
            txtcompanyaddress: "Please enter company address",
            txtcompanyphone: "Please enter company phone number",
            txtownername: "Please enter company owner",
            txtusername: {
                required: "Please enter user email address",
                email: "Please enter valid email address"
            },
            txtpassword: "Please enter password",
            txtownermobile: {
                required: "Please enter owner mobile number",
                number:"Only number allowed",
                minlength: "Mobile length should be 10 digit",
                maxlength: "Mobile length should be 10 digit",
               
            },
            ddlstate: "Please select state",
            ddlcity: "Please select state",
        }
    });

    //end
});


function LoadCompany() {
    $.ajax({
        type: "GET",
        url: "Company/CompanyList",
        data: "",
        cache: false,
        success: function (data) {
            console.log(data);
            $('#tblcompanylist').DataTable().destroy();
            $("#tblcompanylist tbody").empty();

            var tabledatabody = '';
            $.each(data, function (index, value) {
                tabledatabody += '<tr>';



                tabledatabody += ' <td>' + value.CompanyName + '</td>';
                tabledatabody += ' <td>' + value.CompanyAddress + '</td>';
                tabledatabody += ' <td>' + value.CompanyPhone + '</td>';
                tabledatabody += ' <td>' + value.OwnerName + '</td>';
                tabledatabody += ' <td>' + value.EmailID + '</td>';
                tabledatabody += ' <td>' + value.OwnerMobile + '</td>';
                
                tabledatabody += ' <td>' + value.State + '</td>';
                tabledatabody += ' <td>' + value.City + '</td>';

                tabledatabody += ' <td><a href="javascript:void(0);" onclick=EditCompany(' + value.CompanyID + ')> <i class="glyphicon glyphicon-edit"></i></a></td>';
                tabledatabody += ' <td><a href="javascript:void(0);" onclick=RemoveCompany(' + value.CompanyID + ')><i class="glyphicon glyphicon-remove-sign"></i></a></td>';
                tabledatabody += ' </tr>';
            });
            $("#tblcompanylist tbody").append(tabledatabody);
            $.fn.dataTable.ext.errMode = 'none';

            $('#tblcompanylist').DataTable({
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


function EditCompany(CompanyID) {

    $('#addcompany').trigger('click');
    $("#spantext").text("Edit Company");
    $.ajax({
        type: "GET",
        url: "Company/GetCompanyByID",
        data: { ID: CompanyID },
        cache: false,
        success: function (data) {

            
            $("#hdncompanyid").val(data.CompanyID)
            $("#txtcompanyname").val(data.CompanyName);
            $("#txtcompanyaddress").val(data.CompanyAddress);
            $("#txtcompanyphone").val(data.CompanyPhone);
            $("#txtownername").val(data.OwnerName);
            $("#txtusername").val(data.EmailID);
            $("#txtpassword").val(data.Password);
            $("#txtownermobile").val(data.OwnerMobile);
          
            $("#ddlstate").val(data.State);
            $("#ddlcity").val(data.City);
        }
    });
}

function RemoveCompany(CompanyID) {


    $.ajax({
        type: "GET",
        url: "Company/Removecompany",
        data: { ID: CompanyID },
        cache: false,
        success: function (data) {
            $("#spantext").text("Create Company");
            $('#companyform')[0].reset();
            $("#hdncompanyid").val(0);
            LoadCompany();
            $.alert({
                title: '',
                content: 'Company deleted successfully!',
                type: 'green',
            });
        }
    });
}