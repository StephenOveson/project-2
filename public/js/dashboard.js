var API = {
  getServices: function() {
    return $.ajax({
      url: "api/services",
      type: "GET"
    });
  }
};
API.getServices().then(function(data) {
  var services = data.map(function(service) {
    console.log("we are here " + service.name + service.id);
    var list = $("<li>")
      .text(service.name)
      .attr("data", service.id);
    return list;
  });
  $("#services").append(services);
});
