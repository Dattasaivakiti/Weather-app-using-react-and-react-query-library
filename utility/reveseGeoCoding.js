export async function fetchReverseGeocode({ queryKey }) {
  const [, lat, lon] = queryKey;

  if (!lat || !lon) {
    throw new Error("Latitude and longitude are required");
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse` +
      `?lat=${lat}` +
      `&lon=${lon}` +
      `&format=json`,
    {
      headers: {
        // REQUIRED by OpenStreetMap Nominatim
        "User-Agent": "WeatherApp/1.0 (contact@yourapp.com)",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to reverse geocode location");
  }

  const data = await response.json();

  if (!data?.address) {
    throw new Error("Location not found");
  }

  const address = data.address;

  return {
    city:
      address.city || address.town || address.village || address.state || "",
    country: address.country || "",
  };
}
