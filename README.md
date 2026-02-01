# ShopNest – E-Commerce Backend

ShopNest is a backend for an e-commerce application built using the MERN stack.  
The aim of this project is to design a **real-world marketplace backend** where sellers manage their own products and users interact with live product data.

This project is **still in active development** and is not complete yet.  
The focus so far has been on **backend architecture, data modeling, and authorization logic**.

---

## Features

### Authentication & Authorization
- JWT-based authentication
- Separate roles for users and sellers
- Sellers can only manage products they have created

---

### Product Management
- Sellers can add, update, archive, and delete products
- Products are archived using an `isArchived` flag instead of permanent deletion
- Archived products are hidden from public listings but still visible to the seller
- Image uploads handled using Multer and Cloudinary

---

### Product Listing
- Public APIs return only active (non-archived) products
- Sellers can fetch all products they have posted, including archived ones

---

### Cart System
- One cart per user
- Cart stores only product references and quantity
- Product price is always fetched live
- If a seller updates the price, the cart reflects the updated price automatically

This mirrors how pricing works in real e-commerce platforms.

---

### Order Flow (Planned)
- Product price and details will be snapshotted at checkout
- Stock will be validated and reduced during order creation
- Prevents price mismatch and overselling

---

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Multer & Cloudinary

---

## Project Structure

```text
server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── .env.example
├── .gitignore
└── index.js
