# 🥬 Fresh Harvests — Grocery Shop (Next.js)

A responsive **grocery shop web application** built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS / DaisyUI**, **Redux Toolkit**, and **RTK Query**.

Users can browse products, view product details, and admins can manage products and categories.

---

## 🚀 Tech Stack

* **Next.js** (App Router)
* **TypeScript**
* **Tailwind CSS** + **DaisyUI**
* **Redux Toolkit**
* **RTK Query**
* **Vercel** (deployment)

---

## ✨ Features

### 👥 Public Features

* Home page with featured & filtered products
* Shop page with category-based filtering (client-side)
* Product details page with related products
* Authentication modals (Login / Register)
* Auth token stored in `localStorage`
* Token automatically attached to API requests

### 🔐 Admin Features

* Admin-only navigation
* Create new products
* Create new categories
* View/manage product list
* Delete products

> ⚠️ **Note:** Admin authorization must be enforced by the backend.
> The frontend only hides or blocks admin routes visually.

---

## 📁 Project Structure (High-Level)

```
app/                 # Next.js App Router pages
components/          # Reusable UI components (Navbar, Cards, Modals)
store/
├─ services/
│  └─ api.ts         # RTK Query API definitions
├─ features/
│  └─ auth/          # Auth slice (token, isAdmin)
└─ store.ts          # Redux store setup
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://23.239.111.164:5001/api/v1
```

### Vercel Setup

In **Vercel → Project → Settings → Environment Variables**, add:

```
NEXT_PUBLIC_API_BASE_URL = http://23.239.111.164:5001/api/v1
```

Then redeploy the project.

---

## 🧑‍💻 Getting Started (Local Development)

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build & run production

```bash
npm run build
npm run start
```

---

## 🛠 Admin Credentials (Testing Only)

> ⚠️ For demo/testing purposes only

* **Email:** `admin@gmail.com`
* **Password:** `123456`

---

## 🔌 API Notes

* Auth token is saved in `localStorage` after login
* For protected (admin) routes, the token is sent as a header:

  ```
  Authorization: <token>
  ```

  (No `Bearer` prefix)

---

## 📜 Scripts

* `npm run dev` — Run development server
* `npm run build` — Create production build (with TypeScript checks)
* `npm run start` — Run production server
* `npm run lint` — Run linter

---

## 🌍 Deployment

Deployed on **Vercel**.

* Do **not** commit `.env.local`
* Always configure environment variables in Vercel settings

---

## 📄 License

This project is created as a **Job task of SM Technology** only.

