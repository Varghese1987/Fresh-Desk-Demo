document.body.innerHTML = `
<div class = "container cont2">
<div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Service Requests
        </button>
      </h2>
    </div>
    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
        <p>
        <center><a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Create a New Ticket</a></center>
        </p>
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            <form>
                    <div class="form-group">
                        <label for="subject">Subject</label>
                        <input type="text" class="form-control" id="subject" placeholder="Ticket Subject">
                    </div>
                    <div class="form-group">
                      <label for="Textarea">Example textarea</label>
                      <textarea class="form-control" id="Textarea" rows="3"></textarea>
                    </div>
                    <button id = "create" type="submit" class="btn btn-primary">Submit</button>
                </form>          

          </div>
        </div>
        <div id = "ticket"class = "row"></div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h2 class="mb-0">
        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Contacts
        </button>
      </h2>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body">
        
        <p>
          <center><a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Create a new Contact</a></center>
        </p>
        <div class="collapse" id="collapseExample">
          <div class="card card-body">

            <form>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" class="form-control" id="email" placeholder="@email">
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="text" class="form-control" id="phone" placeholder="Phone Number">
                    </div>
                    
                    <button id = "create1" type="submit" class="btn btn-primary">Submit</button>
                </form>          

          </div>
        </div>

        <div id = "contact"class = "row"></div>

      </div>
    </div>
  </div>
  
</div>
</div>
`

$(document).ready(function () {
  var yourdomain = 'varghese87es';
  var api_key = '2lvC7tLptQmim0c4QmEn';

  $.ajax(
    {
      url: "https://" + yourdomain + ".freshdesk.com/api/v2/tickets?include=description",
      type: 'GET',
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: { "Authorization": "Basic " + btoa(api_key + ":x") },
      success: function (data) {
        console.log(data);
        console.log(data[0].id)
        function template(ticket) {
          return `
        <div class="card col-lg-12">
          <h5 class="card-header">${ticket.subject}</h5>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">${ticket.description}</p>
            
          </div>
          <div class="card-footer bg-transparent border-success">
          <button id = "but${ticket.id}" type="button" onclick = "deleteTicket('${ticket.id}')" class="btn btn-primary">Delete</button>
          </div>
        </div>
        `

        }
        document.getElementById('ticket').innerHTML = `${data.map(template).join('')}`

      },
      error: function () {
        alert("Page Load Error");
      }
    });

  $("#create").click(
    function () {

      var ticketSub = document.getElementById('subject').value;
      var ticketDes = document.getElementById('Textarea').value;

      alert(ticketSub);

      ticket_data = '{ "description": "' + ticketDes + '", "subject": "' + ticketSub + '", "email": "tom@outerspace.com", "priority": 1, "status": 2, "cc_emails": ["ram@freshdesk.com","diana@freshdesk.com"] }';

      $.ajax(
        {
          url: "https://" + yourdomain + ".freshdesk.com/api/v2/tickets",
          type: 'POST',
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          headers: {
            "Authorization": "Basic " + btoa(api_key + ":x")
          },
          data: ticket_data,
        }
      );

    }
  );

  $.ajax(
    {
      url: "https://" + yourdomain + ".freshdesk.com/api/v2/contacts",
      type: 'GET',
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: { "Authorization": "Basic " + btoa(api_key + ":x") },
      success: function (data) {
        console.log(data);

        function template(item) {
          return `
        <div class = "col-lg-3">
        <div class="card">
          <h5 class="card-header">${item.name}</h5>
          <div class="card-body">
            <p class="card-text">${item.email}</p>
            <p class="card-text">${item.phone}</p>
            
          </div>
          <div class="card-footer bg-transparent border-success">
          <button id = "but${item.id}" type="button" onclick = "deleteContact('${item.id}')" type="button" class="btn btn-primary">Delete</button>
          </div>
        </div>
        </div>
        `
        }
        document.getElementById('contact').innerHTML = `${data.map(template).join('')}`
      },
      error: function () {
        alert("Page Load Error");
      }
    });

  $("#create1").click(
    function () {

      var name = document.getElementById('name').value;
      var email = document.getElementById('email').value;
      var phone = document.getElementById('phone').value;

      alert(name);

      contact_data = '{ "name": "' + name + '", "email": ' + email + ', "phone":' + phone + '}';

      $.ajax(
        {
          url: "https://" + yourdomain + ".freshdesk.com/api/v2/contacts",
          type: 'POST',
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          headers: {
            "Authorization": "Basic " + btoa(api_key + ":x")
          },
          data: contact_data,
        }
      );

    }
  );

});

function deleteTicket(value) {

  var yourdomain = 'varghese87es';
  var api_key = '2lvC7tLptQmim0c4QmEn';
  var ticket_id = value;

  $.ajax(
    {
      url: "https://" + yourdomain + ".freshdesk.com/api/v2/tickets/" + ticket_id,
      type: 'DELETE',
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: { "Authorization": "Basic " + btoa(api_key + ":x") },
      success: function () {
        alert("Data Deleted");
        location.reload(true);
      },
      error: function () {
        alert("Page Load Error");
      }
    });

}

function deleteContact(value) {

  var yourdomain = 'varghese87es';
  var api_key = '2lvC7tLptQmim0c4QmEn';
  var ticket_id = value;

  $.ajax(
    {
      url: "https://" + yourdomain + ".freshdesk.com/api/v2/contacts/" + ticket_id,
      type: 'DELETE',
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: { "Authorization": "Basic " + btoa(api_key + ":x") },
      success: function () {
        alert("Data Deleted");
        location.reload(true);
      },
      error: function () {
        alert("Page Load Error");
      }
    });

}
