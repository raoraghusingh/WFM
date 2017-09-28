$.validator.setDefaults({
    submitHandler: function () {
        debugger;
        if ($("#hdnassignwork").val() == "1") {
            UpdateAssignedWork();
        }
        else {
            checklistobj = [];
            $('input[type="checkbox"]').each(function () {
                if ($(this).is(':checked')) {
                    if ($(this).val() != "on") {
                        checklistobj.push($(this).val());                       
                    }

                }

            });
            checklisttimeobj = [];
            $("input[name='control_text']").map(function () {              
                checklisttimeobj.push(this.value);
               
           }).get();

           
           
            var assignworkdetails = {};
           // assignworkdetails.CompanyName = $("#ddlcompanyname").text();
            assignworkdetails.CompanyID = $("#ddlcompanyname").val();
            assignworkdetails.WorkerName = $("#ddlworkername option:selected").val();
            assignworkdetails.ShiftName = $("#ddlshift").val();
          //  assignworkdetails.Checklist = $("#chkchecklist").val();
            assignworkdetails.WorkInterVal = $("#txtworkinterval").val();
            
              
                // console.log(jsonObj);
         
            $.ajax({
                type: "POST",
                url: "AssignWork/AssignWork",
                data: { assignworkdetails: assignworkdetails, checklistobj: checklistobj, checklisttimeobj: checklisttimeobj, checklistintervalobj: checklistintervalobj },
                cache: false,
                success: function (data) {

                    if (data == 1) {
                        $.alert({
                            title: '',
                            content: 'Work assigned successfully!',
                            type: 'green',
                        });
                        LoadAssignedWork();
                    }
                    //else if (data == 2) {
                    //    $.alert({
                    //        title: '',
                    //        content: 'Supervisor email id already exist!',
                    //        type: 'red',
                    //    });
                    //}
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
   
    $("#assignworkform").validate({
        rules: {
            ddlcompanyname: "required",
            ddlworkername: "required",
            ddlshift: "required",
            chkchecklist: "required",            
         //   txtworkinterval: "required",
        },
        messages: {
            ddlcompanyname: "Please select company name",
            ddlworkername: "Please select worker name",
            ddlshift: "Please select shift name",
            chkchecklist: "Please choose work",           
           // txtworkinterval: "Please enter work interval",

        }
    });

    //end
    // page validaton using jquery
    $("#spantext").text("Assign Work");
    // load Organization
    BindCompany();
    BindWorker();
    BindShift();
    LoadAssignedWork();
    $("#lblchecklist").hide();
    checklistintervalobj = [];
    $("#ddlshift").change(function () {
        if ($("#ddlshift").val() != "" && $("#ddlcompanyname").val() != "") {
          
            $.ajax({
                type: "GET",
                url: "AssignWork/CheckList",
                data: { CompanyID: $("#ddlcompanyname").val(), ShiftID: $("#ddlshift").val() },
                cache: false,
                success: function (data) {
                    $("#lblchecklist").show();
                    $.each(data, function (i, value) {
                        $("#chkchecklist").append($("<label>").text(value.WorkName + '(' + value.WorkInterval + ')').prepend(
             $("<input>").attr('type', 'checkbox').val(value.ChecklistID)
           


         ));
                       
                        checklistintervalobj.push(value.WorkInterval);
                        $("#chkchecklist").append('<input name="control_text" placeholder="work time" class="form-control" style="width:15%" type="text"/></br>');
                        
                    })
                },
                error: function (error) {
                    $.alert({
                        title: '',
                        content: 'Something went wrong. please try after sometime!',
                        type: 'red',

                    });
                },
            });
        }
    });
});

function Cancel() {

    $("#spantext").text("Assign Work");
    $('#assignworkform')[0].reset();
    $("#hdnassignwork").val(0);
    $("#hdnassignworkID").val(0);
}
function LoadAssignedWork() {
    $.ajax({
        type: "GET",
        url: "AssignWork/AssignedWorkList",
        data: "",
        cache: false,
        success: function (data) {

            $('#tblAssignedWork').DataTable().destroy();
            $("#tblAssignedWork tbody").empty();

            var tabledatabody = '';
            $.each(data, function (index, value) {
                tabledatabody += '<tr>';

                tabledatabody += ' <td>' + value.CompanyName + '</td>';
                tabledatabody += ' <td>' + value.WorkerName + '</td>';
                tabledatabody += ' <td>' + value.ShiftName + '</td>';
                tabledatabody += ' <td>' + value.Checklist + '</td>';
               // tabledatabody += ' <td>' + value.WorkInterVal + '</td>';               
                tabledatabody += ' <td><a href="javascript:void(0);" onclick=EditAssignedWork(' + value.WorkerID + ')> <i class="glyphicon glyphicon-edit"></i></a></td>';
              //  tabledatabody += ' <td><a href="javascript:void(0);" onclick=RemoveAssignedWork(' + value.WorkerID + ')><i class="glyphicon glyphicon-remove-sign"></i></a></td>';
                tabledatabody += ' </tr>';
            });
            $("#tblAssignedWork tbody").append(tabledatabody);
            $.fn.dataTable.ext.errMode = 'none';
            $('#tblAssignedWork').DataTable({
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


function EditAssignedWork(WorkerID) {
    debugger;
    $("#hdnassignwork").val(1);
    $("#hdnassignworkID").val(WorkerID)
    $('#AssignWork').trigger('click');
    $("#spantext").text("Edit Assigned Work");
    $.ajax({
        type: "GET",
        url: "AssignWork/GetDataByWorkerID",
        data: { WorkerID: WorkerID },
        cache: false,
        success: function (data) {
            $("#ddlcompanyname").val(data.CompanyID);
            $("#ddlworkername").val(data.WorkerName);
            $("#ddlshift").val(data.ShiftName);
          //  $("#chkchecklist").val(data.Checklist);
            // $("#txtinterval").val(data.WorkInterVal);   
            $('#ddlshift').trigger('change');
        }

    });


    //for (var i = 0; i < chekbox.length; i++) {
    //    $("input[valu='" + value.Checklist + "']").prop('checked', true);
    //}

}
function UpdateAssignedWork() {
    debugger;
    var assignworkdetails = {};
    checklistobj = [];
    $('input[type="checkbox"]').each(function () {
        if ($(this).is(':checked')) {
            if ($(this).val() != "on") {
                checklistobj.push($(this).val());
            }

        }

    });
    checklisttimeobj = [];
    $("input[name='control_text']").map(function () {
        checklisttimeobj.push(this.value);

    }).get();

    assignworkdetails.CompanyID = $("#ddlcompanyname").val();
    assignworkdetails.WorkerName = $("#ddlworkername").val();
    assignworkdetails.ShiftName = $("#ddlshift").val();
    //  assignworkdetails.Checklist = $("#chkchecklist").val();
    assignworkdetails.WorkInterVal = $("#txtworkinterval").val();
    assignworkdetails.AssignWorkID = $("#hdnassignworkID").val();
    $.ajax({
        type: "POST",
        url: "AssignWork/UpdateAssignedWork",
        data: {WorkerID:$("#hdnassignworkID").val(), assignworkdetails: assignworkdetails, checklistobj: checklistobj, checklisttimeobj: checklisttimeobj, checklistintervalobj: checklistintervalobj },
        cache: false,
        success: function (data) {

            $("#hdnassignworkID").val(0);
            $("#hdnassignwork").val(0);
            $("#spantext").text("Assign Work");
            LoadAssignedWork();
            $("#ddlcompanyname").val("");
            $("#ddlworkername").val("");
            $("#ddlshift").val("");
            $("#chkchecklist").val("");
            $("#txtinterval").val("");          
            $.alert({
                title: '',
                content: 'Work assignment updated successfully!',
                type: 'green',
            });
            LoadAssignedWork();

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

function RemoveAssignedWork(AssignWorkID) {


    $.ajax({
        type: "GET",
        url: "AssignWork/RemoveAssignedWork",
        data: { AssignWorkID: AssignWorkID },
        cache: false,
        success: function (data) {

            LoadAssignedWork();
            $.alert({
                title: '',
                content: 'Work assignment deleted successfully!',
                type: 'green',
            });
        }
    });
}

function BindCompany() {
   
    $.ajax({
        type: "GET",
        url: "AssignWork/CompanyList",
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
        },
        error: function (error) {
            $.alert({
                title: '',
                content: 'Something went wrong. please try after sometime!',
                type: 'red',

            });
        },
    });
}
function BindWorker() {
    $.ajax({
        type: "GET",
        url: "AssignWork/WorkerList",
        data: "",
        cache: false,
        success: function (data) {
            $("#ddlworkername").html("");
            $('#ddlworkername').append($('<option>', {
                value: "",
                text: "Select worker"
            }));
            $.each(data, function (i, value) {
                $("#ddlworkername").append($('<option></option>').val(value.WorkerID).html(value.FirstName));
            })
        },
        error: function (error) {
            $.alert({
                title: '',
                content: 'Something went wrong. please try after sometime!',
                type: 'red',

            });
        },
    });
}

function BindShift() {
    $.ajax({
        type: "GET",
        url: "AssignWork/ShiftList",
        data: "",
        cache: false,
        success: function (data) {
            $("#ddlshift").html("");
            $('#ddlshift').append($('<option>', {
                value: "",
                text: "Select shift"
            }));
            $.each(data, function (i, value) {
                $("#ddlshift").append($('<option></option>').val(value.ShiftID).html(value.ShiftName))
              
            })
        },
        error: function (error) {
            $.alert({
                title: '',
                content: 'Something went wrong. please try after sometime!',
                type: 'red',

            });
        },
    });
}