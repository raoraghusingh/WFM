$.validator.setDefaults({
    submitHandler: function () {
        debugger;
        var checklistdetails = {};
        
        checklistdetails.CompanyID = $("#ddlcompanyname").val();
        checklistdetails.WorkName = $("#txtworkname").val();
        checklistdetails.WorkInterval = $("#txtworkinterval").val();
        checklistdetails.Shiftlist = [];
        $('input[type="checkbox"]:checked').each(function () {
            checklistdetails.Shiftlist.push($(this).val())
            //$('#t').append(', ' + $(this).val());
        });

        $.ajax({
            type: "POST",
            url: "Checklist/Addchecklist",
            data: checklistdetails,
            cache: false,
            success: function (data) {
                $("#spantext").text("Create Company");
                $('#companyform')[0].reset();
                $("#hdncompanyid").val(0);
                if (data == 1) {
                    $.alert({
                        title: '',
                        content: 'Comapny details saved successfully!',
                        type: 'green',
                    });
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
    $("#spantext").text("Create Checklist");
    LoadCompany();
    // page validaton using jquery
    $("#checklistform").validate({
        rules: {
            ddlcompanyname:"required",
            txtworkname: "required",
            txtworkinterval: "required"
            
        },
        messages: {
            ddlcompanyname: "Please select company name",
            txtworkname: "Please enter work name",
            txtworkinterval: "Please enter work interval",
            
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
                text:"Select company"     
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



//function LoadCompany() {
//    $.ajax({
//        type: "GET",
//        url: "Company/CompanyList",
//        data: "",
//        cache: false,
//        success: function (data) {
//            console.log(data);
//            $('#tblcompanylist').DataTable().destroy();
//            $("#tblcompanylist tbody").empty();

//            var tabledatabody = '';
//            $.each(data, function (index, value) {
//                tabledatabody += '<tr>';



//                tabledatabody += ' <td>' + value.CompanyName + '</td>';
//                tabledatabody += ' <td>' + value.CompanyAddress + '</td>';
//                tabledatabody += ' <td>' + value.CompanyPhone + '</td>';
//                tabledatabody += ' <td>' + value.OwnerName + '</td>';
//                tabledatabody += ' <td>' + value.EmailID + '</td>';
//                tabledatabody += ' <td>' + value.OwnerMobile + '</td>';

//                tabledatabody += ' <td>' + value.State + '</td>';
//                tabledatabody += ' <td>' + value.City + '</td>';

//                tabledatabody += ' <td><a href="javascript:void(0);" onclick=EditCompany(' + value.CompanyID + ')> <i class="glyphicon glyphicon-edit"></i></a></td>';
//                tabledatabody += ' <td><a href="javascript:void(0);" onclick=RemoveCompany(' + value.CompanyID + ')><i class="glyphicon glyphicon-remove-sign"></i></a></td>';
//                tabledatabody += ' </tr>';
//            });
//            $("#tblcompanylist tbody").append(tabledatabody);
//            $.fn.dataTable.ext.errMode = 'none';

//            $('#tblcompanylist').DataTable({
//                responsive: {
//                    details: {
//                        type: 'column',
//                        target: -2
//                    }
//                },
//                //columnDefs: [{
//                //    className: 'control',
//                //    orderable: false,
//                //    targets: -2
//                //}]
//                responsive: true
//            });

//        }
//    });
//}


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