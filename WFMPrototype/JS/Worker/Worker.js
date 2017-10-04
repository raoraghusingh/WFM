$.validator.setDefaults({
    submitHandler: function () {
 

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
            fileData.append('Workerid', $("#hdnworkerid").val());
            fileData.append('firstname', $("#txtfirstname").val());
            fileData.append('middlename', $("#txtmiddle").val());
            fileData.append('lastname', $("#txtlastname").val());
            fileData.append('father', $("#txtfathername").val());
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
                    $("#hdnworkerid").val();
                    $("#spantext").text("Add Worker");
                    $('#workerform')[0].reset();
                   
                    if (data == 1) {
                        $.alert({
                            title: '',
                            content: 'worker saved successfully!',
                            type: 'green',
                        });
                        LoadAllworker();
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
                            content: 'Worker details updated successfully!',
                            type: 'green',
                        });
                    }
                },  
                error: function (err) {  
                    $.alert({
                        title: '',
                        content: 'Something went worg please try after sometime!',
                        type: 'red',
                    });
                }  
            });  
        } else {  
            alert("FormData is not supported.");  
        }  
   
    }

});



$(document).ready(function () {
    $("#spantext").text("Add Worker");
    LoadAllworker();
    bindState();
    
    
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

    $("#ddlstate").change(function () {
        BindCity();
    });

  
    $("#sameaddress").change(function () {
     
        if ($(this).is(":checked")) {
            $("#txtcurrentaddress").val($("#txtparmaent").val());
        } else {
            $("#txtcurrentaddress").val("");
        }
    });
});



function LoadAllworker() {
    $.ajax({
        type: "GET",
        url: "Worker/WorkerList",
        data: "",
        cache: false,
        success: function (data) {
        
            $('#tblcompanyworker').DataTable().destroy();
            $("#tblcompanyworker tbody").empty();

            var tabledatabody = '';
            $.each(data, function (index, value) {
                tabledatabody += '<tr>';
                tabledatabody += ' <td>' + (value.FirstName + " " + value.MiddleName + " " + value.LastName) + '</td>';
                tabledatabody += ' <td>' + value.FatherName + '</td>';
                tabledatabody += ' <td>' + value.EmailID + '</td>';
                tabledatabody += ' <td>' + value.Mobile + '</td>';
                tabledatabody += ' <td>' + value.ParmanentAddress + '</td>';
                tabledatabody += ' <td>' + value.CurrentAddress + '</td>';
                tabledatabody += ' <td>' + value.Gender + '</td>';
                tabledatabody += ' <td>' + value.State + '</td>';
                tabledatabody += ' <td>' + value.City + '</td>';
                tabledatabody += ' <td><img style="width:30%;height:10%" src=' + value.IDProof + '></img></td>';
                tabledatabody += ' <td><a href="javascript:void(0);" onclick=EditWorkder(' + value.WorkerID + ')> <i class="glyphicon glyphicon-edit"></i></a></td>';
                tabledatabody += ' <td><a href="javascript:void(0);" onclick=RemoveWorker(' + value.WorkerID + ')><i class="glyphicon glyphicon-remove-sign"></i></a></td>';
                tabledatabody += ' </tr>';
            });


            $("#tblcompanyworker tbody").append(tabledatabody);
            $.fn.dataTable.ext.errMode = 'none';

            $('#tblcompanyworker').DataTable({
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



function bindState() {
    $.ajax({
        type: "GET",
        url: "Worker/GetAllstates",
        data: "",
        cache: false,
        success: function (data) {




            $("#ddlstate").html("");
            $('#ddlstate').append($('<option>', {
                value: "",
                text: "Select State"
            }));
            $.each(data, function (i, value) {

                $('#ddlstate').append($('<option>', {
                    value: value.StateName,
                    text: value.StateName
                }));
            })
           // BindCity();
        }
    });
}
function BindCity() {
    debugger;
    $.ajax({
        type: "GET",
        url: "Worker/Citylistbyid",
        data: { statename: $("#ddlstate").val() },
        cache: false,
        success: function (data) {




            $("#ddlcity").html("");
            $('#ddlcity').append($('<option>', {
                value: "",
                text: "Select City"
            }));
            $.each(data, function (i, value) {

                $('#ddlcity').append($('<option>', {
                    value: value.CityName,
                    text: value.CityName
                }));
            })
        }
    });
}

function Cancel() {

    $("#hdnworkerid").val();
    $("#spantext").text("Add Worker");
    $('#workerform')[0].reset();
}

function EditWorkder(WorkderID) {

    $('#addworker').trigger('click');
    $("#spantext").text("Edit Worker");
    $.ajax({
        type: "GET",
        url: "Worker/GetDetailbyid",
        data: { workerid: WorkderID },
        cache: false,
        success: function (data) {
            $("#ddlstate").val(data.State);
            BindCity();
            $("#hdnworkerid").val(data.WorkerID)
            $("#txtfirstname").val(data.FirstName);
            $("#txtmiddle").val(data.MiddleName);
            $("#txtlastname").val(data.LastName);
            $("#txtfathername").val(data.FatherName);
            $("#txtusername").val(data.EmailID);
            $("#txtworkermobile").val(data.Mobile);
            $("#txtcurrentaddress").val(data.CurrentAddress);
            $("#txtparmaent").val(data.ParmanentAddress);
            $("#ddlGender").val(data.Gender);
            
            setTimeout(function () { $("#ddlcity").val(data.City); }, 1000);

            $("#previewmsg").attr("src", data.IDProof)
           
        }
    });
}

/* function RemoveCompany(CompanyID) {
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
} */

function RemoveWorker(WorkerID) {


    $.ajax({
        type: "GET",
        url: "Worker/RemoveWorker",
        data: { WorkerID: WorkerID },
        cache: false,
        success: function (data) {

            LoadAllworker();
            $.alert({
                title: '',
                content: 'Worker details deleted successfully!',
                type: 'green',
            });
        }
    });
}