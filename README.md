# Library Management System - Backend API

This repository contains the backend API for a Library Management System built using **Node.js, Express.js, and MongoDB**. The application allows the library administration to manage books, members, and borrowing records.

---

## 🚀 Features Core API Endpoints

| Method   | Endpoint                      | Description                                                  |
| -------- | ----------------------------- | ------------------------------------------------------------ |
| `POST`   | `/books`                      | Add a new book (Auto generates Mongo _id)                    |
| `GET`    | `/books`                      | View all book records                                        |
| `GET`    | `/books/:id`                  | Get book details by ID                                       |
| `PUT`    | `/books/:id`                  | Update specific book details                                 |
| `DELETE` | `/books/:id`                  | Delete a book record                                         |
| `GET`    | `/books/search?title=...`     | Search books dynamically by Title or Author (`&author=...`)  |

All endpoints follow RESTful standards and return JSON data using standard HTTP Status Codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Server Error`).

---

## ☁️ Step 1. MongoDB Atlas Setup (Cloud Database)

Since your MongoDB is on the cloud, follow these steps to get your connection string:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign in.
2. Create a new Organization and Project.
3. Build a Cluster (The free Shared/M0 tier is perfect).
4. Go to **Database Access** under Security on the left menu. Add a New Database User (give them read/write permissions), create a username and password. Keep the password somewhere safe.
5. Go to **Network Access** under Security. Click "Add IP Address" and select "Allow Access From Anywhere" (`0.0.0.0/0`) or just your Current IP Address to restrict access.
6. Go back to your **Database Clusters** and click the **Connect** button on your cluster.
7. Choose "Drivers" (Node.js version 5.5 or later).
8. Copy the provided connection string.
   - It will look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<username>` and `<password>` with the credentials from Step 4.

---

## 💻 Step 2. Local Setup & Testing

To run the project locally on your machine:

1. Open your terminal in the project directory.
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory.
4. Add your MongoDB URI port and to the `.env` file:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/libraryDB?retryWrites=true&w=majority
   PORT=5000
   ```
5. Start the backend server:
   ```bash
   node index.js
   ```
   *You should see two messages in the console: "Server running on port 5000" and "MongoDB Connected: ..."*

You can test the endpoints locally using Postman, Insomnia, or cURL to `http://localhost:5000/books`.

---

## 🌍 Step 3. Github & Render Deployment

To deploy this backend API live on Render:

### Push to GitHub
1. Make sure all your code is pushed to your GitHub repository `ArnavBhardwaj123/Library_Management_System-_62-MSE-1-`.
2. Do not upload the `.env` file (it should be in your `.gitignore` if you use Git).

### Deploying on Render (Free Hosting)
1. Go to [Render.com](https://render.com) and sign up with GitHub.
2. Click **New** in the dashboard and select **Web Service**.
3. Connect your GitHub account and select your repository: `ArnavBhardwaj123/Library_Management_System-_62-MSE-1-`.
4. Render will auto-detect Node.js. Use the following settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. Further down in the deployment settings, click on **Advanced** -> **Add Environment Variable**.
6. Add the variables from your `.env` file into Render:
   - Key: `MONGO_URI` | Value: `your-mongodb-atlas-connection-string`
7. Click **Create Web Service**.

Wait a few minutes. Render will build and deploy your Express App. Once live, Render will give you a public URL (e.g., `https://library-management-system-55xx.onrender.com`).

You can now use that public URL for all your REST API endpoints (e.g., GET `https://.../books`).