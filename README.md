# Nursery children attendance app 🧸

## Setup intructions 🛠️

1. **Clone this repository:**
   ```bash
   git clone <repository_url>
   ```

2. **Create a `.env` file in the root directory:**
   ```bash
   touch .env
   ```

3. **Add your API access token to the newly created `.env` file:**
   ```bash
   REACT_APP_ACCESS_TOKEN=<access_token>
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Start the project:**
   ```bash
   npm start
   ```

6. **Open [http://localhost:3000](http://localhost:3000) to view it in the browser.**


## Decisions 📝

- **Project Initialization:** This project was bootstrapped with Create React App for an easy start and initial setup.
- **Code Quality:** ESLint and Prettier are integrated for better code formatting and error prevention.
- **Type Safety:** The app is written in TypeScript to ensure type checking and data compatibility.
- **Data Management:** React Query is used for managing data fetching and asynchronous state management to display proper success/error/loading statuses to the user. It also provides features like optimistic updates and data refetching.
- **User Experience:** Infinite scroll is implemented to enhance user experience. This feature splits data into chunks, initially displaying the first ten records and loading more data as the user scrolls.

