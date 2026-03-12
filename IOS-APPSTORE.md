# Kế hoạch đưa KidZone lên App Store (iOS wrapper)

Tài liệu này mô tả các bước và lựa chọn khi muốn đóng gói web app KidZone thành app native và đăng lên App Store.

## Yêu cầu

- **Tài khoản Apple Developer**: 99 USD/năm ([developer.apple.com](https://developer.apple.com)).
- **Mac** với **Xcode** bản mới nhất.
- App hiện tại đã chạy ổn định dưới dạng PWA (nên test kỹ trên Safari iOS trước).

## Hai hướng đóng gói

### 1. SwiftUI + WKWebView (native thuần)

- Tạo project iOS (SwiftUI), thêm một `WKWebView` full screen.
- **Cách load**:
  - **A)** Load URL online: `load(URLRequest(url: URL(string: "https://...")!))` — app luôn cần mạng, đơn giản.
  - **B)** Đóng gói file: copy `index.html`, `games/`, `icons/`, `manifest.webmanifest`, `sw.js` vào bundle; load từ `Bundle.main` (vd: `file:///.../index.html`) — chạy offline, cần cập nhật app khi đổi nội dung.
- Ưu: kiểm soát hoàn toàn, dung lượng nhỏ, không phụ thuộc framework bên ngoài.
- Nhược: chỉ hỗ trợ iOS; mỗi lần sửa web phải build lại nếu dùng cách B.

### 2. Capacitor (cross‑platform)

- Thêm Capacitor vào project (hoặc tạo project mới từ thư mục web hiện tại).
- Cấu hình `capacitor.config` trỏ `webDir` tới thư mục chứa `index.html`, `games/`, `icons/`, manifest, `sw.js`.
- Chạy `npx cap add ios`, `npx cap sync`, mở Xcode và build.
- Load: mặc định là bundle local (offline). Có thể cấu hình load từ URL nếu muốn.
- Ưu: một codebase web, có thể mở rộng Android sau; quen với ecosystem web thì dễ bảo trì.
- Nhược: thêm dependency, dung lượng app lớn hơn một chút.

## Gợi ý thứ tự làm

1. Quyết định load **online** hay **offline** (URL vs bundle).
2. Chọn **SwiftUI + WKWebView** nếu chỉ cần iOS và muốn tối giản; chọn **Capacitor** nếu muốn một codebase cho nhiều nền tảng.
3. Tạo project, cấu hình WebView load đúng start URL hoặc file local.
4. Cấu hình **Info.plist**: tên app, orientation, có thể cần cấu hình ATS / domain nếu load từ URL.
5. Chuẩn bị **App Store**: metadata (tên, mô tả, từ khóa), screenshot (iPhone), icon 1024x1024, **Privacy Policy** URL (bắt buộc nếu app có thể thu thập dữ liệu; với KidZone thuần game local có thể mô tả “không thu thập dữ liệu”).
6. Tuân thủ **trẻ em**: nếu target trẻ dưới 13, cần khai báo đúng và tuân COPPA / quy định tương đương (không thu thập dữ liệu cá nhân trẻ em).
7. Build archive, upload lên App Store Connect, điền metadata và gửi review.
8. Test qua **TestFlight** trước khi release công khai.

## Tài liệu tham khảo

- [WKWebView (Apple)](https://developer.apple.com/documentation/webkit/wkwebview)
- [Capacitor iOS](https://capacitorjs.com/docs/ios)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Kids category / COPPA](https://developer.apple.com/design/human-interface-guidelines/playing-audio) và mục family/kids trong guidelines.
