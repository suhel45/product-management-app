# 🛍️ Product Management App

### Live Demo 👉 [https://product-management-app-sigma.vercel.app/](https://product-management-app-sigma.vercel.app/)

A full-stack **Product Management Application** built with **Next.js 14 (App Router)**, **TypeScript**, **Redux Toolkit Query**, and **Tailwind CSS**.  
It allows users to **manage products**, **add/edit categories**, and provides a **modern, responsive UI** with real-time search, validation, and cache optimization.

---

## 🚀 Features

### 🧩 Authentication
- Secure **Login / Logout** system.
- Protected routes and redirection for authenticated users.
- JWT-based (or mock) authentication for session handling.

---

### 📦 Products Management
- **Display all products** with **pagination** for efficient browsing.
- **Real-time search** — instantly filter products by name.
- **Add, Edit, and Delete products** with smooth user experience.
- **Confirmation pop-up** before deletion.
- **Client-side form validation** using Zod and React Hook Form.
- **Inline validation messages** and helpful error handling.

---

### 🗂️ Categories
- Fetch and display available categories dynamically.
- Assign product categories during creation or update.
- Update category relation seamlessly.

---

### ⚡ API & Data Layer
- Built using **Redux Toolkit Query** for data fetching and caching.
- Implements **cache invalidation** and **automatic refetching** after create, update, or delete operations.
- Modular API setup in `lib/api.ts`.

---

### 🧠 Form Validation (with Zod)
- Ensures correct data structure and type safety.
- Custom rules:
  - Product name: required
  - Price: must be a positive number
  - Category: required
  - Image: must be a valid URL

---

### 🎨 UI / UX Highlights
- **Modern & clean design** with Tailwind CSS.
- **Responsive** — optimized for both desktop and mobile.
- **Loading and error states** for smooth feedback.
- Clear button states (`Saving...`, `Deleting...`, etc.).
- Consistent typography, spacing, and visual rhythm.

---

### 🧭 Routing & Navigation
- Built with **Next.js App Router**.
- Pages:
  - `/login` — User authentication
  - `/products` — Product listing and search
  - `/products/create` — Create product
  - `/products/[id]` — View product details
  - `/products/[id]/edit` — Edit existing product

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **State Management** | Redux Toolkit Query |
| **UI Styling** | Tailwind CSS |
| **Validation** | Zod + React Hook Form |
| **Deployment** | Vercel |


⭐ **If you like this project, give it a star and share it!**
