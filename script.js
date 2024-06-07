
const locationBtn = document.getElementById("location-btn");

locationBtn.addEventListener("click", getLocation);

function getLocation() {
 navigator.geolocation
   ? alert("Geolocation is not supported by this browser.")
    : navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  alert(`Your location is: ${latitude}, ${longitude}`);
}