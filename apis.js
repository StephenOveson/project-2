// Gets location from form
// geoCode();
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
