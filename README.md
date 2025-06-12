# Capacitor News Feed

A modern mobile news feed application built with React and Capacitor.

## Author

**Quoc Loc**

## Tech Stack

- **ReactJS** - Frontend library for building user interfaces
- **CapacitorJS** - Cross-platform native runtime for web apps
- **Ionic Framework** - UI toolkit for building mobile apps
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase Firestore** - NoSQL document database
- **Firebase Storage** - Cloud storage for user-generated content
- **Capacitor Storage** - Local storage for draft content

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Xcode (for iOS development)
- Android Studio (for Android development)

### Setup

1. **Environment Configuration**

   ```bash
   # Contact quocloc@evol.vn for .env file
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Update WiFi IP Address**

   Get your current WiFi IP address:

   ```bash
   # On macOS/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1

   # On Windows
   ipconfig | findstr "IPv4"
   ```

   Update `capacitor.config.ts` with your WiFi IP:

   ```typescript
   server: {
     url: "http://YOUR_WIFI_IP:5173",
     cleartext: true,
   },
   ```

4. **Build the Project**

   ```bash
   npm run build
   ```

5. **Sync Capacitor**

   ```bash
   npm run sync
   ```

6. **Open Platform-specific IDEs**

   **iOS:**

   ```bash
   npm run open:ios
   ```

   **Android:**

   ```bash
   npm run open:android
   ```

## Development

To start the development server:

```bash
npm run dev
```

## Contact

For environment configuration and other inquiries, please contact:
**quocloc@evol.vn**
