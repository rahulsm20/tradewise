# Tradewise

- Index
  - [Tech stack](#tech-stack)
  - [Run locally](#run-locally)
  - [System Architecture](#system-architecture)
    - [C4 Model](#c4-model)
  - [Database Design](#database-design)
    - [ER Diagram](#er-diagram)
    - [Database Schema](#database-schema)
  - [Screenshots](#screenshots)

### Tech stack

- Frontend
  - React
  - Redux
  - TailwindCSS
- Backend
  - Node.js
  - Express
- Database
  - PostgreSQL
- Build tool
  - Vite

### Run locally

- Clone this repo
  ```
  git clone https://github.com/rahulsm20/tradewise
  ```
- Setup client
  - cd into folder
    ```
      cd client
    ```
  - Install packages
    ```
      npm install
    ```
  - Run client
    ```
      npm run dev
    ```
- Setup server
  - cd into server
    ```
      cd server
    ``` 
  - Install packages
    ```
    npm install
    ``` 
  - Run server
    ```
    npm run dev
    ``` 
  You can also run the server using docker
  - ```
    docker build -t <image_name> . 
    ```
  - ```
    docker run -p 3000:3000 <image_name>
    ```
### System Architecture

#### C4 Model

![system_architecture](https://github.com/rahulsm20/mikesCarRental/assets/77540672/043a2fd8-f18d-4ad0-a0dc-16c6435f4f5b)

### Database Design

#### ER Diagram

![ER_Diagram](https://github.com/rahulsm20/mikesCarRental/assets/77540672/0e03222e-2496-48e6-9b5e-5d40471563b2)

#### Database Schema

![Screenshot 2023-08-08 195028](https://github.com/rahulsm20/mikesCarRental/assets/77540672/4fc46bf0-775c-4cb0-9e87-507ff2470c1b)

### Screenshots

![Login](https://user-images.githubusercontent.com/77540672/232229235-8432d45b-3af4-4588-b657-a913b78fbca7.png)

![News](https://user-images.githubusercontent.com/77540672/232229231-4a239124-b16d-4ce8-bcfc-5eea608ca90c.png)

![Dashboard](https://user-images.githubusercontent.com/77540672/232229223-87f1d8d3-891e-419d-9621-26793065ce3d.png)

![Budget](https://user-images.githubusercontent.com/77540672/232229227-d34be9b0-cefd-493f-aa8d-057903c7cd77.png)