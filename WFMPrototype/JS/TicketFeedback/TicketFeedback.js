$.validator.setDefaults({
    submitHandler: function () {
            var TicketFeedbackdetails = {};
            TicketFeedbackdetails.CompanyName = $("#txtcompanyname").val();
            TicketFeedbackdetails.CompanyEmail = $("#txtcompanyemail").val();
            TicketFeedbackdetails.Name = $("#txtname").val();
            TicketFeedbackdetails.Email = $("#txtemail").val();
            TicketFeedbackdetails.Mobile = $("#txtmobile").val();
            TicketFeedbackdetails.Type = $("#ddltype").val();
            TicketFeedbackdetails.Image = $("#fuproof").val();
            TicketFeedbackdetails.Ccomments = $("#txtcomments").val();
           
            $.ajax({
                type: "POST",
                url: "TicketFeedback/AddTicketFeedback",
                data: TicketFeedbackdetails,
                cache: false,
                success: function (data) {

                    if (data == 1) {
                        $.alert({
                            title: '',
                            content: 'Data saved successfully!',
                            type: 'green',
                        });
                        $("#txtcompanyname").val("");
                        $("#txtcompanyemail").val("");
                        $("#txtname").val("");
                        $("#txtemail").val("");
                        $("#txtmobile").val("");
                        $("#ddltype").val("");
                        $("#fuproof").val("");
                        $("#txtcomments").val("");
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
});

$(document).ready(function () {


    $("#supervisorform").validate({
        rules: {
            txtcompanyname: "required",
            txtcompanyemail: "required",
            txtname: "required",           
            txtemail: {
                required: true,
                email: true
            },        
            txtmobile: {
                required: true,
                number: true,
                minlength: 10,
                maxlength: 10
            },
            ddltype: "required",          
            txtcomments: "required",           
            fuproof: "required",
        },
        messages: {
            txtcompanyname: "Please enter company name",
            txtcompanyemail: "Please enter company email",
            txtname: "Please enter name",          
            txtemail: {
                required: "Please enter email address",
                email: "Please enter valid email address"
            },         
            txtmobile: {
                required: "Please enter mobile number",
                number: "Only number allowed",
                minlength: "Mobile length should be 10 digit",
                maxlength: "Mobile length should be 10 digit",
            },
            ddltype: "Please select type",          
            txtcomments: "Please enter comments",      
            fuproof: "Please choose proof",

        }
    });

  
});

function Cancel() {
    $('#supervisorform')[0].reset();
}

