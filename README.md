# 🏠 Apartment Listings App

A modern, full-stack apartment listing web application where users can view, add, edit, and delete apartments. It features a responsive design, search functionality, and clean UI/UX — fully containerized for seamless deployment.

---

## Features

-  Apartment listing with photo, area, project, and details
-  Search & filter by unit name, unit number, or project
-  Add, Edit, and  Delete apartments
-  Fully responsive and mobile-friendly design
-  Dockerized: runs backend, frontend, and MongoDB with one command
-  Built with Tailwind CSS for fast and consistent styling

---

## Tech Stack

| Layer       | Stack                                   |
|-------------|------------------------------------------|
| Frontend    | [Next.js](https://nextjs.org/), React, Tailwind CSS |
| Backend     | [Node.js](https://nodejs.org/), Express.js, TypeScript |
| Database    | [MongoDB](https://www.mongodb.com/) + Mongoose |
| Deployment  | Docker & Docker Compose |

---



##  Getting Started

### 1. Clone and Run

```bash
git clone https://github.com/shwehy/apartment-listing-app.git
cd apartment-listing-app
docker-compose up --build




---

## 🛠️ Prerequisites

Make sure you have the following installed:

- **[Docker](https://www.docker.com/products/docker-desktop)** (Desktop)

---

##  How to Run the Project Anywhere (Locally or on Any Laptop)

### 1. Clone the Repository

```bash
git clone https://github.com/shwehy/apartment-listing-app.git
cd apartment-listings-app
docker-compose up --build

```
## Access in Browser
Access in Browser
Frontend: http://localhost:3000
Backend API: http://localhost:4000/api/apartments

---
##  API Endpoints (Backend)

| Method | Route                     | Description            |
|--------|---------------------------|------------------------|
| GET    | `/api/apartments`         | List all apartments    |
| GET    | `/api/apartments/:id`     | Get apartment details  |
| POST   | `/api/apartments`         | Add a new apartment    |
| PUT    | `/api/apartments/:id`     | Update an apartment    |
| DELETE | `/api/apartments/:id`     | Delete an apartment    |

---
## First add appartments from the json file 
This project includes a simple admin interface to help manage apartment data more efficiently.
### Accessing the Admin Panel
```bash
Visit:
http://localhost:3000/admin
```
Or in the footer you will find Admin database Go to Admin Panel
the page will open , choose the json file apartments.json
Press "Import JSON".
Apartments will be added to the database.
###  Features Available

- **Delete All Apartments:**  
  Instantly clears all apartments from the database.

- **Import Apartments from JSON File:**  
  Upload a `.json` file containing an array of apartments to bulk insert into the database.
