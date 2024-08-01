# Country Select

This project is a web application that provides functionality to select nationality and tax residence using the RestCountries API. It allows users to get a list of all countries and choose their nationality and tax residence conveniently.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Select Nationality**: Choose nationality from a list of all countries.
- **Select Tax Residence**: Choose tax residence from a list of all countries.
- **Fetch Country Data**: Retrieve country data using the RestCountries API.
- **Responsive UI**: User-friendly and responsive interface built with React.

## Installation

1. Clone the repository:
    ```sh
    https://github.com/Devgarg1302/Country-Selction-API.git
    cd country-select
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add your RestCountries API endpoint to the `.env` file.
    ```sh
    REACT_APP_RESTCOUNTRIES_API_URL=https://restcountries.com/v3.1/all
    ```

## Usage

1. Start the development server:
    ```sh
    npm start
    ```

2. Open your browser and go to `http://localhost:3000` to view the application.

## API

### Fetch All Countries

- **Endpoint**: `https://restcountries.com/v3.1/all`
- **Method**: GET
- **Description**: Fetch a list of all countries.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.
