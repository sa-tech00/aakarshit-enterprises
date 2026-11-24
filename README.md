# Aakarshit Enterprises – Website

Next.js (React) website + Node/Express API + PostgreSQL.

```
aakarshit-enterprises/
├── web/      Next.js site (public pages + /admin dashboard)
└── server/   Node.js API (enquiries, email, admin login, gallery, feedback, stats)
```

## What it does
- **Public site:** Home, About, Services (all 16 service groups), Gallery, Contact. Floating **WhatsApp** and **Call Now** buttons on every page (fixed bottom bar on phones).
- **Two ways to enquire:** tap *Call Now*, or fill *Add enquiry* (name, mobile, company, service, message). The enquiry is saved in PostgreSQL **and emailed to akarshitenterprises123@gmail.com**.
- **Admin dashboard** (`/admin`):
  - Enquiries received **today / this week / this month**, with day, week and month charts and most-requested services
  - View all enquiries, search/filter, change status (New → Contacted → In progress → Closed) and **write your response/notes** for each customer
  - **Gallery:** upload, rename and delete project photos (they appear on the website)
  - **Feedback:** add, edit, hide or delete customer feedback (shown on the home page)

## Setup (local)
Requirements: Node 20+, PostgreSQL 14+.

```bash
# 1. Database
createdb aakarshit

# 2. API
cd server
cp .env.example .env        # then edit .env (DB url, admin password, JWT secret, Gmail app password)
npm install
npm run migrate             # creates tables + admin login from ADMIN_EMAIL / ADMIN_PASSWORD
npm start                   # http://localhost:4000

# 3. Website (new terminal)
cd web
cp .env.example .env.local
npm install
npm run dev                 # http://localhost:3000     (production: npm run build && npm start)
```
Admin login: http://localhost:3000/admin/login

## Email setup (Gmail)
1. Google Account → Security → turn on **2-Step Verification**.
2. Create an **App password** (https://myaccount.google.com/apppasswords).
3. Put it in `server/.env` as `SMTP_PASS`. Keep `SMTP_USER` and `ENQUIRY_TO` as the company Gmail.

If email is not configured or fails, the enquiry is **still saved** and visible in the admin (it shows "not mailed").

## Deploying
- Host the **API** + a PostgreSQL database anywhere that runs Node (Render, Railway, a VPS…). Set the same variables as `.env.example`, `PGSSL=true` for most hosted databases, and `CORS_ORIGIN` to your website URL. Gallery images are stored in `server/uploads` – use a **persistent disk/volume** (`UPLOAD_DIR`) or they are lost on redeploy.
- Host the **website** (Vercel, or the same server). Set `API_URL` to the API address and `NEXT_PUBLIC_SITE_URL` to your domain.
- Change the admin password any time: edit `ADMIN_PASSWORD` and run `npm run migrate` again.

## Editing content
Company phone/email/address and the services list live in one file: `web/lib/data.js`.

## Security notes
Passwords are bcrypt-hashed; admin API uses signed tokens; login and enquiry endpoints are rate-limited; the enquiry form has a hidden spam trap; uploads accept only JPG/PNG/WebP up to 6 MB.
