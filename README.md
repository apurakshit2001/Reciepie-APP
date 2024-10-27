# Reciepie-App
# https://recipeapp-streetrman2001.netlify.app/

**Live Site**: [Recipe App](https://recipeapp-streetrman2001.netlify.app/)

This project is a recipe application built with **React** and **Vite**, providing features such as recipe search, nutrition analysis, and nearby restaurant recommendations.

## Features:
- **Home Page**: Discover recipes
- **Recipe Search**: Find recipes by ingredients or name
- **Nutrition Analysis**: Check the nutritional content of your recipes
- **Nearby Restaurants**: Locate restaurants near you

## Project Setup

This project uses Vite for fast development and optimized builds, along with ESLint for maintaining code quality.

### Requirements:
- Node.js (>= 14.x)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/reciepie-app.git
   ```

2. Navigate to the project folder:
   ```bash
   cd reciepie-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server with hot reloading (HMR), use:
```bash
npm run dev
```

### Build for Production

To build your project for production, run:
```bash
npm run build
```

### ESLint

This project uses **ESLint** to enforce code quality. To check for linting errors, use:
```bash
npm run lint
```

### Vite Plugins

- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)**: Provides Fast Refresh for React using **Babel**.
- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)**: An alternative plugin using **SWC** for Fast Refresh.

## Deployment

This app is deployed on **Netlify**. You can set up a similar deployment with these steps:

1. Connect your GitHub repository to Netlify
2. Set the build command to `npm run build`
3. Set the publish directory to `dist`

---

Feel free to customize this based on your app's specific features and setup!
