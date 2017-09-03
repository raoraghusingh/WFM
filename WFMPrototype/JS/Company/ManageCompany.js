$.validator.setDefaults({
    submitHandler: function () {
        debugger;
        var companydetails = {};
        companydetails.CompanyID = 0;
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

                if (data == 1) {
                    $.alert({
                        title: '',
                        content: 'Comapny details saved successfully!',
                        type:'green',
                    });
                }
                else if (data == 2) {
                    $.alert({
                        title: '',
                        content: 'Company name already exist!',
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