import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

type MapComponentProps = {
  // control: Control<any>;
  // setValue: UseFormSetValue<any>;
  // latitudeName: string;
  // longitudeName: string;
  latitude: string;
  longitude: string;
  height?: string;
  isInitalLocation?: Boolean;
};

const MapComponent: React.FC<MapComponentProps> = ({
  // control,
  // setValue,
  // latitudeName,
  // longitudeName,
  latitude,
  longitude,
  height = "522px",
  isInitalLocation = true,
}) => {
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBWgrqXm8f23ir4QTLMBzwZX-MyJ3T6vNQ", // Replace with your API key
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    if (latitude && longitude) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        setMarkerPosition({ lat, lng });
      }
    }
  }, [latitude, longitude]);

  useEffect(() => {
    // Get the user's current location
    if (isInitalLocation) {
      console.log("Inital is running again and again");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
            setMarkerPosition({ lat: latitude, lng: longitude });
            // setValue(latitudeName, latitude.toString());
            // setValue(longitudeName, longitude.toString());
            // formData((prevData: any) => ({
            //   ...prevData,
            //   latitude: latitude.toString(),
            //   longitude: longitude.toString(),
            // }));
          },
          (error) => {
            console.error("Error getting user's location:", error);
            // Fallback to default center if geolocation fails
            setMarkerPosition(defaultCenter);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        // Fallback to default center if geolocation is not supported
        setMarkerPosition(defaultCenter);
      }
    }
  }, [isInitalLocation]);

  const onMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      const lat = event.latLng?.lat();
      const lng = event.latLng?.lng();

      if (lat && lng) {
        setMarkerPosition({ lat, lng });
        // formData((prevData: any) => ({
        //   ...prevData,
        //   latitude: lat.toString(),
        //   longitude: lng.toString(),
        // }));
        // setValue(latitudeName, lat.toString());
        // setValue(longitudeName, lng.toString());
      }
    },
    []
  );

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-full h-full">
      {/* <Controller
        name={latitudeName} */}
      {/* // control={control} */}
      {/* render={() => ( */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={18}
        onClick={onMapClick}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
      {/* )} */}
      {/* /> */}
    </div>
  );
};

export default MapComponent;
