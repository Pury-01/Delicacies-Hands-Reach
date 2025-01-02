# Delicacies@Hands-Reach
This is a web application designed to help users discover, save and manage recipes. Users can explore a varietyof recipes from an API, add their own creations, and seamlessly manage them from a single platform

## Table of Contents
1. Features
2. Technologies Used
3. Setup Instructions
4. Environment variables
5. Backend Endpoints
6. Frontend Pages and Components
7. Usage Instructions
8. Future Improvements
9. License

## Features
+ User authentication (signup, login, logout).
+ Integration with the Spoonacular API to fetch recipes.
+ Secure session handling with Flask sessions.
+ Add, view, update and delete user recipes
+ seamless navigation between pages

## Technologies Used
### Backend
+ Flask
+ Flask-Restful
+ Flask-CORS
+ Flask-Babel
+ Spoonacular API
+ MySQL

### Frontend
+ React
+ React Router
+ Bootstrap

## Setup Instruction
### Prerequisites
- [python 3.7](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [pyenv](https://github.com/pyenv/pyenv)


### Backend Setup
1. Clone the repository:
```
git clone https://github.com/Pury-01/Delicacies_at_hands_reach.git
```

2. Create and activate a virtual environment:
```
python3.7 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```
pip install -r requirements.txt
```

4. Set up the database
```
flask db init
flask db migrate -m 'Intial migration'
flask db upgrade
```

5. Start the backend server:
```
flask run
```

### Frontend
1. Navigate to the frontend directory:
```
cd ../frontend
```

2. Install dependencies:
```
npm install
```

3. Start the server:
```
npm start
```

## Environment Variables
### Backend
create a .env file in the backend directory with the following content:
```
SECRET_KEY=your_secret-key
SPOONACULAR_API_KEY=your_spoonacular_api_key
DB_NAME=db_name
DB_HOST=db_host
DB_USER=db_user
DB_PASSWORD=db_password
```

### Frontend
create a .env file in the frontend directory with the following content:
```
REACT_APP_API_URL=http://127.0.0.1:5000
```

## Backend Endpoints
### Authentication

| Methods  | Endpoints       | Description               |
|----------|-----------------|---------------------------|
| POST     | /signup         | register a new user.      |
| POST     | /login          | login an existing user.   |
| POST     | /logout         | log out the current user. |
|----------|-----------------|---------------------------|

### Recipes

| Method   | Endpoints         | Description               |
|----------|-------------------|---------------------------|
| GET      | /recipes          | Fetch recipes from API    |
| GET      | /user/recipes     | Get saved recipes         | 
| POST     | /user/recipe      | Add a new recipe          |
| PUT      | /user/recipes/<id>| Update an exisiting recipe|
| DELETE   | /user/recipes/<id>| Delete a recipe           |
|----------|-------------------|---------------------------|

## Frontend Pages and Components

+ LandingPage: Landing page with navigation options
+ Home: Displays the search feature and recipes list.
+ RecipeCard: Displays detailed information about a recipe.
+ UserRecipe: Lists all saved recipes and options to add, update,  or delete recipes.
+ Login: User login page
+ Signup: User registation page

## Usage Instructions
1. Search for recipes by providing ingredients using the Spoonacular API.
2. Register with new account or login with existing credentials to access "My Recipes" page.
3. Add recipes by clicking "Add recipes" button.
4. Type your recipes on the whiteboard under the headers "title" "ingredients" and "steps" and click "save" button to save.
5. View saved recipes list by clicking the dropdown button "Saved Recipes". and click on a recipe to edit then "save" to save or "delete" to delete.
6. Logout via logout feature 

## Future Improvements
+ Integrate more third-party APIs to enhance recipe discovery.
+ Implement advanced filtering options for recipes
+ Implement a fallback database with saved recipes
+ Enhance UI/UX.

## License
This project is licensed under the MIT License.
