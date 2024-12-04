// Ensure the map is initialized only when the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Safely parse coordinates from the server
    const latitude = parseFloat('<%= listing.coordinates[1] || "0" %>');
    const longitude = parseFloat('<%= listing.coordinates[0] || "0" %>');

    // Initialize the map if the coordinates are valid
    if (latitude && longitude) {
        const map = L.map('decorative-map').setView([latitude, longitude], 13);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map);

        // Add marker
        L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`<b><%= listing.title %></b><br><%= listing.location %>, <%= listing.country %>`)
            .openPopup();
    } else {
        console.error("Invalid map coordinates provided.");
    }
});
