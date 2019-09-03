var API = {
  getServices: function() {
    return $.ajax({
      url: "api/services",
      type: "GET"
    });
  }
};

// var selectService = function() {
//   $("#selectService").on("click", function() {
//     console.log($(this).data("id"));
//   });
// };

var displayServices = function() {
  API.getServices().then(function(data) {
    var services = data.map(function(service) {
      var button = $("<button>")
        .text(service.name + " " + "$" + service.cost)
        .attr("data-id", service.id)
        .addClass("service-button")
        .on("click", function() {
          console.log($(this).data("id"));
          
        });
      return button;
    });
    $("#services").append(services);
  });
};

displayServices();
