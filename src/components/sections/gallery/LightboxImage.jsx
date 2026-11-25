"use client";

import { emptySubscribe, getCloudinaryUrl, isConstrainedDevice } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";

function getAdaptiveLightboxUrl(src, isConstrained, viewportWidth) {
  if (isConstrained) {
    return getCloudinaryUrl(src, {
      width: viewportWidth <= 640 ? 900 : 1080,
      quality: "auto:eco",
    });
  }
  if (viewportWidth <= 640) return getCloudinaryUrl(src, { width: 1080, quality: "auto:good", sharpen: 30 });
  if (viewportWidth <= 1024) return getCloudinaryUrl(src, { width: 1280, quality: "auto:good", sharpen: 30 });
  return getCloudinaryUrl(src, { width: 1600, quality: "auto:good", sharpen: 35 });
}

export default function LightboxImage({ item, previewSrc, prevItem, nextItem }) {
  const isConstrained = useSyncExternalStore(emptySubscribe, isConstrainedDevice, () => false);
  const [status, setStatus] = useState({ src: null, mode: "loading" });

  const mode = status.src === item.src ? status.mode : "loading";
  const isLoaded = mode === "loaded";
  const useSafeFallback = mode === "fallback";
  const hasError = mode === "error";

  // Chỉ tải ngầm ảnh kế tiếp/trước đó sau khi ảnh hiện tại đã xong và không phải WebView/mạng yếu
  useEffect(() => {
    if (!isLoaded || isConstrained) return;
    const vw = window.innerWidth;
    [nextItem, prevItem].forEach((neighbor) => {
      if (!neighbor?.src || neighbor.src === item.src) return;
      const img = new window.Image();
      img.decoding = "async";
      img.src = getAdaptiveLightboxUrl(neighbor.src, false, vw);
    });
  }, [isLoaded, isConstrained, item.src, nextItem, prevItem]);

  const fallbackImgSrc = useSafeFallback
    ? getCloudinaryUrl(item.src, { width: 900, quality: "auto:eco", format: "jpg" })
    : getCloudinaryUrl(item.src, isConstrained ? { width: 1080, quality: "auto:eco" } : { width: 1600, quality: "auto:good", sharpen: 35 });

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Lớp nền xem trước 0ms lấy trực tiếp từ cache của Slider */}
      {!isLoaded && previewSrc && (
        <picture className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
          <img
            src={previewSrc}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="w-full h-full object-contain select-none"
          />
        </picture>
      )}

      {/* Trạng thái đang tải nhẹ khi chưa có cache hoặc đang nâng độ nét */}
      {!isLoaded && !hasError && (
        <div
          className={`pointer-events-none z-10 flex items-center gap-2 rounded-full bg-black/75 border border-white/15 px-3 py-1.5 text-xs text-white/90 ${
            previewSrc ? "absolute top-3 left-1/2 -translate-x-1/2" : "absolute"
          }`}
        >
          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" />
          <span>{previewSrc ? "Đang tải ảnh nét..." : "Đang tải ảnh..."}</span>
        </div>
      )}

      {hasError && (
        <div className="z-10 rounded-xl bg-black/80 border border-white/15 px-4 py-3 text-center text-xs sm:text-sm text-amber-100/90">
          Không tải được ảnh. Vui lòng kiểm tra kết nối mạng hoặc thử lại.
        </div>
      )}

      <picture
        key={`${item.id}-${useSafeFallback ? "jpg" : "auto"}`}
        className="w-full h-full flex items-center justify-center"
      >
        {!useSafeFallback && isConstrained && (
          <source
            media="(max-width: 640px)"
            srcSet={getCloudinaryUrl(item.src, { width: 900, quality: "auto:eco" })}
          />
        )}
        {!useSafeFallback && !isConstrained && (
          <>
            <source
              media="(max-width: 640px)"
              srcSet={getCloudinaryUrl(item.src, { width: 1080, quality: "auto:good", sharpen: 30 })}
            />
            <source
              media="(max-width: 1024px)"
              srcSet={getCloudinaryUrl(item.src, { width: 1280, quality: "auto:good", sharpen: 30 })}
            />
          </>
        )}
        <img
          src={fallbackImgSrc}
          alt={item.alt || `Hoạt động ${item.id}`}
          fetchPriority="high"
          decoding="async"
          draggable={false}
          onLoad={() => setStatus({ src: item.src, mode: "loaded" })}
          onError={() => {
            if (!useSafeFallback) {
              setStatus({ src: item.src, mode: "fallback" });
            } else {
              setStatus({ src: item.src, mode: "error" });
            }
          }}
          className={`w-full h-full object-contain select-none pointer-events-none transition-opacity duration-200 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </picture>
    </div>
  );
}
