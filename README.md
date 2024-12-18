# Stock Price Tracker App

## Project Overview

The Stock Price Tracker is a React Native application designed to fetch and display real-time stock prices. It provides key metrics, meaningful changes, and detailed stock information in an intuitive interface. The app uses the Alpha Vantage API for stock data, with a custom backend hosted on Heroku to handle caching for better performance.

## Features

- **Home Screen**: Displays top gainers, top losers, and the most actively traded stocks with a refresh functionality.
- **Details Screen**: Shows comprehensive details about a specific stock, including daily performance, historical price trends, and company information.

## Directory Structure

```
├── app
│   ├── details
│   │   └── [ticker].tsx
│   ├── index.tsx
│   └── _layout.tsx
├── assets
│   ├── fonts
│   ├── images
├── components
│   ├── details
│   ├── home
│   ├── ui
│   └── Themed components
├── constants
├── hooks
├── services
├── types
├── utils
├── backend (backend server)
```

## Backend Implementation

The backend server, implemented using Express and Redis, provides:
GitHub: https://github.com/lukabajic/simple-express-server/blob/main/server.js
URL: https://simple-express-redis-app-56cdbd82e511.herokuapp.com

### Routes

1. **`GET /company/:symbol`**

   - Fetches daily performance and company overview data for a given stock symbol and caches the response for 24 hours.

2. **`GET /top-gainers-losers`**
   - Fetches and caches data about top gainers, losers, and actively traded stocks for 24 hours.

### Error Handling

- Handles API errors gracefully by responding with a 500 status and a generic error message.
- Implements try-catch blocks to ensure robust error handling.

## How to Run the Project

### Prerequisites

- Install [Node.js](https://nodejs.org/) and [Expo CLI](https://expo.dev/).

### Steps to Run Locally

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
      cp .env.example .env
   ```
   Then replace the placeholder URL with the backend URL provided above
4. Start the Expo development server:
   ```bash
   expo start
   ```
5. Run the app on a device or simulator:
   - Use the Expo Go app on your iPhone or Android device.
   - Or, run it on an iOS/Android simulator via Expo CLI.

## Testing

The app has been tested only on an **iPhone 12** using the Expo Go app. Further testing is recommended for other devices and simulators.

## Development Notes

- **Tools Used**: Developed using [Visual Studio Code](https://code.visualstudio.com/).
- **Backend Hosting**: Backend is hosted on Heroku with Redis for caching.
- **Expo**: Allows seamless development and testing on mobile devices.

## Acknowledgments

- **ChatGPT**: Used extensively to:
  - Analyze Alpha Vantage API data.
  - Design the home and details screens.
  - Accelerate coding tasks and debugging.
  - Draft this README.md file.

Feel free to explore application!
