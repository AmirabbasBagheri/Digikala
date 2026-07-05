import L from "leaflet";
import "leaflet/dist/leaflet.css";

const map = L.map("map").setView([35.6892, 51.389], 10);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);

let marker;

map.on("click", (e) => {
    const { lat, lng } = e.latlng;

    if (marker) {
        marker.remove();
    }

    marker = L.marker([lat, lng]).addTo(map);

    console.log("Latitude:", lat);
    console.log("Longitude:", lng);
});
