import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.quocloc.capacitor_newsfeed",
  appName: "capacitor-newsfeed",
  webDir: "dist",
  server: {
    url: "http://10.20.50.99:5173",
    cleartext: true,
  },
};

export default config;
