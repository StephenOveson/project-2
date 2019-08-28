// Gets location from form
let locationForm = document.getElementById('location-form');

// listens for submit
locationForm.addEventListener('submit', geocode);
// Google Maps API
function geoCode() {
    let location = document.getElementById('location-input');
    axios.get("https://maps.googleapis.come/maps/api/geocode/json", {
        params: {
            address: location,
            key: "AIzaSyA-MSaLJHOpjrqvNUrp8GJNiO-n1_hbAtA"
        }
    }).then(function(response){
        console.log(response);
        
        // Formatted Address
        let formattedAddress = response.data.results[0].formatted_Adress;
        let formattedAddressOutput = `
        <ul class="list-group">
            <li class="list-group-item">${formattedAddress}</li>
            </ul>
        `;
        // Address Components
        let addressComponents = response.data.results[0].address_Components;
        let addressComponentsOutput = '<ul class="list=group">';
        for (let i = 0; i < addressComponents.length;i++){
            addressComponentsOutput += `
            <li
            class="list-group-item"><strong>${addressComponents[i].types[0]
            }</strong>: ${addressComponents[i].long_name}</li>
            `;
        }
        addressComponentsOutput += '</ul>';

        // Longtitude & Latitude 
        let latitude = response.data.results[0].geometry.location.latitude;
        let longtitude = response.data.results[0].geometry.location.longtitude;
        let geometryOutput = `
            <ul class="list-group">
            <li class="list-group-item"><strong>Latitude</strong>${latitude}</li>
            <li class="list-group-item"><strong>longtitude</strong>${longtitude}</li>
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

geoCode();