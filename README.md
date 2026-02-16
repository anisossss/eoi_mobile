# CSIR EOI 8119 - Mining Safety Mobile App

<div align="center">

![CSIR Logo](https://img.shields.io/badge/CSIR-EOI_8119-blue?style=for-the-badge)
![Expo](https://img.shields.io/badge/Expo-54-000020?style=for-the-badge&logo=expo)
![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)

**Mining Safety Companion App - Demonstrating Mobile Development Proficiency**

</div>

---

## Project Overview

This mobile application demonstrates proficiency in:

- **React Native** with Expo SDK 54
- **Mobile Deployment** with EAS Build
- **Firebase Integration** (Auth, Firestore)
- **TypeScript** for type safety
- **Modern Mobile UI/UX** patterns

### Technical Evaluation Criteria Addressed

| Criterion         | Implementation                      |
| ----------------- | ----------------------------------- |
| Mobile deployment | Expo with EAS Build for iOS/Android |
| React Native      | Expo Router, React Navigation       |
| Firebase          | Auth, Firestore for data            |
| TypeScript        | Full type safety                    |
| Modern UI         | Gesture handlers, animations        |

---

## Features

### Dashboard

- Real-time safety statistics
- Quick action buttons
- Recent activity feed
- Active alerts display

### Incident Reporting

- Report safety incidents
- Set severity levels
- Track incident status
- Photo attachments (planned)

### Safety Checklists

- Interactive checklists
- Progress tracking
- Due date management
- Completion history

### User Profile

- Account management
- Activity statistics
- Settings and preferences

---

## Technology Stack

| Component  | Technology         |
| ---------- | ------------------ |
| Framework  | React Native 0.76  |
| Platform   | Expo SDK 54        |
| Navigation | Expo Router 4      |
| State      | React Context      |
| Auth       | Firebase Auth      |
| Database   | Firebase Firestore |
| Build      | EAS Build          |
| Language   | TypeScript 5.3     |

---

## Quick Start

### Prerequisites

- Node.js 20+
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app (for development)
- EAS CLI (`npm install -g eas-cli`) for builds

### Development

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android
```

### Building for Production

```bash
# Login to EAS
eas login

# Build for Android (APK for testing)
eas build --platform android --profile preview

# Build for iOS (TestFlight)
eas build --platform ios --profile production

# Build for both platforms
eas build --platform all --profile production
```

---

## Project Structure

```
EIO4_mobile/
├── app/                      # Expo Router app directory
│   ├── (auth)/              # Authentication screens
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/              # Main app tabs
│   │   ├── _layout.tsx
│   │   ├── index.tsx        # Dashboard
│   │   ├── incidents.tsx
│   │   ├── checklist.tsx
│   │   └── profile.tsx
│   ├── _layout.tsx          # Root layout
│   └── index.tsx            # Entry point
├── components/              # Reusable components
│   ├── StatCard.tsx
│   └── AlertBanner.tsx
├── constants/              # Theme and constants
│   └── theme.ts
├── contexts/               # React contexts
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── services/               # API and Firebase
│   └── firebase.ts
├── assets/                 # Images and fonts
├── app.json               # Expo config
├── eas.json               # EAS Build config
└── package.json
```

---

## Environment Variables

Create a `.env` file:

---

## Deployment

### Android

1. Build APK for testing:

```bash
eas build --platform android --profile preview
```

2. Build AAB for Play Store:

```bash
eas build --platform android --profile production
```

3. Submit to Play Store:

```bash
eas submit --platform android
```

### iOS

1. Build for TestFlight:

```bash
eas build --platform ios --profile production
```

2. Submit to App Store:

```bash
eas submit --platform ios
```

---

## Screenshots

| Dashboard       | Incidents      | Checklist         | Profile       |
| --------------- | -------------- | ----------------- | ------------- |
| Safety overview | Report & track | Interactive lists | User settings |

---

<div align="center">

**Built for CSIR EOI 8119/06/02/2026**

_Demonstrating Mobile Development with React Native & Expo_

</div>
