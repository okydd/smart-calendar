/// <reference types="vite/client" />

/** 构建时注入的版本号（北京时间 ISO 串），与 dist/version.json 一致 */
declare const __APP_VERSION__: string;

/** 构建时注入的语义版本号（V主.次），来自 version-meta.json */
declare const __APP_SEMVER__: string;
