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
                $("#spantext").text("Create CheckList");
                $('#checklistform')[0].reset();
                $("#hdnchecklistid").val(0);
                if (data == 1) {
                    $.alert({
                        title: '',
                        content: 'Checklist saved successfully!',
                        type: 'green',
                    });
                }
                else if (data == 2) {
                    $.alert({
                        title: '',
                        content: 'Work name already exist!',
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
    $("#spantext").text("Create Checklist");
    LoadCompany();
    BindChecklist();
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



function Editchecklist(id, companyID) {
    $("input[type='checkbox']").prop('checked', false);
    $('#addcompany').trigger('click');
      $("#spantext").text("Edit Checklist");
    var wname = $("#" + id).text();
    $.ajax({
        type: "GET",
        url: "Checklist/GetWorkdetailbyname",
        data: { workname: wname, companyid: companyID },
        cache: false,
        success: function (data) {
           
           
            $.each(data, function (i, value) {
                $("#ddlcompanyname").val(value.CompanyID);
                $("#txtworkname").val(value.WorkName);
                $("#txtworkinterval").val(value.WorkInterval);
                $("input[value='" + value.ShiftID + "']").prop('checked', true);
               
            })
        }
    });
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



function BindChecklist() {
    $.ajax({
        type: "GET",
        url: "Checklist/Createchecklist",
        data: "",
        cache: false,
        success: function (data) {
            
            debugger;
            $('#tblchecklist').DataTable().destroy();
            $("#tblchecklist tbody").empty();

            var tabledatabody = '';
            var firstworkname = '';
            var workname = '';
            var count = 0;
            for (var i = 0; i < data.length; i)
            {
                var returnedData = $.grep(data, function (element, index) {
                    return element.workname == data[i].workname;
                });
                 data = $.grep(data, function (element, index) {
                    return element.workname != data[i].workname;
                });
                 i = 0;
                var companyname = '';
                var workname = '';
                var workintervale = '';
                var shiftname = '';
                var camid = 0;

                
                    for (var j = 0; j < returnedData.length; j++) {
                        count++;
                        workname = returnedData[j].workname
                        companyname = returnedData[j].companyname
                        workintervale = returnedData[j].workinterval
                        shiftname += returnedData[j].shiftname + "(" + returnedData[j].shiftstarttime + "||" + returnedData[j].shiftendtime + ")" + ",";
                        camid = returnedData[j].companyid;
                    }
                    tabledatabody += '<tr>';
                    tabledatabody += ' <td>' + companyname + '</td>';
                    tabledatabody += ' <td><lable id=' + count + '>' + workname + '</lable></td>';
                    tabledatabody += ' <td>' + workintervale + '</td>';
                    tabledatabody += ' <td>' + shiftname.slice(0, -1) + '</td>';
                    tabledatabody += ' <td><a href="javascript:void(0);" onclick="Editchecklist( '+count+ ',' +camid + ')"> <i class="glyphicon glyphicon-edit"></i></a></td>';
                    tabledatabody += ' <td><a href="javascript:void(0);" onclick=RemoveCompany('+count+ ',' +camid + ')><i class="glyphicon glyphicon-remove-sign"></i></a></td>';
                    tabledatabody += ' </tr>';
                

            }
            //$.each(data, function (index, value) {
            //    debugger;
            //    if (firstworkname == '')
            //    {
            //       firstworkname= value.workname
            //    }
            //    if (firstworkname == value.workname) {
            //        workname += value.workname + ",";
            //    }
            //    else
            //    {
            //        workname = '';
            //        firstworkname = '';
            //        tabledatabody += '<tr>';
            //        tabledatabody += ' <td>' + value.companyname + '</td>';
            //        tabledatabody += ' <td>' + value.workname + '</td>';
            //        tabledatabody += ' <td>' + value.workinterval + '</td>';
            //        tabledatabody += ' <td>' + value.shiftname + "(" + value.shiftstarttime + "|" + value.shiftendtime + ")" + '</td>';
            //        tabledatabody += ' <td><a href="javascript:void(0);" onclick=EditCompany(' + value.CompanyID + ')> <i class="glyphicon glyphicon-edit"></i></a></td>';
            //        tabledatabody += ' <td><a href="javascript:void(0);" onclick=RemoveCompany(' + value.CompanyID + ')><i class="glyphicon glyphicon-remove-sign"></i></a></td>';
            //        tabledatabody += ' </tr>';
            //    }
                
            //});
            $("#tblchecklist tbody").append(tabledatabody);
            $.fn.dataTable.ext.errMode = 'none';

            $('#tblchecklist').DataTable({
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


//function Editchecklist(id,comid) {

//    $('#addcompany').trigger('click');
//    $("#spantext").text("Edit Company");
//    var wname = $("#" + id).text();
//    $.ajax({
//        type: "GET",
//        url: "Checklist/GetWorkdetailbyname",
//        data: { workname: wname, companyid: comid },
//        cache: false,
//        success: function (data) {


//            $("#hdncompanyid").val(data.CompanyID)
//            $("#txtcompanyname").val(data.CompanyName);
//            $("#txtcompanyaddress").val(data.CompanyAddress);
//            $("#txtcompanyphone").val(data.CompanyPhone);
//            $("#txtownername").val(data.OwnerName);
//            $("#txtusername").val(data.EmailID);
//            $("#txtpassword").val(data.Password);
//            $("#txtownermobile").val(data.OwnerMobile);

//            $("#ddlstate").val(data.State);
//            $("#ddlcity").val(data.City);
//        }
//    });
//}

//function RemoveCompany(CompanyID) {


//    $.ajax({
//        type: "GET",
//        url: "Company/Removecompany",
//        data: { ID: CompanyID },
//        cache: false,
//        success: function (data) {
//            $("#spantext").text("Create Company");
//            $('#companyform')[0].reset();
//            $("#hdncompanyid").val(0);
//            LoadCompany();
//            $.alert({
//                title: '',
//                content: 'Company deleted successfully!',
//                type: 'green',
//            });
//        }
//    });
//}