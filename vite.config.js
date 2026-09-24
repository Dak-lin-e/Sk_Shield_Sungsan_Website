import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{host: true},
  // /admin에서 늦게 발견되는 Firebase 모듈을 미리 묶어 개발 중 인스턴스 중복을 막는다.
  optimizeDeps: {
    include: ["firebase/app", "firebase/firestore/lite", "firebase/auth", "firebase/storage"],
  },
});
