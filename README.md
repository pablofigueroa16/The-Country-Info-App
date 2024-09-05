# The-Country-Info-App
Full-Stack JS engineer test assessment - the Country Info App

## Overview

This project consists of a frontend and a backend server. Follow the instructions below to set up and run both servers locally.

## Prerequisites

- Node.js (v18.16.1 or later)
- npm (v7 or later)

## Getting Started

### 1. Backend Setup

1. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

   Create a `.env` file in the `backend` directory and add the following variables:

    ```plaintext
    PORT=3000
    ```

4. **Start the backend server:**

    ```bash
    npm run dev
    ```

   The backend server will be running at `http://localhost:3000`.

### 2. Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

   Create a `.env.local` file in the `frontend` directory and add the following variables:

    ```plaintext
    NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
    ```

4. **Start the frontend server:**

    ```bash
    npm run dev
    ```

   The frontend server will be running at `http://localhost:3001`.

## Configuration

- **Backend:** Make sure the backend server is configured to use the correct port and that it’s running before starting the frontend server.
- **Frontend:** Ensure that the `NEXT_PUBLIC_BACKEND_URL` variable in the frontend’s `.env.local` file points to the correct backend URL.

## Adding `.env` Files to the Repository

Due to project requirements, the `.env` files are included in the repository to ensure that environment variables are available for all developers. Please note that sensitive information should still be managed carefully.

## Final Notes

Thank you for the opportunity to work on this technical assessment and for reviewing my work. If you have any questions or need further information, feel free to reach out.

Best regards,

Pablo
