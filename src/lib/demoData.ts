// Import farmer images
import tomatoesImg from "@/assets/tomatoes.jpg";
import maizeImg from "@/assets/maize.jpg";
import carrotsImg from "@/assets/carrots.jpg";
import lettuceImg from "@/assets/lettuce.jpg";
import potatoesImg from "@/assets/potatoes.jpg";
import spinachImg from "@/assets/spinach.jpg";

export const farmers = [
  {
    id: "grains4lyf",
    name: "Grains 4Lyf",
    farmer: "Johannes van der Merwe",
    location: "Free State",
    category: "grains",
    qualityGrade: "A",
    price: 4.2,
    unit: "kg",
    quantity: "2 tons available",
    rating: 4.7,
    verified: true,
    harvestDate: "2024-01-10",
    description: "Grade 1 yellow maize, moisture content 12.5%",
    image: maizeImg,
    lat: -28.4541,
    lon: 26.7968, // Bloemfontein, Free State
  },
  {
    id: "carrotcity",
    name: "CarrotCity",
    farmer: "Maria Santos",
    location: "Western Cape",
    category: "fruit-veg",
    qualityGrade: "A+",
    price: 18.25,
    unit: "kg",
    quantity: "300kg available",
    rating: 4.8,
    verified: true,
    harvestDate: "2024-01-16",
    description: "Fresh organic carrots with excellent nutritional value",
    image: carrotsImg,
    lat: -33.9249,
    lon: 18.4241, // Cape Town, Western Cape
  },
  {
    id: "fruity-town",
    name: "Fruity Town",
    farmer: "David Ntuli",
    location: "Limpopo",
    category: "fruit-veg",
    qualityGrade: "A",
    price: 15.0,
    unit: "kg",
    quantity: "200kg available",
    rating: 4.6,
    verified: true,
    harvestDate: "2024-01-12",
    description: "Fresh organic lettuce, perfect for salads and sandwiches",
    image: lettuceImg,
    lat: -23.9045,
    lon: 29.4689, // Polokwane, Limpopo
  },
  {
    id: "qualityveggies",
    name: "QualityVeggies",
    farmer: "Grace Mokoena",
    location: "Gauteng",
    category: "fruit-veg",
    qualityGrade: "B+",
    price: 12.5,
    unit: "kg",
    quantity: "150kg available",
    rating: 4.4,
    verified: false,
    harvestDate: "2024-01-14",
    description: "Quality potatoes suitable for various cooking methods",
    image: potatoesImg,
    lat: -26.2041,
    lon: 28.0473, // Johannesburg, Gauteng
  },
  {
    id: "freshsupplies",
    name: "FreshSupplies",
    farmer: "Peter Mokaba",
    location: "Mpumalanga",
    category: "fruit-veg",
    qualityGrade: "A+",
    price: 22.0,
    unit: "kg",
    quantity: "100kg available",
    rating: 4.7,
    verified: true,
    harvestDate: "2024-01-16",
    description: "Fresh, nutrient-rich spinach leaves",
    image: spinachImg,
    lat: -25.4658,
    lon: 30.9853, // Nelspruit (Mbombela), Mpumalanga
  },
];
