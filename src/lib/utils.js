import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Chuyển đổi URL Cloudinary sang kích thước và độ nén theo ngữ cảnh hiển thị
 */
export function getCloudinaryUrl(url, opts = {}) {
  const { width = 900, quality = "auto:good", blur, sharpen, format = "auto" } = opts;
  if (!url || typeof url !== "string" || !url.includes("res.cloudinary.com")) {
    return url;
  }

  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return url;

  const afterUpload = url.slice(uploadIndex + 8);
  const versionMatch = afterUpload.match(/v\d+\//);
  const versionPath = versionMatch ? afterUpload.slice(versionMatch.index) : afterUpload;

  let transform;
  if (blur) {
    transform = `f_${format},q_10,w_${width},e_blur:${blur}`;
  } else if (sharpen) {
    transform = `f_${format},q_${quality},w_${width},c_limit,e_sharpen:${sharpen}`;
  } else {
    transform = `f_${format},q_${quality},w_${width},c_limit`;
  }

  return `${url.slice(0, uploadIndex)}/upload/${transform}/${versionPath}`;
}

export const emptySubscribe = () => () => {};

/**
 * Tạo chuỗi srcSet Cloudinary từ mảng [width, quality]
 */
export function buildCloudinarySrcSet(url, variants) {
  return variants
    .map(([width, quality]) => `${getCloudinaryUrl(url, { width, quality })} ${width}w`)
    .join(", ");
}

/**
 * Hạ cấp ảnh sang JPEG cỡ nhỏ một lần nếu trình duyệt/WebView lỗi giải mã f_auto
 */
export function handleCloudinaryFallback(event, originalUrl, width = 480) {
  const img = event.currentTarget;
  if (img.dataset.fallback) return;
  img.dataset.fallback = "1";
  img.removeAttribute("srcset");
  img.src = getCloudinaryUrl(originalUrl, { width, quality: "auto:eco", format: "jpg" });
}

/**
 * Phát hiện trình duyệt nhúng WebView (Facebook, Messenger, Zalo, TikTok, Instagram, Line, Telegram, Android WebView)
 */
export function isInAppWebView() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return (
    /; wv\b/i.test(ua) ||
    /FBAN|FBAV|FB_IAB|FB4A|Messenger|Orca-Android|Instagram|Barcelona|Zalo|Line\/|TikTok|BytedanceWebview|musical_ly|MicroMessenger|KAKAOTALK|Telegram|Twitter|Snapchat|LinkedInApp/i.test(
      ua
    )
  );
}

/**
 * Nhận diện thiết bị/mạng hạn chế (In-App WebView, Save-Data, 2G/3G hoặc RAM <= 2GB)
 */
export function isConstrainedDevice() {
  if (typeof window === "undefined") return false;
  if (isInAppWebView()) return true;
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn) {
    if (conn.saveData || ["slow-2g", "2g", "3g"].includes(conn.effectiveType)) {
      return true;
    }
  }
  if (typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 2) {
    return true;
  }
  return false;
}
