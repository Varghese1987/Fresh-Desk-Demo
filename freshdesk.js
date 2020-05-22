var div_cont = document.createElement('div');
div_cont.setAttribute('class', 'container bg');
document.body.appendChild(div_cont);

var div_row = document.createElement('div');
div_row.setAttribute('class', 'row');
div_cont.appendChild(div_row);

$(document).ready(function(){
var yourdomain = 'varghese87es'; 
var api_key = '2lvC7tLptQmim0c4QmEn'; 

$.ajax(
  {
    url: "https://"+yourdomain+".freshdesk.com/api/v2/tickets?include=description",
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {"Authorization": "Basic " + btoa(api_key + ":x")},
    success: function(data)
    {
      console.log(data);
      
      function template(ticket) {
        return `
        <div class = "col-lg-4">
        <div class="card" style="width: 18rem; height:15rem; margin:1rem;">
        <h5>${ticket.subject}</h5>
        
        <p class="card-text">Click on the flag image for weather </p>
        </div>
        </div>
        `
    }
    div_row.innerHTML = `${data.map(template).join('')}`

      // var tbl=$("<table/>").attr('id','mytable');
      // $('#response').append(tbl);

      // for(var i=0;i<obj.length;i++)
      // {
      //   var td1 = document.createElement('div');
      //   td1.setAttribute('id',`${obj[i].subject}`);
      //   td1.innerHTML = `${obj[i].subject}`;
      //   document.getElementById('mytable').appendChild(td1);
      // }
    },
    error: function(){
        $('#response').html("Page Load Error");
    }
});

$("#create").click(
  function() {

    var ticketSub = "Ticket3"

    ticket_data = '{ "description": "Details about the issue...", "subject": "'+ticketSub+'", "email": "tom@outerspace.com", "priority": 1, "status": 2, "cc_emails": ["ram@freshdesk.com","diana@freshdesk.com"] }';

    $.ajax(
      {
        url: "https://"+yourdomain+".freshdesk.com/api/v2/tickets",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "Authorization": "Basic " + btoa(api_key + ":x")
        },
        data: ticket_data,
      }      
    );
    location.reload(true);
  }
);

});