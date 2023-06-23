import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useState, useEffect, useRef } from "react";

const Map = () => {
  const [visibleArea, setVisibleArea] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && visibleArea) {
      const { minLatitude, maxLatitude, minLongitude, maxLongitude } =
        visibleArea;

      const apiUrl = `https://api.bannergress.com/bnrs?orderBy=created&orderDirection=DESC&online=true&minLatitude=${minLatitude}&maxLatitude=${maxLatitude}&minLongitude=${minLongitude}&maxLongitude=${maxLongitude}&limit=100`;

      console.log("API URL:", apiUrl);

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching banners:", error);
        });
    }
  }, [mapRef.current, visibleArea]);

  const MapEvents = () => {
    useMapEvents({
      moveend: () => {
        console.log("move end");
        if (mapRef.current && mapRef.current._container) {
          const bounds = mapRef.current.getBounds();
          const { _southWest, _northEast } = bounds;
          const { lat: minLatitude, lng: minLongitude } = _southWest;
          const { lat: maxLatitude, lng: maxLongitude } = _northEast;

          setVisibleArea({
            minLatitude,
            maxLatitude,
            minLongitude,
            maxLongitude,
          });
        }
      },
    });

    return null;
  };

  return (
    <div>
      <MapContainer
        id="map"
        center={[52.221058, 6.893297]}
        zoom={15}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors. This website is NOT affiliated with Bannergress in any way!'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents />
      </MapContainer>
    </div>
  );
};

export default Map;
