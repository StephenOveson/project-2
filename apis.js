// initializes autocomplete 
google.maps.event.addDomListener(window, 'load', initialize);

// Gets location from form
let locationForm = document.getElementById('location-form');
// listens for submit
locationForm.addEventListener("submit", geoCode);
// console.log(locationForm);

// Google Maps API
function geoCode(e) {
    e.preventDefault();
    let location = document.getElementById('location-input').value;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: location,
            key: 'AIzaSyBh7_wqsxDnrK6Am24-ZE2fSjm5_6AnjAA'
        }
    }) .then(function(response){
        console.log(response);
        
        // Formatted Address
        let formattedAddress = response.data.results[0].formatted_address;
        let formattedAddressOutput = `
        <ul class="list-group">
            <li class="list-group-item">${formattedAddress}</li>
            </ul>
        `;
        // Address Components
        let addressComponents = response.data.results[0].address_components;
        let addressComponentsOutput = '<ul class="list-group">';
        for (let i = 0; i < addressComponents.length;i++){
            addressComponentsOutput += `
            <li
            class="list-group-item"><strong>${addressComponents[i].types[0]
            }</strong>: ${addressComponents[i].long_name}</li>
            `;
        }
        addressComponentsOutput += '</ul>';

        // Longtitude & Latitude 
        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        let geometryOutput = `
            <ul class="list-group">
            <li class="list-group-item"><strong>Latitude</strong>${lat}</li>
            <li class="list-group-item"><strong>longtitude</strong>${lng}</li>
            </ul>
        `;


        // output to the view
        document.getElementById("formatted-address").innerHTML = formattedAddressOutput;
        document.getElementById("address-components").innerHTML = addressComponentsOutput;
        document.getElementById("geometry").innerHTML = geometryOutput;


    }).catch(function(error){
        console.log(error);
    })

};


// function that starts autocomplete
function initialize() {
    let input = document.getElementById('location-input');
    let autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function() {
        let place = autocomplete.getPlace();
        // place variable will have the info we are looking for 
        $('#lat').val(place.geometry['location'].lat());
        $('#long').val(place.geometry['location'].lng());
        
        
    })
};

function searchLocations() {
    var address = document.getElementById("addressInput").value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
       searchLocationsNear(results[0].geometry.location);
      } else {
        alert(address + ' not found');
      }
    });
  }

  function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;

    locationSelect.innerHTML = "";
    var option = document.createElement("option");
    option.value = "none";
    option.innerHTML = "See all results:";
    locationSelect.appendChild(option);
  }

  function searchLocationsNear(center) {
    clearLocations();

    var radius = document.getElementById('radiusSelect').value;
    var searchUrl = 'storelocator.php?lat=' + center.lat() + '&lng=' + center.lng() + '&radius=' + radius;
    downloadUrl(searchUrl, function(data) {
      var xml = parseXml(data);
      var markerNodes = xml.documentElement.getElementsByTagName("marker");
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < markerNodes.length; i++) {
        var id = markerNodes[i].getAttribute("id");
        var name = markerNodes[i].getAttribute("name");
        var address = markerNodes[i].getAttribute("address");
        var distance = parseFloat(markerNodes[i].getAttribute("distance"));
        var latlng = new google.maps.LatLng(
             parseFloat(markerNodes[i].getAttribute("lat")),
             parseFloat(markerNodes[i].getAttribute("lng")));

        createOption(name, distance, i);
        createMarker(latlng, name, address);
        bounds.extend(latlng);
      }
      map.fitBounds(bounds);
      locationSelect.style.visibility = "visible";
      locationSelect.onchange = function() {
        var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
        google.maps.event.trigger(markers[markerNum], 'click');
      };
    });
  }

  function createMarker(latlng, name, address) {
     var html = "<b>" + name + "</b> <br/>" + address;
     var marker = new google.maps.Marker({
       map: map,
       position: latlng
     });
     google.maps.event.addListener(marker, 'click', function() {
       infoWindow.setContent(html);
       infoWindow.open(map, marker);
     });
     markers.push(marker);
   }

  function createOption(name, distance, num) {
     var option = document.createElement("option");
     option.value = num;
     option.innerHTML = name;
     locationSelect.appendChild(option);
  }

  function downloadUrl(url, callback) {
     var request = window.ActiveXObject ?
         new ActiveXObject('Microsoft.XMLHTTP') :
         new XMLHttpRequest;

     request.onreadystatechange = function() {
       if (request.readyState == 4) {
         request.onreadystatechange = doNothing;
         callback(request.responseText, request.status);
       }
     };

     request.open('GET', url, true);
     request.send(null);
  }

  function parseXml(str) {
     if (window.ActiveXObject) {
       var doc = new ActiveXObject('Microsoft.XMLDOM');
       doc.loadXML(str);
       return doc;
     } else if (window.DOMParser) {
       return (new DOMParser).parseFromString(str, 'text/xml');
     }
  }

  function doNothing() {}
</script>


// create mysql database
// CREATE TABLE 'markers' (
//     `id` INT NOT NULL AUTO INCREMENT PRIMARY KEY ,
//     `name` VARCHAR(60) NOT NULL,
//     `address` VARCHAR(80) NOT NULL,
//     `lat` FLOAT(10, 6) NOT NULL,
//     `lng` FLOAT(10, 6) NOT NULL,
//     `type` VARCHAR(30) NOT NULL,
// )


// query for beauticians to upload into location of business to database
// let sql = `INSERT INTO user
//     (
//     Name, Email, Address, City, Country,
//     )
//     VALUES
//     (
//         ?, ?, ?, ?
//          )`;
        // Connection.query(sql, [name, email, address, city, country], function(err,data) {
            // if(err) {
                // some error occured
            // } else {
                // succesfully inserted into db
            // }
        // });
        
        
// let service = new google.maps.places.PlacesService(document.createElement('div'));

