
# Brewery Explorer

## Description
This project implements a brewery exploration system featuring a backend API and a frontend interface that allows users to browse, search, and manage their favorite breweries.

## Technologies Used
- Backend: Spring Boot, Java
- Frontend: Angular, Typescript
- Database: PostgreSQL

## Getting Started

### Prerequisites
- Docker installed on your machine.

### Installation
Clone the repository to your desired directory:
```sh
git clone https://github.com/LorenzoMatt/brewery-explorer.git
```
Navigate to the root of the project where the docker-compose.yml file is located.

### Running the Application
To build and start all services from the root of the project, execute:
```sh
docker-compose up --build
```

### Accessing the Application
Access the frontend client at [http://localhost](http://localhost).

## Database Access
The application is configured to connect to a PostgreSQL database. Access details for the database, along with default values, are as follows:
- URL: `jdbc:postgresql://db:5432/${PG_DB}` (Default URL constructed using database name, which is `jdbc:postgresql://db:5432/postgres`)
- Username: `${PG_USER}` (Default: `postgres`)
- Password: `${PG_PASSWORD}` (Default: `password`)
- Schema: `${DB_SCHEMA}` (Default: `brewery`)

These values are set as environment variables in the `.env` file located in the root directory of the project. You can customize the database username, password, database name, and schema by modifying the respective entries in this file.

## API Documentation
The Swagger UI can be accessed at:

- **Swagger UI**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

Additionally, the raw OpenAPI specification can be accessed directly at:

- **OpenAPI Spec**: [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

## Environment Variables
Below are the key environment variables used in the project, which can be found and modified in the `.env` file:
- `DB_PORT`: The port used by the PostgreSQL database (Default: `5432`).
- `PG_DB`: The name of the PostgreSQL database (Default: `postgres`).
- `PG_USER`: The username for accessing the PostgreSQL database (Default: `postgres`).
- `PG_PASSWORD`: The password for the PostgreSQL user (Default: `password`).
- `DB_URL`: The JDBC URL for connecting to the PostgreSQL database, constructed using the environment variables (Default: `jdbc:postgresql://db:5432/${PG_DB}`).
- `LOGGING_LEVEL_CONSOLE`: The logging level for console output (Default: `INFO`).
- `LOGGING_LEVEL_ROOT`: The root logging level (Default: `INFO`).
- `LOG_DIRECTORY`: The directory where logs are stored (Default: `/var/log/brewery_explorer`).
- `DEBUG_PORT`: The port used for debugging purposes (Default: `5005`).
- `DB_SCHEMA`: The specific database schema name to be used (Default: `brewery`).

## Implemented Functionalities

### Backend
- User Authentication: Register, login, and token-based authentication with JWT.
- Brewery Management: Retrieve the list of breweries with pagination.
- Favorites Management: Add and remove breweries from user favorites.
- Search and Filtering: Search and filter breweries by name, city, state, and type.

### Frontend
- User Authentication: Login and registration forms.
- Brewery Listing: Display a list of breweries with pagination.
- Brewery Details: View detailed information about a brewery.
- Favorites Management: Add and remove breweries from favorites.
- Search and Filtering: Search and filter breweries.

## Future Improvements

### Accessibility Enhancements
- Enhance WCAG Guidelines: Ensure the application is fully accessible according to WCAG guidelines to provide a better user experience for all users, including those with disabilities.

### User Experience Enhancements
- Mobile Interface Optimization: Redesign the user interface to be more mobile-friendly, ensuring a seamless experience on smaller screens.

### User Interface Improvements
- GUI Enhancements: Redesign the graphical user interface to be more appealing and enhancing overall user engagement.
- Unified CSS for Common Components: Refactor CSS for common components (e.g., header, footer, add/remove favorites buttons) to ensure consistency in styling across the application.