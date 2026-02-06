# EIO4 Mobile - Architecture Documentation

## CSIR EOI 8119 - Mining Safety Mobile App

### System Architecture

```mermaid
flowchart TB
    subgraph mobile [Mobile Application]
        ExpoApp[Expo App]
        Router[Expo Router]
        Screens[Screens]
        Components[Components]
    end

    subgraph state [State Management]
        AuthContext[Auth Context]
        ThemeContext[Theme Context]
        SecureStore[Secure Store]
    end

    subgraph firebase [Firebase Services]
        FireAuth[Firebase Auth]
        Firestore[(Firestore)]
    end

    subgraph build [Build & Deploy]
        EAS[EAS Build]
        iOS[iOS App Store]
        Android[Google Play]
    end

    ExpoApp --> Router
    Router --> Screens
    Screens --> Components

    Screens --> AuthContext
    AuthContext --> FireAuth
    AuthContext --> SecureStore
    AuthContext --> Firestore

    EAS --> iOS
    EAS --> Android
```

### Navigation Structure

```mermaid
flowchart TB
    subgraph root [Root Layout]
        Index[Index]
    end

    subgraph auth [Auth Stack]
        Login[Login Screen]
        Register[Register Screen]
    end

    subgraph tabs [Tab Navigator]
        Dashboard[Dashboard Tab]
        Incidents[Incidents Tab]
        Checklist[Checklist Tab]
        Profile[Profile Tab]
    end

    Index --> auth
    Index --> tabs

    auth --> Login
    auth --> Register

    tabs --> Dashboard
    tabs --> Incidents
    tabs --> Checklist
    tabs --> Profile
```

### Component Hierarchy

```mermaid
flowchart TB
    subgraph app [App Root]
        RootLayout[Root Layout]
    end

    subgraph providers [Providers]
        GestureHandler[Gesture Handler]
        SafeArea[Safe Area Provider]
        Theme[Theme Provider]
        Auth[Auth Provider]
    end

    subgraph screens [Screens]
        DashboardScreen[Dashboard]
        IncidentsScreen[Incidents]
        ChecklistScreen[Checklist]
        ProfileScreen[Profile]
    end

    subgraph components [Shared Components]
        StatCard[Stat Card]
        AlertBanner[Alert Banner]
        Button[Button]
        Input[Input]
    end

    RootLayout --> GestureHandler
    GestureHandler --> SafeArea
    SafeArea --> Theme
    Theme --> Auth

    Auth --> screens
    screens --> components
```

### Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant App
    participant AuthContext
    participant Firebase
    participant SecureStore

    User->>App: Open app
    App->>SecureStore: Check stored token
    alt Token exists
        SecureStore-->>AuthContext: Return user data
        AuthContext->>App: Navigate to tabs
    else No token
        AuthContext->>App: Navigate to login
    end

    User->>App: Enter credentials
    App->>AuthContext: signIn
    AuthContext->>Firebase: signInWithEmailAndPassword
    Firebase-->>AuthContext: User credential
    AuthContext->>Firebase: Get user profile
    Firebase-->>AuthContext: User data
    AuthContext->>SecureStore: Store user
    AuthContext->>App: Navigate to tabs
```

### Data Flow

```mermaid
flowchart LR
    subgraph ui [UI Layer]
        Screen[Screen Component]
        State[Local State]
    end

    subgraph context [Context Layer]
        AuthCtx[Auth Context]
        User[User State]
    end

    subgraph service [Service Layer]
        Firebase[Firebase Service]
    end

    subgraph backend [Backend]
        Firestore[(Firestore)]
        Auth[Firebase Auth]
    end

    Screen --> State
    Screen --> AuthCtx
    AuthCtx --> User
    AuthCtx --> Firebase
    Firebase --> Firestore
    Firebase --> Auth
```

### Build & Deploy Pipeline

```mermaid
flowchart LR
    subgraph dev [Development]
        Code[Source Code]
        ExpoGo[Expo Go Testing]
    end

    subgraph build [EAS Build]
        Development[Dev Build]
        Preview[Preview Build]
        Production[Production Build]
    end

    subgraph deploy [Distribution]
        TestFlight[TestFlight]
        PlayInternal[Play Internal]
        AppStore[App Store]
        PlayStore[Play Store]
    end

    Code --> ExpoGo
    Code --> Development
    Code --> Preview
    Code --> Production

    Development --> ExpoGo
    Preview --> TestFlight
    Preview --> PlayInternal
    Production --> AppStore
    Production --> PlayStore
```

### Screen State Management

```mermaid
stateDiagram-v2
    [*] --> Loading: App Start
    Loading --> Authenticated: Token Valid
    Loading --> Unauthenticated: No Token

    Unauthenticated --> Login
    Login --> Authenticating: Submit
    Authenticating --> Authenticated: Success
    Authenticating --> Login: Error

    Authenticated --> Dashboard
    Dashboard --> Incidents
    Dashboard --> Checklist
    Dashboard --> Profile

    Profile --> Unauthenticated: Sign Out
```
