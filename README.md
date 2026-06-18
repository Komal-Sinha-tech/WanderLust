# 🌍 WanderLust

A full-stack Airbnb-inspired property listing platform built using Node.js, Express.js, MongoDB, EJS, Bootstrap, Cloudinary, and Passport.js.

Users can browse listings, create their own property listings, upload images, leave reviews, and manage their listings through a secure authentication system.

---

## 🚀 Live Demo

🔗 Live Website: https://wanderlust-1-qvia.onrender.com

---

## 📸 Features

### User Authentication

* User Signup
* User Login
* User Logout
* Session-based Authentication using Passport.js
* Authorization for protected routes

### Listings

* Create new listings
* Edit existing listings
* Delete listings
* View all listings
* View individual listing details
* Search listings by destination
* Category-based filtering

### Reviews

* Add reviews
* Delete reviews
* Review ownership validation

### Image Uploads

* Cloudinary image storage
* Multer integration
* Image preview support

### UI/UX

* Responsive Bootstrap design
* Flash messages
* Interactive category filters
* Leaflet Map integration

---

## 🛠️ Tech Stack

### Frontend

* EJS
* Bootstrap 5
* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* Passport.js
* Passport Local
* Express Session

### File Storage

* Cloudinary
* Multer

### Deployment

* Render

---

## 📂 Project Structure

```bash
WanderLust/
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── middleware.js
├── schema.js
├── cloudConfig.js
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/Komal-Sinha-tech/WanderLust

cd WanderLust
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the root directory:

```env
ATLAS_DB_URL=your_mongodb_connection_string

CLOUD_NAME=your_cloudinary_cloud_name

CLOUD_API_KEY=your_cloudinary_api_key

CLOUD_API_SECRET=your_cloudinary_api_secret

SECRET=your_session_secret
```

### Run the Application

```bash
node app.js
```

or

```bash
nodemon app.js
```

### Open in Browser

```text
http://localhost:8080
```

---

## 🔑 Important Commands

### Install Dependencies

```bash
npm install
```

### Start Server

```bash
node app.js
```

### Start with Nodemon

```bash
nodemon app.js
```

### Check Git Status

```bash
git status
```

### Push Changes

```bash
git add .
git commit -m "message"
git push
```

---

## 🗺️ Future Improvements

* Google Authentication
* Forgot Password Functionality
* Booking System
* Wishlist Feature
* User Profile Dashboard
* Payment Integration
* Advanced Search Filters
* Property Availability Calendar

---

## 👩‍💻 Author

Komal Sinha

🔗 LinkedIn: https://www.linkedin.com/in/komal-sinha-tech/

🔗 GitHub: https://github.com/Komal-Sinha-tech

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.


