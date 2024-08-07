# Recipe Sharing App

## Overview

The Recipe Sharing App is a web application that allows users to share and browse recipes. Users can register, log in, and manage their own recipes, as well as view recipes shared by others.

## Features

- User registration and authentication
- Create, read, update, and delete recipes
- Browse recipes by other users
- Responsive design for mobile and desktop

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/recipe-sharing-app.git
   cd recipe-sharing-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory with the following content:

   ```plaintext
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the application:

   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000`.

## Project Structure

```plaintext
.
├── app.js
├── bin
│   └── www
├── config
│   └── database.js
├── controllers
│   ├── authController.js
│   ├── recipeController.js
│   └── userController.js
├── middleware
│   └── auth.js
├── models
│   ├── recipe.js
│   └── user.js
├── public
│   ├── images
│   │   └── top-view-table-full-delicious-food-composition.jpg
│   ├── javascripts
│   │   └── script.js
│   └── stylesheets
│       └── style.css
├── routes
│   ├── auth.js
│   ├── index.js
│   ├── recipes.js
│   └── users.js
├── views
│   ├── error.hbs
│   ├── index.hbs
│   ├── layout.hbs
│   ├── login.hbs
│   ├── partials
│   │   ├── footer.hbs
│   │   └── header.hbs
│   ├── profile.hbs
│   ├── register.hbs
│   └── recipes
│       ├── allRecipes.hbs
│       ├── create.hbs
│       ├── edit.hbs
│       └── index.hbs
└── package.json
```

## Usage

### User Registration

1. Click on the "Sign Up" button on the homepage.
2. Fill in the registration form and submit.

### User Login

1. Click on the "Login" button on the homepage.
2. Fill in the login form with your email and password, then submit.

### Managing Recipes

- **Create a Recipe:** After logging in, click on "Create Recipe" and fill in the form with your recipe details.
- **Edit a Recipe:** Navigate to your profile, select a recipe to edit, and update the details.
- **Delete a Recipe:** Navigate to your profile, select a recipe to delete, and confirm the deletion.

### Browsing Recipes

- Click on the "Browse Recipes" button on the homepage to view recipes shared by other users.
