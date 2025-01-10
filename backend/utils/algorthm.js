/**
 * Generate random points within a circle of a given radius around a center point.
 *
 * @param {number} centerLat - Latitude of the center.
 * @param {number} centerLng - Longitude of the center.
 * @param {number} radiusInKm - Radius of the circle in kilometers.
 * @param {number} numPoints - Number of random points to generate.
 * @returns {Array<{lat: number, lng: number}>} - Array of random latitude and longitude points.
 */
function generateRandomPoints(centerLat, centerLng, radiusInKm, numPoints) {
    const points = [];
    const earthRadiusInKm = 6371; // Earth's radius in kilometers

    for (let i = 0; i < numPoints; i++) {
        // Generate a random distance within the circle
        const randomDistance = Math.sqrt(Math.random()) * radiusInKm;

        // Generate a random angle in radians
        const randomAngle = Math.random() * 2 * Math.PI;

        // Convert distance to radians
        const distanceInRadians = randomDistance / earthRadiusInKm;

        // Calculate the new latitude
        const newLat = Math.asin(
            Math.sin(centerLat * Math.PI / 180) * Math.cos(distanceInRadians) +
            Math.cos(centerLat * Math.PI / 180) * Math.sin(distanceInRadians) * Math.cos(randomAngle)
        );

        // Calculate the new longitude
        const newLng = centerLng * Math.PI / 180 +
            Math.atan2(
                Math.sin(randomAngle) * Math.sin(distanceInRadians) * Math.cos(centerLat * Math.PI / 180),
                Math.cos(distanceInRadians) - Math.sin(centerLat * Math.PI / 180) * Math.sin(newLat)
            );

        // Convert radians back to degrees and store the point
        points.push({
            lat: newLat * 180 / Math.PI,
            lng: newLng * 180 / Math.PI
        });
    }

    return points;
}

/**
 * Calculate the great-circle distance between two points using the Haversine formula.
 *
 * @param {number} lat1 - Latitude of the first point.
 * @param {number} lon1 - Longitude of the first point.
 * @param {number} lat2 - Latitude of the second point.
 * @param {number} lon2 - Longitude of the second point.
 * @returns {number} - Distance in kilometers.
 */
function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degrees) => degrees * Math.PI / 180;

    const earthRadiusInKm = 6371; // Radius of Earth in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusInKm * c;
}


/**
 * Calculate the time taken by drone from point A to point B
 *
 * @param {number} lat1 - Latitude of the first point.
 * @param {number} lon1 - Longitude of the first point.
 * @param {number} lat2 - Latitude of the second point.
 * @param {number} lon2 - Longitude of the second point.
 * @returns {number} - Distance in kilometers.
 */

function droneTime(lat1, lon1, lat2, lon2) {
    const speed = 50; // 50 km/hr
    const distance = haversineDistance(lat1, lon1, lat2, lon2);
    const time = distance/speed;
    return time; //in seconds
}


/**
 * Calculate the time taken by drone from point A to point B
 *
 * @param {Array<{lat: number, lng: number}>}
 * @returns {number} - Distance in kilometers.
 */
// Calculate distances between consecutive points
function calculateTotalDistance(randomPoints) {
    let distance = 0; // Use 'let' instead of 'const' for a variable that will be reassigned
    for (let i = 0; i < randomPoints.length - 1; i++) {
        const pointA = randomPoints[i];
        const pointB = randomPoints[i + 1];
        distance += haversineDistance(pointA.lat, pointA.lng, pointB.lat, pointB.lng); // Add the distance between the two points
    }
    return distance; // Return the total distance
}


// Example usage
const centerLat = 37.7749; // Example: San Francisco latitude
const centerLng = -122.4194; // Example: San Francisco longitude
const radiusInKm = 2; // 2 km radius
const numPoints = 5; // Generate 100 points

// Generate random points
const randomPoints = generateRandomPoints(centerLat, centerLng, radiusInKm, numPoints);

// console.log("Generated Points:");
// console.log(randomPoints);
const totalDistance = calculateTotalDistance(randomPoints);
// console.log(totalDistance);


module.exports = {  generateRandomPoints, haversineDistance, droneTime, calculateTotalDistance };