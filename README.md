# 🏡 BookNest – Full Stack Stay Booking Platform

## 🔗 Live Demo
👉 https://wanderlust-project-s119.onrender.com

---

## 📌 Overview
BookNest is a full-stack web application that allows users to explore listings, create stays, and book accommodations with real-time availability logic. It is inspired by platforms like Airbnb and focuses on practical backend design and real-world booking workflows.

---

## ✨ Features

### 🔐 Authentication & Authorization
- User signup and login  
- Secure session-based authentication  
- Access control for listings and bookings  

---

### 🏡 Listings Management
- Create, edit, and delete listings  
- Add images, description, price, and location  
- Only listing owners can modify their listings  

---

### 🔍 Search Functionality
- Search listings by title, location, and country  
- Case-insensitive search using MongoDB regex  

---

### 📅 Booking System
- Select check-in and check-out dates  
- Dynamic total price calculation  
- Prevent overlapping bookings using date logic  
- Real-time availability handling  

---

### 👤 User Dashboard
- View all bookings (My Bookings)  
- See listing details, dates, total price, and status  

---

### 🧑‍💼 Owner Dashboard
- View bookings received for each listing  
- See guest details, booking dates, and status  

---

### ❌ Booking Management
- Cancel bookings (status-based, no deletion)  
- Booking status:
  - `confirmed`
  - `cancelled`  
- Cancelled bookings do not block future availability  

---

### ⭐ Reviews & Ratings
- Add reviews and ratings to listings  
- Delete own reviews  
- Star-based rating UI  

---

## 🧠 Key Implementations
- Prevented double bookings using date overlap logic  
- Maintained booking history using status instead of deletion  
- Separated user and owner workflows  
- Implemented RESTful routing with MVC architecture  
- Built real-world booking flow with validation and authorization  

---

## 🛠️ Tech Stack

**Frontend**
- HTML  
- CSS  
- Bootstrap  
- EJS  

**Backend**
- Node.js  
- Express.js  

**Database**
- MongoDB  
- Mongoose  

**Authentication**
- Passport.js  

**Other**
- Express-session  
- Connect-flash  
- Method-override  

---

## 📂 Project Structure

/models  
/routes  
/controllers  
/views  
/public
/utils

---

## ⚙️ Setup Instructions

```bash
git clone <repo-link>
cd booknest
npm install
npm start
