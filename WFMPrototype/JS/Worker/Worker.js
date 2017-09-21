$.validator.setDefaults({
    submitHandler: function () {
        debugger;

        if (window.FormData !== undefined) {  
  
            var fileUpload = $("#idproof").get(0);  
            var files = fileUpload.files;  
              
            // Create FormData object  
            var fileData = new FormData();  
  
            // Looping over all files and add it to FormData object  
            for (var i = 0; i < files.length; i++) {  
                fileData.append(files[i].name, files[i]);  
            }  
              
            // Adding one more key to FormData object  
            fileData.append('firstname', $("#txtfirstname").val());
            fileData.append('middlename', $("#txtmiddle").val());
            fileData.append('lastname', $("#txtlastname").val());
            fileData.append('email', $("#txtusername").val());
            fileData.append('mobile', $("#txtworkermobile").val());
            fileData.append('paremanetaddress', $("#txtparmaent").val());
            fileData.append('currentaddress', $("#txtcurrentaddress").val());
            fileData.append('gender', $("#ddlGender").val());
            fileData.append('state', $("#ddlstate").val());
            fileData.append('city', $("#ddlcity").val());
          
          
            
  
            $.ajax({  
                url: 'Worker/Addworker',
                type: "POST",  
                contentType: false, // Not to set any content header  
                processData: false, // Not to process data  
                data: fileData,  
                success: function (data) {
                    if (data == 1) {
                        $.alert({
                            title: '',
                            content: 'worker saved successfully!',
                            type: 'green',
                        });
                    }
                    else if (data == 2) {
                        $.alert({
                            title: '',
                            content: 'Worker name already exist!',
                            type: 'red',
                        });
                    }
                    else if (data == 3) {
                        $.alert({
                            title: '',
                            content: 'Company details updated successfully!',
                            type: 'green',
                        });
                    }
                },  
                error: function (err) {  
                    $.alert({
                        title: '',
                        content: 'Some thing went worg please try after sometime!',
                        type: 'red',
                    });
                }  
            });  
        } else {  
            alert("FormData is not supported.");  
        }  
   
        //var checklistdetails = {};

        //checklistdetails.CompanyID = $("#ddlcompanyname").val();
        //checklistdetails.WorkName = $("#txtworkname").val();
        //checklistdetails.WorkInterval = $("#txtworkinterval").val();
        //checklistdetails.Shiftlist = [];
        //$('input[type="checkbox"]:checked').each(function () {
        //    checklistdetails.Shiftlist.push($(this).val())
        //    //$('#t').append(', ' + $(this).val());
        //});

        //$.ajax({
        //    type: "POST",
        //    url: "Checklist/Addchecklist",
        //    data: checklistdetails,
        //    cache: false,
        //    success: function (data) {
        //        $("#spantext").text("Create Company");
        //        $('#companyform')[0].reset();
        //        $("#hdncompanyid").val(0);
        //        if (data == 1) {
        //            $.alert({
        //                title: '',
        //                content: 'Comapny details saved successfully!',
        //                type: 'green',
        //            });
        //        }
        //        else if (data == 2) {
        //            $.alert({
        //                title: '',
        //                content: 'Company name already exist!',
        //                type: 'red',
        //            });
        //        }
        //        else if (data == 3) {
        //            $.alert({
        //                title: '',
        //                content: 'Company details updated successfully!',
        //                type: 'green',
        //            });
        //        }
        //        else {
        //            $.alert({
        //                title: '',
        //                content: 'Some thing went wrong. please try after sometime!',
        //                type: 'red',
        //            });
        //        }
        //    }
        //});
    }
});



$(document).ready(function () {
    $("#spantext").text("Create Checklist");
    LoadCompany();
    // page validaton using jquery
    $("#workerform").validate({
        rules: {
            
            txtfirstname: "required",
            txtmiddle: "required",
            txtlastname: "required",
            
            txtfathername: "required",
            txtusername: {
                required: true,
                email: true
            },
            
            txtworkermobile: {
                required: true,
                number: true,
                minlength: 10,
                maxlength: 10

            },
            txtparmaent: "required",
            txtcurrentaddress:"required",
            ddlstate: "required",
            ddlcity: "required",
            ddlGender: "required",
            idproof: {
                required: true,
                extension: "jpg|jpeg|png|JPG|JPEG|PNG"
            },




        },
        messages: {
            txtfirstname: "Please enter first name",
            txtmiddle: "Please enter middle name",
            txtlastname: "Please enter last name",
            txtfathername:"Please enter father name",
            txtusername: {
                required: "Please enter user email address",
                email: "Please enter valid email address"
            },
            
            txtworkermobile: {
                required: "Please enter mobile number",
                number: "Only number allowed",
                minlength: "Mobile length should be 10 digit",
                maxlength: "Mobile length should be 10 digit",

            },
            txtparmaent: "Please enter parmanent address",
            txtcurrentaddress: "Please enter current address",
            ddlstate: "Please select state",
            ddlcity: "Please select state",
            ddlGender: "Please select Gender",
            idproof: {
                required: "Please select id proff",
                extension: 'Only image file allowed'
            }
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


            //$('#ddlcompanyname').empty();
            //$("#ddlcompanyname").append($('<option></option>').val("").html('Select Company'));
            //$.each(data, function (i, value) {
            //    $("#ddlcompanyname").append($("<option></option>").val(value.CompanyID).html(value.CompanyName));
            //    //$('#ddlcompanyname').append($('', { value: value.CompanyID, text: value.CompanyName }));
            //})

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