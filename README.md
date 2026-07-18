# Drift Cafe

Drift Cafe is a full-stack coffee shop web app built with Express, MongoDB, and a simple frontend UI. It includes user login, cart management, and order checkout pages.

## Features

- Static frontend pages for public menu, contact, login, signup, and profile
- User menu with product cards, images, and Add to Cart buttons
- Cart page with order summary and checkout flow
- Backend APIs for authentication, menu data, and orders
- Local storage cart support for guests and logged-in users
- Render-compatible deployment structure

## Project Structure

- `server.js` - app entry point
- `src/app.js` - Express server configuration and route setup
- `src/routes/` - API route definitions
- `src/controllers/` - backend controller logic
- `src/models/` - Mongoose schemas for users, menu items, and orders
- `frontend/` - public web pages, CSS, JS, and images

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with:

   ```env
   PORT=3000
   MONGO_URI=<your-mongo-connection-string>
   JWT_SECRET=<your-jwt-secret>
   NODE_ENV=development
   ```

3. Start the app locally:

   ```bash
   npm start
   ```

4. Open your browser at:
   ```
   http://localhost:3000
   ```

## Deployment

- Use `npm start` as the start command.
- Set environment variables in Render:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `NODE_ENV=production`

## Notes

- The user menu page now includes static menu item cards for reliable display.
- Order checkout requires a valid JWT token stored in browser local storage after login.
- If MongoDB is not configured, the site can still render frontend pages, but full auth/order features will be disabled.
