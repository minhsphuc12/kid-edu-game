# Triển khai KidZone Adventure lên hosting (HTTPS)

App là static: chỉ cần đẩy đúng các file lên host có HTTPS.

## Các file cần deploy

- `index.html`
- `manifest.webmanifest`
- `sw.js`
- Thư mục `games/` (toàn bộ file .js)
- Thư mục `icons/` (ít nhất `icon.svg`)

**Không** cần: `node_modules/`, `.git/`, file test hay config dev.

---

## GitHub Pages

1. Đẩy code lên GitHub (branch `main` hoặc `master`).
2. Vào **Settings → Pages** của repo.
3. **Source**: Deploy from a branch.
4. **Branch**: `main` (hoặc `master`), folder **/ (root)**.
5. Save. Sau vài phút site sẽ có tại:
   - `https://<username>.github.io/<repo-name>/`
6. Mở URL trên iPhone bằng Safari và dùng **Share → Add to Home Screen**.

Nếu repo tên `kid-edu-game` và username là `phucnm`, URL sẽ là:
`https://phucnm.github.io/kid-edu-game/`

---

## Netlify

1. Đăng nhập [netlify.com](https://netlify.com), **Add new site → Import an existing project**.
2. Chọn GitHub và repo của bạn.
3. **Build settings**:
   - Build command: để trống (không build).
   - Publish directory: `.` (root).
4. Deploy. Netlify sẽ cấp URL HTTPS (vd: `https://xxx.netlify.app`).

---

## Vercel / Cloudflare Pages

- **Vercel**: Import repo, Publish directory = root, không cần build.
- **Cloudflare Pages**: Connect repo, Build = None (hoặc chỉ upload), output = root.

---

## Kiểm tra sau khi deploy (test trên iPhone)

1. Trên iPhone, mở **Safari** và vào đúng URL app (HTTPS).
2. Chạy thử vài game; kiểm tra không vỡ layout, không lỗi khi chạm.
3. Thêm vào màn hình chính:
   - Nhấn nút **Share** (ô vuông có mũi tên lên).
   - Chọn **Add to Home Screen** / **Thêm vào Màn hình chính**.
   - Đặt tên (vd: KidZone) rồi **Add**.
4. Mở app từ icon vừa thêm:
   - App chạy fullscreen (không thanh địa chỉ Safari).
   - Thanh trạng thái có màu theme (#FF6B6B).
   - Xoay dọc/ngang và chạm hoạt động bình thường.
5. Nếu có lỗi: kiểm tra console (kết nối iPhone với Mac, dùng Safari Develop → [iPhone] → [trang]).
