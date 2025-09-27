import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { farmers } from "@/lib/demoData";

const FarmersMap = () => {
  useEffect(() => {
    // Initialize map with default location first
    const map = L.map("map").setView([0, 0], 2);

    // OpenStreetMap tiles
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 13);

          // Optional: Add a marker for user's location
          L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup("You are here")
            .openPopup();
        },
        () => {
          console.warn("Geolocation permission denied or unavailable");
        }
      );
    }

    // Example supplier markers

    farmers.forEach((supplier) => {
      L.marker([supplier.lat, supplier.lon])
        .addTo(map)
        .bindPopup(supplier.name)
        .on("click", () => {
          window.location.href = `/marketplace/supplier/${supplier.id}`;
        });
    });

    return () => map.remove();
  }, []);

  return (
    <div className="min-h-screen bg-background pt-14 flex items-center justify-center">
      <div
        id="map"
        className="h-screen"
        style={{ width: "100%", height: "600px" }}
      ></div>
    </div>
  );
};

export default FarmersMap;
