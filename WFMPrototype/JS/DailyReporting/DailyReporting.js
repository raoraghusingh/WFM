$.validator.setDefaults({
    submitHandler: function () {
        if ($("#hdndailyreporting").val() == "1") {
            UpdateDailyReporting();
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
            //checklisttimeobj = [];
            //$("input[name='control_text']").map(function () {
            //    checklisttimeobj.push(this.value);

            //}).get();



            var dailyreportingdetails = {};
            // assignworkdetails.CompanyName = $("#ddlcompanyname").text();
            dailyreportingdetails.CompanyID = $("#ddlcompanyname").val();
            dailyreportingdetails.WorkerName = $("#ddlworkername option:selected").val();
            dailyreportingdetails.ShiftName = $("#ddlshift").val();
            //  assignworkdetails.Checklist = $("#chkchecklist").val();
            dailyreportingdetails.Date = $("#txtdate").val();


            // console.log(jsonObj);

            $.ajax({
                type: "POST",
                url: "DailyReporting/DailyReporting",
                data: { dailyreportingdetails: dailyreportingdetails, checklistobj: checklistobj },
                cache: false,
                success: function (data) {

                    if (data == 1) {
                        $.alert({
                            title: '',
                            content: 'Data saved successfully!',
                            type: 'green',
                        });
                        LoadDailyReporting();
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
    var chekbox = [];
    $("#dailyreportingform").validate({
        rules: {
            ddlcompanyname: "required",
            ddlworkername: "required",
            ddlshift: "required",
            chkchecklist: "required",
            txtdate: "required"
            //   txtworkinterval: "required",
        },
        messages: {
            ddlcompanyname: "Please select company name",
            ddlworkername: "Please select worker name",
            ddlshift: "Please select shift name",
            chkchecklist: "Please choose work",
            txtdate: "Please choose date",

        }
    });

    //end
    // page validaton using jquery
    $("#spantext").text("Daily Report");
    // load Organization
    BindCompany();
    BindWorker();
    BindShift();
    LoadDailyReporting();
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

                        //checklistintervalobj.push(value.WorkInterval);
                        //$("#chkchecklist").append('<input name="control_text" class="form-control" style="width:15%" type="text"/></br>');

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

    $("#spantext").text("Daily Report");
    $('#dailyreportingform')[0].reset();
    $("#hdndailyreporting").val(0);
    $("#hdndailyreportingID").val(0);
}
function LoadDailyReporting() {
    $.ajax({
        type: "GET",
        url: "DailyReporting/DailyReportingList",
        data: "",
        cache: false,
        success: function (data) {

            $('#tblDailyReporting').DataTable().destroy();
            $("#tblDailyReporting tbody").empty();

            var tabledatabody = '';
            $.each(data, function (index, value) {
               
                tabledatabody += '<tr>';

                tabledatabody += ' <td>' + value.CompanyName + '</td>';
                tabledatabody += ' <td>' + value.WorkerName + '</td>';
                tabledatabody += ' <td>' + value.ShiftName + '</td>';
                tabledatabody += ' <td>' + value.Checklist + '</td>';
                tabledatabody += ' <td>' + value.Date + '</td>';
               // tabledatabody += ' <td><a href="javascript:void(0);" onclick=EditDailyReporting(' + value.WorkerID +')> <i class="glyphicon glyphicon-edit"></i></a></td>';
               // tabledatabody += ' <td><a href="javascript:void(0);" onclick=RemoveDailyReporting(' + value.WorkerName + ')><i class="glyphicon glyphicon-remove-sign"></i></a></td>';
                tabledatabody += ' </tr>';
           });
            $("#tblDailyReporting tbody").append(tabledatabody);
            $.fn.dataTable.ext.errMode = 'none';
            $('#tblDailyReporting').DataTable({
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


function EditDailyReporting(WorkerID) {
    $("#hdndailyreporting").val(1);
    $("#hdndailyreportingID").val(WorkerID)
    $('#DailyReportL').trigger('click');
   
    $("#spantext").text("Edit Daily Report");
    var MyDate = new Date(Date);
    $.ajax({
        type: "GET",
        url: "DailyReporting/GetDataByDailyReportingID",
        data: { WorkerID: WorkerID, Date: '2017-09-29' },
        cache: false,
        success: function (data) {
          
           // $.each(data, function (i, value) {
            $("#ddlcompanyname").val(data.CompanyID);
            $("#ddlworkername").val(data.WorkerName);
            $("#ddlshift").val(data.ShiftName);
                // $("#chkchecklist").val(data.Checklist);
               // chekbox.push(value.Checklist);
              
            $("#txtdate").val(data.Date);
               
          //  });
            $('#ddlshift').trigger('change');
          
            //for(var i=0;i<chekbox.length;i++)
            //{
            //    $("input[valu='" + value.Checklist + "']").prop('checked', true);
            //}
        }

    });
    
}
function UpdateDailyReporting() {
    checklistobj = [];
    $('input[type="checkbox"]').each(function () {
        if ($(this).is(':checked')) {
            if ($(this).val() != "on") {
                checklistobj.push($(this).val());
            }

        }

    });
    //checklisttimeobj = [];
    //$("input[name='control_text']").map(function () {
    //    checklisttimeobj.push(this.value);

    //}).get();



    var dailyreportingdetails = {};
    // assignworkdetails.CompanyName = $("#ddlcompanyname").text();
    dailyreportingdetails.CompanyID = $("#ddlcompanyname").val();
    dailyreportingdetails.WorkerName = $("#ddlworkername option:selected").val();
    dailyreportingdetails.ShiftName = $("#ddlshift").val();
    //  assignworkdetails.Checklist = $("#chkchecklist").val();
    dailyreportingdetails.Date = $("#txtdate").val();


    $.ajax({
        type: "POST",
        url: "DailyReporting/UpdateDailyReporting",
        data: { WorkerID: $("#hdndailyreportingID").val(), dailyreportingdetails: dailyreportingdetails, checklistobj: checklistobj },
        cache: false,
        success: function (data) {

            $("#hdndailyreportingID").val(0);
            $("#hdndailyreporting").val(0);
            $("#spantext").text("Daily Report");
            LoadDailyReporting();
            $("#ddlcompanyname").val("");
            $("#ddlworkername").val("");
            $("#ddlshift").val("");
          //  $("#chkchecklist").val("");
           // $("#txtdate").val("");
            $.alert({
                title: '',
                content: 'Data updated successfully!',
                type: 'green',
            });
            LoadDailyReporting();

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

function RemoveDailyReporting(DailyReportingID) {


    $.ajax({
        type: "GET",
        url: "DailyReporting/RemoveDailyReporting",
        data: { DailyReportingID: DailyReportingID },
        cache: false,
        success: function (data) {

            LoadDailyReporting();
            $.alert({
                title: '',
                content: 'Data deleted successfully!',
                type: 'green',
            });
        }
    });
}

function BindCompany() {

    $.ajax({
        type: "GET",
        url: "DailyReporting/CompanyList",
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
        url: "DailyReporting/WorkerList",
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
        url: "DailyReporting/ShiftList",
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