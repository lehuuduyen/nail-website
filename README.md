# Nice Nails & Spa — Public website (`nail-website`)

Next.js 14 (App Router) marketing + booking site. Styling: Tailwind, rose gold / cream / charcoal palette, Framer Motion.

## 1. Connect to `nail-backend`

1. Start PostgreSQL and ensure `nail-backend` has a valid `.env` (DB URL, `JWT_SECRET`, etc.).
2. Apply schema changes (new columns / `galleries` table):

   ```bash
   cd nail-backend && npm run db:alter
   ```

3. (Optional) Reseed demo data **(wipes DB)**:

   ```bash
   npm run seed
   ```

4. Start the API (default **port 5001**):

   ```bash
   npm start
   # or: npm run dev
   ```

5. Copy env for the site:

   ```bash
   cd ../nail-website
   cp .env.local.example .env.local
   ```

   Set `NEXT_PUBLIC_API_URL` to the same origin as the API, e.g. `http://localhost:5001`. Salon copy (name, phone, address, hours, Google Maps link, optional embed iframe URL) lives in the same file — defaults match **Nice Nails & Spa** ([nicenailsphoenix.com](https://nicenailsphoenix.com/)).

6. Run the site:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). The app calls:

   - `GET  {API}/api/public/services`
   - `GET  {API}/api/public/employees`
   - `GET  {API}/api/public/appointments/availability`
   - `POST {API}/api/public/appointments/book`
   - `GET  {API}/api/gallery` (public)

## 2. Add gallery photos (admin — `nail-frontend`)

1. Point `nail-frontend` at the same API (e.g. `VITE_API_URL=http://localhost:5001` in `.env`).
2. Log in, open **Gallery** in the sidebar.
3. Choose category, optional title, **Choose file** → uploads `multipart/form-data` to `POST /api/gallery` (field name **`image`**).
4. Drag cards onto another card to reorder → updates `displayOrder` via `PUT /api/gallery/:id`.
5. Toggle **Activate / Deactivate** or **Delete** as needed.

Admin list uses `GET /api/gallery/admin` (JWT required).

## 3. Test booking end-to-end

1. Backend + `nail-website` dev servers running; `.env.local` has `NEXT_PUBLIC_API_URL`.
2. Open `/booking`, complete steps 1–4 (service → staff or “anyone” → date/time → your details).
3. Submit → redirect to `/booking/confirmation` with reference number.
4. In **nail-frontend → Schedule**, pick that date: appointment shows **Web booking** badge; use **Confirm** / **Cancel** to update status.

Optional SMS: set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` (and optional `SALON_DISPLAY_NAME`) on the backend.

## 4. Deploy to Vercel (free tier)

1. Push the monorepo to GitHub/GitLab/Bitbucket.
2. In [Vercel](https://vercel.com), **New Project** → import the repo.
3. **Root directory**: `nail-website`.
4. **Environment variables** (Production + Preview):

   - `NEXT_PUBLIC_API_URL` — your public API URL (e.g. `https://api.yourdomain.com`).
   - `NEXT_PUBLIC_SALON_NAME`, `NEXT_PUBLIC_SALON_PHONE`, `NEXT_PUBLIC_SALON_ADDRESS`, `NEXT_PUBLIC_GOOGLE_MAPS_EMBED` as needed.

5. Deploy. Ensure the backend allows your Vercel origin in **CORS** and that `PUBLIC_BASE_URL` (or gallery image URLs) matches your deployed API host so uploaded images resolve correctly.
