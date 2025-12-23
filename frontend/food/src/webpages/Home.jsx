import React, { useState } from "react";
import Navbar from "../Navbar";
import "../styles/Home.css";

const Home = () => {
  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Delicious Food Delivered to Your Doorstep</h1>
          <p className="hero-subtitle">Explore the best restaurants and dishes near you.</p>
        </div>
      </section>

      <section className="category-section">
        <h2 className="section-title">Popular Categories</h2>
        <div className="category-grid">
          {[
  { "name": "Indian Cuisine", "image": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Indian-Food-wikicont.jpg" },
  { "name": "Fast Food", "image": "https://wallpapercave.com/wp/wp7029319.jpg" },
  { "name": "Street Food", "image": "https://tse1.mm.bing.net/th/id/OIP.Q7NGfgIorifieXt6DhWkPQHaEK?rs=1&pid=ImgDetMain" },
  { "name": "Healthy Meals", "image": "https://www.wallpaperflare.com/static/778/966/360/greek-cooking-recipe-lettuce-wallpaper.jpg" },
  { "name": "Beverages", "image": "https://wallpapercave.com/wp/wp7137238.jpg" },
  { "name": "Desserts & Sweets", "image": "https://tse4.mm.bing.net/th/id/OIP.V1PM-nulE-UauZUjywaqGAHaFB?rs=1&pid=ImgDetMain" }
]
.map((category, index) => (
            <div key={index} className="category-card">
              <img src={category.image} alt={category.name} className="category-image" />
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-section">
  <h2 className="section-title">Featured Restaurants</h2>
  <div className="featured-scroll-container">
    <div className="featured-grid">
      {[
        { name: "Biryani Palace", image: "https://tse3.mm.bing.net/th/id/OIP.wnT4iuu_jrjDvCxh1C0aCQHaFj?rs=1&pid=ImgDetMain", cuisine: "Indian", rating: "4.5" },
        { name: "South Indian Delights", image: "https://assets.architecturaldigest.in/photos/6008202a345ead69c9c1ab91/master/w_1600%2Cc_limit/Bandra-Madras-Diaries-Interior-5.jpg", cuisine: "South Indian", rating: "4.7" },
        { name: "Chaat Junction", image: "https://b.zmtcdn.com/data/pictures/2/20316392/19396b736fd3357c7634524b08335e8c.jpg", cuisine: "Indian Street Food", rating: "4.3" }
      ].map((restaurant, index) => (
        <div key={index} className="featured-card">
          <img src={restaurant.image} alt={restaurant.name} className="featured-image"/>
          <h3 className="featured-title">{restaurant.name}</h3>
          <p className="featured-description"> Rating:{restaurant.rating}</p>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
};


export default Home;
