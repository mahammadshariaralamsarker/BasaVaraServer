Requirements : https://docs.google.com/document/d/1L6m2MxZx7m7ilTDyeCrLnv5QTuxPtA_5nGXSh-QqYZ0/edit?tab=t.67axls8qnxay

<h1 align="center">
  Assignment  project - 6 
</h1>

# 📝 Basa Vara Management API

I developed a powerful backend for a blogging platform, enabling both user and admin operations with full CRUD functionality, authentication, and authorization. Users can create, read, update, and delete their blogs, while admins have extended privileges to manage all content.

Key features include advanced search and filtering for efficient content discovery. The backend is built using Node.js, Express.js, TypeScript, and MongoDB, ensuring scalability, type safety, and high performance. JWT-based authentication secures user sessions, while role-based authorization safeguards resources. Designed with clean architecture and modularity, this backend provides a robust, efficient, and secure foundation for a modern blogging platform.

---

## Technologies

- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**
- **Zod**
- **cors**
- **dotenv**
- **http-status-codes**
- **JWT**
- **bcrypt**
- **ShurjoPay**
- **Cookie-parser**
- **multer** 

---

## 🚀 Features

### User Roles

- **Admin**:
  - Block users.
  - Delete any blog.
  - **Cannot update blogs.**
- **Landlord**:

  - Register and log in.
  - Create, update, and delete their own blogs.
  - **Cannot perform admin actions.**

- **User**:
  - Register and log in.
  - Create, update, and delete their own blogs.
  - **Cannot perform admin actions.**

### Core Features

- **Authentication & Authorization**:
  - Secure JWT-based authentication.
  - Role-based access control for admin and users.
- **Blog API**:
  - Public access to blog listings.
  - Advanced functionalities: search, sort, and filter.

---

## 🛠️ API Endpoints

### Authentication
- **Register**: `POST /auth/register`
- **Login**: `POST /auth/login`

### Landlord Management
- **Create Landlord**: `POST  /landlords/listings` (Logged-in users only)
- **Update Landlord**: `PUT /landlords/listings/:productId` (Landlord owner only)
- **Delete Landlord**: `DELETE  /:productId` (Landlord owner only)
- **View Landlord**: `GET /landlords/listings`
- **View single Landlord**: `GET /landlords/listings/:productId`
- **Landlord Get Request from Tenant**: `PUT /landlords/listings/:productId`
-

### Tenant Management
- **Make Request To Landlord**: `POST /tenant/requests`
- **Make Payment With ShurjoPay if Landlord accepted his request**


### Admin Actions
- **Get All Landlord**: `GET /admin/listings`
- **Get All User**: `GET /admin/user`
- **Delete Any User**: `PATCH /admin/user/:id/`
- **Delete Any Landlord**: `DELETE /admin/listings/:productId`


## 🛡️ Error Handling

All errors are returned in a structured format with clear messages and status codes.

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details" }
}
```

Thank you for exploring this project! 🚀 
