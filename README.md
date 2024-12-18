# Stock Price Tracker App

## Project Overview

The Stock Price Tracker is a React Native application designed to fetch and display real-time stock prices. It provides key metrics, meaningful changes, and detailed stock information in an intuitive interface. The app uses the Alpha Vantage API for stock data, with a custom backend hosted on Heroku to handle caching for better performance.  
The Alpha Vantage API has a 25 requests limit on the free plan.

## Features

- **Home Screen**:
  - Displays top gainers, top losers, and the most actively traded stocks.
  - Includes a refresh functionality for updated data.
  - Features design improvements with consistent styling and better error handling.
- **Details Screen**:
  - Offers comprehensive stock details, including daily performance, historical price trends, and company information.
  - Includes reusable components for consistency.
- **Reusable Components**:
  - A `Button` component and `Loader` for shared functionality across screens.
  - A reusable `Section` component to enhance the Details page design.

## Recent Updates

- Improved formatting and consistency across all files.
- Enhanced UI with new icons and better color schemes.
- Added new props to components for increased flexibility.
- Optimized the error screen with a detailed implementation.
- Improved performance with caching on the backend and optimized API requests.

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
```

## Backend Implementation

The backend server, implemented using Express and Redis.

GitHub: [Express Server](https://github.com/lukabajic/simple-express-server/blob/main/server.js)  
URL: [Live Server](https://simple-express-redis-app-56cdbd82e511.herokuapp.com)

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
3. Create the .env file
   ```bash
   cp .env.example .env
   ```
   Then replace the placeholder URL with the backend URL provided above.

4. Start the Expo development server:
   ```bash
   expo start
   ```
5. Run the app on a device or simulator:
   - Use the Expo Go app on your iPhone or Android device.
   - Or, run it on an iOS/Android simulator via Expo CLI.

## Testing

- Tested on **iPhone 12** using Expo Go.
- Known limitation: Due to API request limits, only the top three items on each section of the home page have accurate data.

## Development Notes

- **Design Improvements**: Applied consistent formatting, new icons, and enhanced error handling.
- **Reusable Components**: Simplified the codebase with reusable UI components.
- **Backend Hosting**: Hosted on Heroku with Redis for caching.
- **Expo**: Ensures seamless development and testing on mobile devices.

## Acknowledgments

- **ChatGPT**: Contributed to:
  - Analyzing Alpha Vantage API data.
  - Designing the home and details screens.
  - Accelerating debugging and feature implementation.
  - Drafting this README.md file.

## Tasks

This is a task list I created for myself while analyzing the requirements and testing API endpoints.

### High Priority

- [x] details - company section
- [x] details - daily performance
- [x] details - header section
- [x] 2 api route for details screen
- [x] create simple express server with cache
- [x] add eslint and prettier config
- [x] home page - plan design, plan work
- [x] home page boilerplate, use endpoint
- [x] home page reusable list item component
- [x] home screen reusable list component
- [x] reusable button component
- [x] alphavantage API_KEY top gainers endpoint and types for api
- [x] plan details screen - plan

### Medium Priority

- [x] create and use error component
- [x] create and add a loader
- [x] pull refresh option
- [x] app splash screen
- [x] app icons
- [x] details - chart section
- [x] README.md
- [x] fix activity indicator positioning
- [x] add a back button on details screen

### Low Priority

- [x] improve home design, add more content
- [ ] error logger
- [ ] details page - key metrics
- [ ] details page - analyst ratings
- [ ] details page - target section
- [ ] use better fonts
- [ ] import formatter
- [ ] check expo-haptics
- [ ] check expo-blur
- [ ] check expo-system-ui

### Optional

- [ ] translations
- [ ] news tab

## MVP and further improvements

Spent around **12 hours** to complete this. 

What's here should be enough for the task assignment :)
I opened a [PR](https://github.com/lukabajic/stock-prizes-app/pull/1) for the remaining changes and some improvements.
Please try out `npx expo start` on that branch as well. I played around with some new expo features that I didn't try out before, `expo-routing` in paticular.
And added some more content to the app.

Feel free to explore the application!
