import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Chuyển đổi URL Cloudinary sang kích thước và độ nén theo ngữ cảnh hiển thị
 */
export function getCloudinaryUrl(url, opts = {}) {
  const { width = 900, quality = "auto:good", blur, sharpen } = opts;
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
    transform = `f_auto,q_10,w_${width},e_blur:${blur}`;
  } else if (sharpen) {
    transform = `f_auto,q_${quality},w_${width},c_limit,e_sharpen:${sharpen}`;
  } else {
    transform = `f_auto,q_${quality},w_${width},c_limit`;
  }

  return `${url.slice(0, uploadIndex)}/upload/${transform}/${versionPath}`;
}
