$.validator.setDefaults({
    submitHandler: function () {
        debugger;
        var checklistdetails = {};
        checklistdetails.ChecklistID = $("#hdnchecklistid").val();
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

                if (data == 1) {
                    $("#spantext").text("Create CheckList");
                    $('#checklistform')[0].reset();
                    $("#hdnchecklistid").val(0);
                    BindChecklist();
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
            ddlcompanyname: "required",
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