# QA Checklist — i18n EN/ES/VI (nicenailsaz.com)

> Mục đích: kiểm tra TAY những thứ Claude Code không tự test thay được (thiết bị thật,
> CDN, dịch vụ ngoài, đánh giá bản dịch). Đánh dấu ✅ khi pass.
>
> Locales: **en** (mặc định, `/`) · **es** (`/es`) · **vi** (`/vi`).
> Bản đã build/verify tự động: routing, redirect, cookie, hreflang, noindex, key parity, OG locale.

---

## 1. Auto-detect + cookie trên THIẾT BỊ / TRÌNH DUYỆT THẬT  ⚠️ cần thiết bị thật
- [ ] Điện thoại cài ngôn ngữ **ES** → mở `nicenailsaz.com` lần đầu (xoá cookie/incognito) → tự vào `/es`.
- [ ] Cài **VI** → vào lần đầu → `/vi`. Cài **EN** (hoặc khác) → `/`.
- [ ] Sau khi vào, thoát hẳn rồi mở lại → giữ đúng ngôn ngữ đã ở (cookie `NEXT_LOCALE`), KHÔNG detect lại.
- [ ] Đang ở `/es`, đổi ngôn ngữ điện thoại sang VI rồi reload `/es` → vẫn ở `/es` (cookie thắng, không bị ép).

## 2. Language switcher (header)
- [ ] Đổi EN ↔ ES ↔ VI ở **home, /services, /specials, /booking** → path giữ nguyên (vd `/services` → `/es/services`).
- [ ] Trang có `?query` (vd `/booking?service=...`) hoặc `#hash` (vd `/#about`) → đổi ngôn ngữ vẫn giữ query/hash.
- [ ] Switcher hiện rõ EN/ES/VI, đánh dấu ngôn ngữ hiện tại; bấm bằng bàn phím (Tab/Enter) được.
- [ ] Sau khi đổi tay → cookie `NEXT_LOCALE` cập nhật (lần sau theo lựa chọn tay).

## 3. Chức năng thật ở từng locale  ⚠️ một phần cần thiết bị thật
- [ ] **Book**: ở mỗi locale, đi hết luồng đặt lịch (chọn dịch vụ → kỹ thuật viên → ngày/giờ → điền form → Confirm).
      Label/nút/lỗi đúng ngôn ngữ; submit thành công; trang confirmation đúng ngôn ngữ; "Add to calendar" tải .ics.
- [ ] **Call**: nút Call (navbar, hero, bottom bar, footer) gọi đúng số `(602) 759-9184` ở cả 3 locale.
- [ ] Luồng booking KHÔNG rớt về `/` (en) giữa chừng — ở `/es/booking` submit xong phải sang `/es/booking/confirmation`.
- [ ] **Gift card / Directions** (nếu có nút): hoạt động ở cả 3 locale.

## 4. Visual QA layout — text ES/VI dài hơn EN  ⚠️ xem cả mobile + desktop
Soi kỹ các component RỦI RO CAO (Claude Code đã flag):
- [ ] **Navbar (tablet/md ~768px)**: nhiều link + nhãn dài hơn (Servicios, Cómo llegar, Dịch vụ, Chỉ đường) +
      switcher + nút Book → không tràn ngang / chen nhau xấu. (Đã giảm gap ở md; vẫn cần mắt người.)
- [ ] **BottomTabBar (mobile)**: nhãn tab ES/VI (Trang chủ, Đặt lịch, Thư viện) ở 10px không bị cắt/2 dòng xấu.
- [ ] **Hero CTA pill**: "RESERVAR" / "ĐẶT LỊCH" không tràn nút.
- [ ] **AnnouncementBar**: tiêu đề promo dài bị `truncate` (1 dòng) — kiểm tra không mất chữ quan trọng.
- [ ] **ServiceCard / badge / button** trên `/services`, `/specials`, home: tên/nhãn dài không vỡ thẻ.
- [ ] Nhìn tổng thể **home, /services, /specials, /booking** ở cả 3 ngôn ngữ trên mobile.

