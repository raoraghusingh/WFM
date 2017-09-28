

$(document).ready(function () {
   

    LoadAllTicket();
   
    LoadResovedTicket();
   
});

function LoadWorkder() {
    $.ajax({
        type: "GET",
        url: "Worker/WorkerList",
        data: "",
        cache: false,
        success: function (data) {
            $(".allworker").html("");
            $('.allworker').append($('<option>', {
                value: "",
                text: "Select worker"
            }));
            $.each(data, function (i, value) {

                $('.allworker').append($('<option>', {
                    value: value.WorkerID,
                    text: value.FirstName + " " + value.MiddleName + " " + value.LastName
                }));
            })
        }
    });
}

function LoadAllTicket() {
    
    var asssigtickewithworkid = new Array();
    
    $.ajax({
        type: "GET",
        url: "Ticket/Allticket",
        data: "",
        cache: false,
        success: function (data) {
            debugger;
            $('#tblpendingandactiveatable').DataTable().destroy();
            $("#tblpendingandactiveatable tbody").empty();

            var tabledatabody = '';
            $.each(data, function (index, value) {
                debugger;
                tabledatabody += '<tr>';
                tabledatabody += ' <td>' + value.TicketID + '</td>';
                tabledatabody += ' <td>' + value.CompanyName + '</td>';
                tabledatabody += ' <td>' + value.Name + '</td>';
                tabledatabody += ' <td>' + value.Mobile + '</td>';
                tabledatabody += ' <td>' + value.Email + '</td>';
                if (value.AssignWorkerID != null && value.AssignWorkerID != "" && value.AssignWorkerID != undefined)
                {
                    var tickecollection = {};
                    tickecollection.ticketid = value.TicketID;
                    tickecollection.workerid = value.AssignWorkerID;
                    tickecollection.newstatus = value.Status;
                    
                    asssigtickewithworkid.push(tickecollection);
                }
                tabledatabody += ' <td style="width:20%"><select id=' + value.TicketID + '  name="ddlworker" class="form-control allworker"></select></td>';
                tabledatabody += ' <td><select id="ddlstatus' + value.TicketID + '" name="ddlstatus" class="form-control"><option value="1">Active</option><option value="2">Inprogress</option><option value="3">Resolved</option></select></td>';
                
                tabledatabody += ' <td><button class="btn" onclick="updateticket('+value.TicketID+')" >Update Ticket</button></td>';
                tabledatabody += ' </tr>';
                
            });


            $("#tblpendingandactiveatable tbody").append(tabledatabody);
            $.fn.dataTable.ext.errMode = 'none';
            LoadWorkder();
            $('#tblpendingandactiveatable').DataTable({
                responsive: {
                    details: {
                        type: 'column',
                        target: -2
                    }
                },

                responsive: true
            });
            setTimeout(function () {
                debugger;
                for (var i = 0; i < asssigtickewithworkid.length; i++) {
                    $("#" + asssigtickewithworkid[i].ticketid).val(asssigtickewithworkid[i].workerid);
                    $("#" + asssigtickewithworkid[i].ticketid).prop("disabled", true);
                    $("#ddlstatus" + asssigtickewithworkid[i].ticketid).val(asssigtickewithworkid[i].newstatus);
                }

            }, 1000);

         
        }
    });

   
}

function updateticket(TicketID)
{
    var wid = $("#" + TicketID).val();
    var sid = $("#ddlstatus" + TicketID).val();
    $.ajax({
        type: "GET",
        url: "Ticket/UpdateTicketstaus",
        data: { ticketid: TicketID, workerid: wid, statusid: sid },
        cache: false,
        success: function (data) {
            LoadAllTicket();

            LoadResovedTicket();
            $.alert({
                title: '',
                content: 'Ticket Updated successfully!',
                type: 'green',
            });
        }
    });
}


function LoadResovedTicket() {
    
    $.ajax({
        type: "GET",
        url: "Ticket/loadAllresolvedTicket",
        data: "",
        cache: false,
        success: function (data) {
            debugger;
            $('#tblresolvedticket').DataTable().destroy();
            $("#tblresolvedticket tbody").empty();

            var tabledatabody = '';
            $.each(data, function (index, value) {
                tabledatabody += '<tr>';
                tabledatabody += ' <td>' + value.TicketID + '</td>';
                tabledatabody += ' <td>' + value.CompanyName + '</td>';
                tabledatabody += ' <td>' + value.Name + '</td>';
                tabledatabody += ' <td>' + value.Mobile + '</td>';
                tabledatabody += ' <td>' + value.Email + '</td>';
                tabledatabody += ' <td >' + value.workername + '</td>';
                tabledatabody += ' <td>Resolved</td>';
                tabledatabody += ' </tr>';
            });


            $("#tblresolvedticket tbody").append(tabledatabody);
            $.fn.dataTable.ext.errMode = 'none';
          
            $('#tblresolvedticket').DataTable({
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