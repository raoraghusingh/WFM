$.validator.setDefaults({
    submitHandler: function () {
        if ($("#hdnlostfound").val() == "1") {
            UpdateLostFound();
        }
        else {
            var lostfounddetails = {};
            lostfounddetails.CompanyID = $("#ddlcompanyname").val();
            lostfounddetails.FounderName = $("#ddlworkername").val();
            lostfounddetails.ItemName = $("#txtitem").val();
            lostfounddetails.Comments = $("#txtcomments").val();
            lostfounddetails.Date = $("#txtdate").val();
            // lostfounddetails.CompanyName = $("#ddlcompanyname option:selected").text();           
            $.ajax({
                type: "POST",
                url: "LostFound/AddLostFound",
                data: lostfounddetails,
                cache: false,
                success: function (data) {

                    if (data == 1) {
                        $.alert({
                            title: '',
                            content: 'Lost/Found details saved successfully!',
                            type: 'green',
                        });
                        LoadLostFound();
                    }
                   /* else if (data == 2) {
                        $.alert({
                            title: '',
                            content: 'Supervisor email id already exist!',
                            type: 'red',
                        });
                    } */
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


    $("#lostfoundform").validate({
        rules: {
            ddlcompanyname: "required",
            ddlworkername: "required",
            txtitem: "required",
            txtcomments: "required",         
            txtdate: "required",           
        },
        messages: {
            ddlcompanyname: "Please select company name",
            ddlworkername: "Please select founder name",
            txtitem: "Please enter item name",
            txtcomments: "Please enter comments",            
            txtdate: "Please choose date",          

        }
    });

    //end
    // page validaton using jquery
    $("#spantext").text("Add Lost/Found");
   
   
    BindCompany();
    BindWorker();
    LoadLostFound();
});

function Cancel() {

    $("#spantext").text("Add Lost/Found");
    $('#lostfoundform')[0].reset();
    $("#hdnlostfound").val(0);
    $("#hdnlostfoundID").val(0);
}
function LoadLostFound() {
    $.ajax({
        type: "GET",
        url: "LostFound/LostFoundList",
        data: "",
        cache: false,
        success: function (data) {

            $('#tbllostfound').DataTable().destroy();
            $("#tbllostfound tbody").empty();

            var tabledatabody = '';
            $.each(data, function (index, value) {
                tabledatabody += '<tr>';

                tabledatabody += ' <td>' + value.companyname + '</td>';
                tabledatabody += ' <td>' + value.WorkerName + '</td>';
                tabledatabody += ' <td>' + value.itemname + '</td>';
                tabledatabody += ' <td>' + value.comments + '</td>';
                tabledatabody += ' <td>' + value.date + '</td>';              
                tabledatabody += ' <td><a href="javascript:void(0);" onclick=EditLostFound(' + value.LostFoundID + ')> <i class="glyphicon glyphicon-edit"></i></a></td>';
                tabledatabody += ' <td><a href="javascript:void(0);" onclick=RemoveLostFound(' + value.LostFoundID + ')><i class="glyphicon glyphicon-remove-sign"></i></a></td>';
                tabledatabody += ' </tr>';
            });
            $("#tbllostfound tbody").append(tabledatabody);
            $.fn.dataTable.ext.errMode = 'none';
            $('#tbllostfound').DataTable({
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


function EditLostFound(LostFoundID) {
    $("#hdnlostfound").val(1);
    $("#hdnlostfoundID").val(LostFoundID);
    $('#AddLostFound').trigger('click');
    $("#spantext").text("Edit Lost/Found");
    $.ajax({
        type: "GET",
        url: "LostFound/GetDataByLostFoundID",
        data: { LostFoundID: LostFoundID },
        cache: false,
        success: function (data) {
            $("#ddlcompanyname").val(data.CompanyID);
            $("#ddlworkername").val(data.FounderName);
            $("#txtitem").val(data.ItemName);
            $("#txtcomments").val(data.Comments);
            $("#txtdate").val(data.Date);          
        }
    });
}
function UpdateLostFound() {
    var lostfounddetails = {};

    lostfounddetails.CompanyID = $("#ddlcompanyname").val();
    lostfounddetails.FounderName = $("#ddlworkername").val();
    lostfounddetails.ItemName = $("#txtitem").val();
    lostfounddetails.Comments = $("#txtcomments").val();
    lostfounddetails.Date = $("#txtdate").val();
    lostfounddetails.LostFoundID = $("#hdnlostfoundID").val();
    $.ajax({
        type: "POST",
        url: "LostFound/UpdateLostFound",
        data: lostfounddetails,
        cache: false,
        success: function (data) {

            $("#hdnlostfoundID").val(0);
            $("#hdnlostfound").val(0);
            $("#spantext").text("Add Lost/Found");
            LoadLostFound();
            $("#ddlcompanyname").val("");
            $("#ddlworkername").val("");
            $("#txtitem").val("");
            $("#txtcomments").val("");
           
            $.alert({
                title: '',
                content: 'Lost/Found details updated successfully!',
                type: 'green',
            });
            LoadLostFound();

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

function RemoveLostFound(LostFoundID) {
    debugger;

    $.ajax({
        type: "GET",
        url: "LostFound/RemoveLostFound",
        data: { LostFoundID: LostFoundID },
        cache: false,
        success: function (data) {

            LoadLostFound();
            $.alert({
                title: '',
                content: 'Lost/Found details deleted successfully!',
                type: 'green',
            });
        }
    });
}

function BindCompany() {

    $.ajax({
        type: "GET",
        url: "LostFound/CompanyList",
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
        url: "LostFound/WorkerList",
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