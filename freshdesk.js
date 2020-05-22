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
      var obj = data;
      var tbl=$("<table/>").attr('id','mytable');
      $('#response').append(tbl);

      for(var i=0;i<obj.length;i++)
      {
        var td1 = document.createElement('div');
        td1.setAttribute('id',`${obj[i].subject}`);
        td1.innerHTML = `${obj[i].subject}`;
        document.getElementById('mytable').appendChild(td1);
      }
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


