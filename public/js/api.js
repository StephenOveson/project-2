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
          var id = $(this).data("id");
          API.getCosmetologistService(id).then(function(data) {
            var cosmetologists = data.map(function(cosmetologist) {
              var div = $("<div>");
              var p = $("<p>");
              var select = $("<button>")
                .text(cosmetologist.Name)
                .attr("data-id", cosmetologist.id)
                .on("click", function() {
                  $("#service-title").text("Availability");
                  $("#pickYour").text("Day!");
                  id = $(this).data("id");
                  API.getAvailability(id).then(function(data) {
                    var availabilities = data.map(function(availability) {
                      console.log(availability.dayOfWeek);
                      var newButton = $("<button>")
                        .text(availability.dayOfWeek)
                        .on("click", function() {
                          $("#service-title").text("Checkout");
                          $("#emptyPickYour").empty();
                          $("#services").empty();
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
  });
};

displayUser();