## 5. Performance — không tụt Core Web Vitals  ⚠️ chạy trên cả 3 locale
- [ ] Lighthouse/PageSpeed **mobile** cho `/`, `/es`, `/vi` (không chỉ en) — CLS/LCP không tệ hơn bản en trước i18n.
- [ ] Re-check lỗi **NO_LCP** (hero) trên cả bản `/es` `/vi`.
- [ ] Xác nhận bundle chỉ tải dictionary locale đang xem (không nhồi cả 3) — Network tab/`next build` chunk.

## 6. Production (Vercel preview)  ⚠️ cần deploy preview, không test localhost
- [ ] Redirect root theo `Accept-Language`/cookie KHÔNG bị CDN cache nhầm locale: thử nhiều trình duyệt/locale,
      xác nhận user EN không nhận redirect tới `/es` của người khác. (Middleware chạy per-request — về lý thuyết OK,
      nhưng phải xác nhận thật trên Vercel.)
- [ ] `/es`, `/vi` truy cập trực tiếp trả 200 (Googlebot vào được), không ép về en.

## 7. SEO sau deploy (Google Search Console)
- [ ] Submit lại `sitemap.xml` mới qua GSC.
- [ ] URL Inspection vài URL `/es`, `/vi` (trang đã dịch: `/es`, `/es/services`, `/es/specials`) → yêu cầu index.
- [ ] Theo dõi GSC **Pages** + **International Targeting**: Google index đúng 3 bản trang đã dịch, không báo lỗi hreflang.
- [ ] Xác nhận trang CHƯA dịch ở `/es` `/vi` (12 landing + blog) đang **noindex** — không bị index trùng nội dung tiếng Anh.

## 8. Việc của NGƯỜI (không phải code)
- [ ] **Review bản dịch ES + VI bằng người** trước khi bỏ noindex / mở rộng — bản hiện tại là draft của agent.
      Soi kỹ tên dịch vụ + câu CTA (dễ gượng). Tên dịch vụ ngành (Gel Manicure, Dip Powder, Acrylic…) cố ý GIỮ tiếng Anh.
- [ ] **Template email/SMS xác nhận đặt lịch**: hiện gửi từ backend/dịch vụ ngoài (Twilio/booking API) — KHÔNG nằm
      trong `nail-website`. Cần kiểm template có gửi theo ngôn ngữ khách chọn không; nếu cần đa ngôn ngữ → xử lý ở
      `nail-backend`/dịch vụ gửi tin, truyền locale khách kèm payload booking. (Claude Code chưa đụng phần này.)
- [ ] NAP giữ nguyên mọi ngôn ngữ: "Nice Nails & Spa", 8048 N 19th Ave, Phoenix, AZ 85021, (602) 759-9184 — xác nhận không bị dịch.

---

## Đã làm & verify tự động (tham chiếu, không cần test lại)
- 3 URL `/ /es /vi` render SSR/SSG (core routes static `●`, chỉ `blog/[slug]` là `ƒ`).
- Redirect lần đầu **307** (next-intl, temporary — không phải 301); cookie `NEXT_LOCALE` set khi vào trang locale.
- Googlebot (Accept-Language: en) vào `/es` `/vi` = 200; `/en` → `/`.
- hreflang en/es/vi/x-default trên trang đã dịch; `noindex,follow` + self-canonical trên `/es /vi` của trang chưa dịch.
- `og:locale` + `og:locale:alternate` (×2) trên trang đã dịch; `<html lang>` đúng theo locale.
- Sitemap: trang đã dịch có alternates.languages; trang chưa dịch chỉ URL en.
- Dictionary 3 file key parity + ICU placeholder khớp (đã script-check).
- Luồng booking + pickers + confirmation dịch theo locale; điều hướng locale-aware (không rớt en).
- `trackEvent` tự kèm param `locale` cho mọi event (book_click, call_click, …).
- Regression: AnnouncementBar (+ dismiss localStorage theo promo id), HomePromoSection, /specials, FeaturedVideos,
  LiteYouTube facade (lazy, không load iframe tới khi click), GA4 + Clarity ở layout — đều còn sống ở cây `[locale]`.
