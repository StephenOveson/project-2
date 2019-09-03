var API = {
  getServices: function() {
    return $.ajax({
      url: "api/services",
      type: "GET"
    });
  },
  getCosmetologists: function(id) {
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
          var id = $(this).data("id");
          API.getCosmetologists(id).then(function(data) {
            var cosmetologists = data.map(function(cosmetologist) {
              var div = $("<div>");
              var p = $("<p>")
                .text("Would you like " + cosmetologist.Name)
                .text("to perform " + cosmetologist.Services[0].name)
                .text(
                  "The " +
                    cosmetologist.Services[0].name +
                    " will cost " +
                    "$" +
                    cosmetologist.Services[0].cost
                );
              var select = $("<button>")
                .text(cosmetologist.Name)
                .attr("data-id", cosmetologist.id)
                .on("click", function() {
                  id = $(this).data("id");
                  API.getAvailability(id).then(function(data) {
                    var availabilities = data.map(function(availability) {
                      console.log(availability.dayOfWeek);
                      var newButton = $("<button>").text(
                        availability.dayOfWeek
                      );
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

var displayName = function() {
  API.getCustomer().then(function(data) {
    var a = $("<a>")
      .text(data[0].Name)
      .attr("href", "/profile.html")
      .attr("style", "color: white;");
    $("#customerName").append(a);
  });
};

displayName();
