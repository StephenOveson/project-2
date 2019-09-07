var API = {
  getServices: function() {
    return $.ajax({
      url: "api/services",
      type: "GET"
    });
  },
  getCosmetologistService: function(id) {
    return $.ajax({
      url: "api/cosmetologist/service/" + id,
      type: "GET"
    });
  },
  getCustomer: function() {
    return $.ajax({
      url: "api/customer",
      type: "GET"
    });
  },
  getAvailability: function(id) {
    return $.ajax({
      url: "api/availabilities/" + id,
      type: "GET"
    });
  },
  getCosmetologist: function() {
    return $.ajax({
      url: "api/cosmetologist",
      type: "GET"
    });
  },
  getAppointment: function() {
    return $.ajax({
      url: "api/appointment",
      type: "GET"
    });
  },
  postAppointment: function(day, cosmoId, servId) {
    return $.ajax({
      url: "api/appointment/new",
      type: "POST",
      data: {
        Time: day,
        cosmetologistId: cosmoId,
        serviceId: servId
      }
    });
  },
  deleteCustomer: function(id) {
    return $.ajax({
      url: "api/customer/" + id,
      type: "DELETE"
    });
  }
};

var displayServices = function() {
  API.getServices().then(function(data) {
    var services = data.map(function(service) {
      var button = $("<button>")
        .text(service.name + " " + "$" + service.cost)
        .attr("data-id", service.id)
        .addClass("service-button")
        .on("click", function() {
          $("#service-title").text("Cosmetologists");
          $("#pickYour").text("Cosmetologist!");
          var servId = $(this).data("id");
          API.getCosmetologistService(servId).then(function(data) {
            var cosmetologists = data.map(function(cosmetologist) {
              var div = $("<div>");
              var p = $("<p>");
              var select = $("<button>")
                .text(cosmetologist.Name)
                .attr("data-id", cosmetologist.id)
                .on("click", function() {
                  $("#service-title").text("Availability");
                  $("#pickYour").text("Day!");
                  var cosmoId = $(this).data("id");
                  API.getAvailability(cosmoId).then(function(data) {
                    var availabilities = data.map(function(availability) {
                      console.log(availability.dayOfWeek);
                      var newButton = $("<button>")
                        .text(availability.dayOfWeek)
                        .attr("data-day", availability.dayOfWeek)
                        .on("click", function() {
                          var day = $(this).data("day");
                          $("#service-title").text("Appointments!");
                          $("#emptyPickYour").empty();
                          $("#services").empty();
                          API.postAppointment(day, cosmoId, servId);
                        });
                      return newButton;
                    });
                    $("#services").empty();
                    $("#services").append(availabilities);
                  });
                });
              div.append(select);
              div.append(p);
              return div;
            });
            $("#services").empty();
            $("#services").append(cosmetologists);
          });
        });
      return button;
    });
    $("#services").append(services);
  });
};

displayServices();

var displayUser = function() {
  API.getCustomer().then(function(data) {
    var result = data[0];
    var a = $("<a>")
      .text(result.Name)
      .attr("href", "/profile.html");
    var p = $("<p>").text(result.Name);
    $("#customerName").append(a);
    $("#profileUser").append(p);
    $("#userName").append(result.Name);
    $("#accountId").append(" " + result.id);
    $("#userEmail").append(result.Email);
    var deleteButton = $("<button>")
      .text("Delete Account")
      .attr("data-id", result.id)
      .on("click", function() {
        var deleteUser = $(this).data("id");
        API.deleteCustomer(deleteUser);
      });
    $("#deleteButton").append(deleteButton);
    API.getAppointment().then(function(data) {
      var appointments = data.map(function(appointment) {
        var div = $("<div>");
        var day = $("<p>").text(appointment.Time);
        div.append(day);
      });
      return appointments;
    });
  });
};

displayUser();
