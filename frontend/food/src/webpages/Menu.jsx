import React, { useState } from "react";
import Navbar from "../Navbar";
import "../styles/Menu.css";

const Menu = ({ addToCart }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("All Restaurants");
  const [selectedDietary, setSelectedDietary] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [quantities, setQuantities] = useState({}); 

  const restaurants = ["All Restaurants", "Biryani Palace", "South Indian Delights", "Chaat Junction", "Tandoori Feast"];

  const dietaryOptions = ["all", "vegetarian", "non-vegetarian", "juice", "dessert"];
  
  const dishes = [
    { id: 1, name: "Masala Dosa", price: 50, rating: 4.7, cuisine: "South Indian Delights", dietary: "vegetarian", img: "https://vismaifood.com/storage/app/uploads/public/609/3dc/1d7/6093dc1d77053892307086.jpg" },
    { id: 2, name: "Butter Chicken", price: 120, rating: 4.9, cuisine: "Tandoori Feast", dietary: "non-vegetarian", img: "https://tse2.mm.bing.net/th/id/OIP.-qUPDTpevi880v0TNIo7rwHaHa?rs=1&pid=ImgDetMain" },
    { id: 3, name: "Biryani", price: 100, rating: 4.8, cuisine: "Biryani Palace", dietary: "non-vegetarian", img: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg" },
    { id: 4, name: "Aloo Paratha", price: 60, rating: 4.5, cuisine: "South Indian Delights", dietary: "vegetarian", img: "https://tse1.mm.bing.net/th/id/OIP.Y_U58sIJZ-zoYsyfTIWL6gHaJ4?rs=1&pid=ImgDetMain" },
    { id: 5, name: "Samosa", price: 20, rating: 4.3, cuisine: "Chaat Junction", dietary: "vegetarian", img: "https://tse2.mm.bing.net/th/id/OIP.9cd5aubJTQzVbCuIHJtYTwHaGl?rs=1&pid=ImgDetMain" },
    { id: 6, name: "Chole Bhature", price: 80, rating: 4.6, cuisine: "Chaat Junction", dietary: "vegetarian", img: "https://3.bp.blogspot.com/-uck7Fi_bRfw/UA7ogu0DrzI/AAAAAAAARSI/rmu9iluFJG0/s1600/cb+ten.jpg" },
    { id: 7, name: "Gulab Jamun", price: 40, rating: 4.8, cuisine: "All Restaurants", dietary: "dessert", img: "https://tse1.mm.bing.net/th/id/OIP.jHVOWwSFJmKm4WYjoOIS0QHaFk?rs=1&pid=ImgDetMain" },
    { id: 8, name: "Lassi", price: 30, rating: 4.2, cuisine: "All Restaurants", dietary: "juice", img: "https://someindiangirl.com/wp-content/uploads/2022/05/Sweet-Lassi-3-scaled.jpg" },
    { id: 9, name: "Vegan Tofu Curry", price: 70, rating: 4.4, cuisine: "Tandoori Feast", dietary: "vegan", img: "https://tse3.mm.bing.net/th/id/OIP.rZB1V_BVSrR8unmAmK_tcgHaLH?rs=1&pid=ImgDetMain" },
    { id: 10, name: "Tandoori Paneer", price: 60, rating: 4.7, cuisine: "Tandoori Feast", dietary: "vegetarian", img: "https://spicediary.com/wp-content/uploads/2020/04/20200414_200206_2-1-1-scaled.jpg" },

    { id: 11, name: "Pav Bhaji", price: 50, rating: 4.6, cuisine: "Chaat Junction", dietary: "vegetarian", img: "https://www.cookingcarnival.com/wp-content/uploads/2017/07/Pav-bhaji-5.jpg" },
    { id: 12, name: "Mutton Korma", price: 150, rating: 4.8, cuisine: "Tandoori Feast", dietary: "non-vegetarian", img:  "https://recipes.timesofindia.com/thumb/52554168.cms?imgsize=572669&width=800&height=800" },
    { id: 13, name: "Palak Paneer", price: 80, rating: 4.7, cuisine: "South Indian Delights", dietary: "vegetarian", img:  "https://tse4.mm.bing.net/th/id/OIP.seQ_Xm_1c2U2BfMuez4NdgHaLF?rs=1&pid=ImgDetMain" },
    { id: 14, name: "Vada Pav", price: 30, rating: 4.3, cuisine: "Chaat Junction", dietary: "vegetarian", img:  "https://tse3.mm.bing.net/th/id/OIP.IejK-E1rEw4G-U7kXo1pUAHaHW?rs=1&pid=ImgDetMain" },
    { id: 15, name: "Fish Curry", price: 120, rating: 4.5, cuisine: "Biryani Palace", dietary: "non-vegetarian", img: "https://www.licious.in/blog/wp-content/uploads/2022/03/shutterstock_1891229335-min.jpg" },
     { id: 16, name: "Falooda", price: 50, rating: 4.4, cuisine: "All Restaurants", dietary: "dessert", img: "https://tse3.mm.bing.net/th/id/OIP.F8fTmA0PiLiAtmr0LSoPLwHaJM?rs=1&pid=ImgDetMain" },
     { id: 17, name: "Orange Juice", price: 35, rating: 4.6, cuisine: "All Restaurants", dietary: "juice", img: "https://wallpaperaccess.com/full/2185825.jpg" },
     { id: 18, name: "Watermelon Juice", price: 40, rating: 4.7, cuisine: "All Restaurants", dietary: "juice", img: "https://tse2.mm.bing.net/th/id/OIP.RMGgMKGBJKYmXDhKiDc3tQHaHa?rs=1&pid=ImgDetMain" },
   
  ];
  


  const filteredDishes = dishes.filter((dish) => {
    const matchesRestaurant = selectedRestaurant ==="All Restaurants"||dish.cuisine===selectedRestaurant;
    const matchesDietary = selectedDietary==="all"|| dish.dietary===selectedDietary;
    return matchesRestaurant && matchesDietary;
  });

  const sortedDishes = filteredDishes.sort((a, b) => {
    if (sortOrder==="ascending") return a.price-b.price;
    if (sortOrder==="descending") return b.price-a.price;
    return 0;
  });

  const handleAddToCart = (dish) => {
    addToCart(dish); 
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [dish.id]:(prevQuantities[dish.id]||0)+1,
    }));
  };

  return (
    <div className="container">
      <section>
        <div className="filterSection">
          <select value={selectedRestaurant} onChange={(e) => setSelectedRestaurant(e.target.value)}>
            {restaurants.map((restaurant, index) => (
              <option key={index} value={restaurant}>{restaurant}</option>
            ))}
          </select>
          <select value={selectedDietary} onChange={(e) => setSelectedDietary(e.target.value)}>
            {dietaryOptions.map((option, index) => (
              <option key={index} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
            ))}
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Sort by Price</option>
            <option value="ascending">Price: Low to High</option>
            <option value="descending">Price: High to Low</option>
          </select>
        </div>
      </section>

      <div className="menuSection">
        {sortedDishes.map((dish) => (
          <div key={dish.id} className="dishCard">
            <img src={dish.img} alt={dish.name} className="dishImage" />
            <h3 className="dishName">{dish.name}</h3>
            <p className="dishPrice">Price: ${dish.price.toFixed(2)}</p>
            <p className="dishRating">Rating: {dish.rating}</p>
            <p className="dishCuisine">Cuisine: {dish.cuisine}</p>
            <button 
              className={`addToCartButton ${quantities[dish.id] ? 'added' : ''}`} 
              onClick={() => handleAddToCart(dish)}
            >
              {quantities[dish.id]?'Added':'Add to Cart'}
            </button>
            {quantities[dish.id] && <p className="quantityCount">Quantity: {quantities[dish.id]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
