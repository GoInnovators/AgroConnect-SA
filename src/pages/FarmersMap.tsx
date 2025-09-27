import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { farmers } from "@/lib/demoData";
import { categories } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const FarmersMap = () => {
  const [filteredFarmers, setFilteredFarmers] = useState(farmers);
  const navigate = useNavigate();
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
          map.setView([latitude, longitude], 9);

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

    filteredFarmers.forEach((supplier) => {
      L.marker([supplier.lat, supplier.lon])
        .addTo(map)
        .bindPopup(supplier.name)
        .on("click", () => {
          navigate(`/marketplace/supplier/${supplier.id}`);
        });
    });

    return () => map.remove();
  }, [filteredFarmers]);

  const filterByCategory = (category) => {
    setFilteredFarmers(
      farmers.filter(
        (farmer) => farmer.category.toLowerCase() == category.toLowerCase()
      )
    );
  };

  return (
    <div className="min-h-screen bg-background pt-16 flex">
      <div
        id="map"
        className="h-screen w-[80svw]"
        style={{ height: "600px" }}
      ></div>
      <div className="flex flex-col items-start p-4 gap-4">
        <div>
          <h1 className="text-xl font-bold mb-2">Categories</h1>
          <p>View farmers near you.</p>
        </div>

        {categories.map((category) => (
          <Card
            key={category.key}
            onClick={() => {
              filterByCategory(category.key);
            }}
            className={`rounded-2xl w-full hover:shadow-lg p-3 font-semibold text-center flex items-center gap-1 cursor-pointer`}
          >
            <category.icon size={30} />
            {category.value}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FarmersMap;
