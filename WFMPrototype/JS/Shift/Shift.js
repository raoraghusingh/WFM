$.validator.setDefaults({
    submitHandler: function () {       
        if ($("#hdnshift").val() == "1") {            
            UpdateShift();
        }
        else{
        var shiftdetails = {};
        
        shiftdetails.ShiftName = $("#txtshiftname").val();
        shiftdetails.StartTime = $("#ddlstarthours").val() + ':' + $("#ddlstartminutes").val() + ':' + $("#ddlstartseconds").val();
        shiftdetails.EndTime = $("#ddlendhours").val() + ':' + $("#ddlendminutes").val() + ':' + $("#ddlendseconds").val();

        $.ajax({
            type: "POST",
            url: "Shift/AddShift",
            data: shiftdetails,
            cache: false,
            success: function (data) {

                if (data == 1) {
                    $.alert({
                        title: '',
                        content: 'Shift details saved successfully!',
                        type: 'green',
                    });
                    LoadShifts();
                }
                else if (data == 2) {
                    $.alert({
                        title: '',
                        content: 'Shift name already exist!',
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
    // page validaton using jquery
    $("#spantext").text("Add Shift");
    // load Organization 
    LoadShifts();
    $("#shiftform").validate({
        rules: {
            txtshiftname: "required",
            ddlstarthours: "required",
            ddlstartminutes: "required",
            ddlstartseconds: "required",
            ddlendhours: "required",
            ddlendminutes: "required",
            ddlendseconds: "required",
        },
        messages: {
            txtshiftname: "Please enter shift name",
            ddlstarthours: "Please select start hours",
            ddlstartminutes: "Please select start minutes",
            ddlstartseconds: "Please select start seconds",
            ddlendhours: "Please select end hours",
            ddlendminutes: "Please select end minutes",
            ddlendseconds: "Please select end seconds",
           
        }
    });

    //end
});

function Cancel() {

    $("#spantext").text("Add Shift");
    $('#shiftform')[0].reset();
    $("#hdnshift").val(0);
    $("#hdnshiftID").val(0);
}
function LoadShifts() {
    $.ajax({
        type: "GET",
        url: "Shift/ShiftList",
        data: "",
        cache: false,
        success: function (data) {

            $('#tblshifts').DataTable().destroy();
            $("#tblshifts tbody").empty();

            var tabledatabody = '';
            $.each(data, function (index, value) {
                tabledatabody += '<tr>';

                tabledatabody += ' <td>' + value.ShiftName + '</td>';
                tabledatabody += ' <td>' + value.StartTime + '</td>';
                tabledatabody += ' <td>' + value.EndTime + '</td>';              

                tabledatabody += ' <td><a href="javascript:void(0);" onclick=EditShift(' + value.ShiftID + ')> <i class="glyphicon glyphicon-edit"></i></a></td>';
                tabledatabody += ' <td><a href="javascript:void(0);" onclick=RemoveShift(' + value.ShiftID + ')><i class="glyphicon glyphicon-remove-sign"></i></a></td>';
                tabledatabody += ' </tr>';
            });
            $("#tblshifts tbody").append(tabledatabody);
            $.fn.dataTable.ext.errMode = 'none';
            $('#tblshifts').DataTable({
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


function EditShift(ShiftID) {
    $("#hdnshift").val(1);
    $("#hdnshiftID").val(ShiftID)
    $('#AddShift').trigger('click');
    $("#spantext").text("Edit Shift");
    $.ajax({
        type: "GET",
        url: "Shift/GetDataByShiftID",
        data: { ShiftID: ShiftID },
        cache: false,
        success: function (data) {
            var StartTime = data.StartTime;
            var EndTime = data.EndTime;
            var StartHours = StartTime.substr(0,2);
            var StartMinutes = StartTime.substr(3, 2);
            var StartSeconds = StartTime.substr(6, 2);
            var EndHours = EndTime.substr(0, 2);
            var EndMinutes = EndTime.substr(3, 2);
            var EndSeconds = EndTime.substr(6, 2);           
            $("#txtshiftname").val(data.ShiftName);
            $("#ddlstarthours").val(StartHours);
            $("#ddlstartminutes").val(StartMinutes);
            $("#ddlstartseconds").val(StartSeconds);
            $("#ddlendhours").val(EndHours);
            $("#ddlendminutes").val(EndMinutes);
            $("#ddlendseconds").val(EndSeconds);
           
        }
    });
}
function UpdateShift() {

    var shiftdetails = {};

    shiftdetails.ShiftName = $("#txtshiftname").val();
    shiftdetails.StartTime = $("#ddlstarthours").val() + ':' + $("#ddlstartminutes").val() + ':' + $("#ddlstartseconds").val();
    shiftdetails.EndTime = $("#ddlendhours").val() + ':' + $("#ddlendminutes").val() + ':' + $("#ddlendseconds").val();
    shiftdetails.ShiftID = $("#hdnshiftID").val();
    $.ajax({
        type: "POST",
        url: "Shift/UpdateShift",
        data: shiftdetails,
        cache: false,
        success: function (data) {

            $("#hdnshiftID").val(0);
            $("#hdnshift").val(0);
            $("#spantext").text("Add Shift");
            LoadShifts();
            $("#txtshiftname").val("");
            $("#ddlstarthours").val("");
            $("#ddlstartminutes").val("");
            $("#ddlstartseconds").val("");
            $("#ddlendhours").val("");
            $("#ddlendminutes").val("");
            $("#ddlendseconds").val("");
            $.alert({
                title: '',
                content: 'Shift details updated successfully!',
                type: 'green',
            });
           
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

function RemoveShift(ShiftID) {


    $.ajax({
        type: "GET",
        url: "Shift/RemoveShift",
        data: { ShiftID: ShiftID },
        cache: false,
        success: function (data) {
                 
            LoadShifts();
            $.alert({
                title: '',
                content: 'Shift details deleted successfully!',
                type: 'green',
            });
        }
    });
}