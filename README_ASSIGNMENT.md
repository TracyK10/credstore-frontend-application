# BNPL Checkout Flow - Assignment Documentation

## 📋 Table of Contents

1. [Assignment Overview](#assignment-overview)
2. [Architectural Decisions](#architectural-decisions)
3. [Tech Stack Justification](#tech-stack-justification)
4. [Setup Instructions](#setup-instructions)
5. [Project Structure](#project-structure)
6. [Implementation Details](#implementation-details)
7. [Testing & Validation](#testing--validation)
8. [Deployment Guide](#deployment-guide)
9. [Known Limitations](#known-limitations)
10. [Future Enhancements](#future-enhancements)

---

## 📋 Assignment Overview

### Objective

Build a pixel-perfect, production-ready Buy Now Pay Later (BNPL) checkout flow with the following requirements:

- **3-step checkout process**: Account → Shipping → Payment
- **Real-time form validation** without external validation libraries
- **Bilingual support**: English and Kiswahili with instant switching
- **State persistence** across steps
- **Responsive design** matching Figma specifications
- **Production deployment** to Vercel

### Constraints

- ❌ No Zustand, Redux, or other state management libraries
- ❌ No React Hook Form or Formik
- ❌ No Zod, Yup, or validation libraries
- ✅ Use vanilla React patterns (Context API, hooks, controlled components)
- ✅ TypeScript strict mode throughout

---

## 🏗️ Architectural Decisions

### 1. State Management: React Context API

**Decision**: Use React Context API instead of external state management libraries.

**Rationale**:
- **Simplicity**: Built-in React feature, no additional dependencies
- **Type Safety**: Full TypeScript support with typed contexts
- **Appropriate Scale**: Checkout flow has limited state complexity
- **Performance**: Context updates are scoped to checkout flow only

**Implementation**:

```typescript
// Two separate contexts for separation of concerns
1. CheckoutContext - Manages checkout flow state (steps, form data)
2. TranslationContext - Manages language and i18n globally
```

**Alternatives Considered**:
- **Zustand**: Rejected to meet assignment constraints
- **Redux**: Overkill for this use case
- **Component State Only**: Would require prop drilling, harder to maintain

### 2. Form Validation: Manual Utilities

**Decision**: Implement custom validation functions with regex and logic checks.

**Rationale**:
- **Learning Value**: Demonstrates understanding of validation logic
- **No Dependencies**: Meets assignment constraints
- **Full Control**: Custom error messages and validation rules
- **Type Safety**: Return types defined with TypeScript

**Implementation**:

```typescript
// lib/validation.ts
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    isValid: emailRegex.test(email),
    errorMessage: emailRegex.test(email) ? "" : "Invalid email format"
  };
};
```

**Alternatives Considered**:
- **Zod**: Schema validation library - rejected per constraints
- **React Hook Form**: Form library with built-in validation - rejected per constraints

### 3. Internationalization: Custom Context-Based System

**Decision**: Build custom i18n using React Context and JSON translations.

**Rationale**:
- **Global State**: Language changes affect entire app instantly
- **Type Safety**: Translation keys are type-checked
- **Currency Formatting**: Custom logic for £ vs KSh
- **No Dependencies**: Pure React implementation

**Implementation**:

```typescript
// contexts/TranslationContext.tsx
- TranslationProvider wraps entire app
- useTranslation hook provides t(), locale, setLocale, formatCurrency
- All components subscribe to global locale changes
```

**Key Benefit**: Clicking language toggle in header updates every component simultaneously.

### 4. Navigation: Single Source of Truth Pattern

**Decision**: Implement unidirectional URL synchronization to prevent infinite loops.

**Rationale**:
- **Browser Support**: Back/forward buttons work correctly
- **Deep Linking**: URL parameters allow direct navigation
- **No Flickering**: Eliminated circular dependency between effects
- **Routing Guards**: Prevent skipping required steps

**Implementation**:

```typescript
// One effect reads URL changes (browser history only)
useEffect(() => {
  const urlStep = searchParams.get("step");
  setCurrentStep(mapStep(urlStep));
}, [searchParams]); // Only dependency: URL

// Button clicks write URL directly
const handleNext = () => {
  router.push("/checkout?step=shipping", { scroll: false });
};
```

**Problem Solved**: Previous implementation had two competing effects causing infinite re-renders.

### 5. Vercel Deployment: Suspense Boundaries

**Decision**: Wrap `useSearchParams()` components in Suspense boundaries.

**Rationale**:
- **Next.js 14 Requirement**: Enables static generation
- **Vercel Build Success**: Required for production deployment
- **Performance**: Allows parallel data fetching
- **Client/Server Separation**: Proper component boundaries

**Implementation**:

```typescript
// app/checkout/page.tsx (Server Component)
export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent /> {/* Client Component with useSearchParams */}
    </Suspense>
  );
}
```

### 6. Package Manager: pnpm 9

**Decision**: Use pnpm 9.15.4 as specified in `packageManager` field.

**Rationale**:
- **Disk Efficiency**: Saves ~50% disk space vs npm
- **Speed**: Faster installation than npm/yarn
- **Strict**: Better dependency resolution
- **Vercel Support**: Automatically detected during deployment

---

## 🛠️ Tech Stack Justification

### Framework: Next.js 14 (App Router)

**Why Next.js**:
- Server-side rendering capabilities
- File-based routing
- API routes for simulated backend
- Production-ready out of the box
- Excellent TypeScript support

**Why App Router**:
- Modern React patterns (Server/Client components)
- Better performance with streaming
- Simplified data fetching
- Required for Vercel optimization

### Language: TypeScript (Strict Mode)

**Configuration**:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**Benefits**:
- Compile-time error detection
- IntelliSense and autocomplete
- Self-documenting code
- Refactoring confidence

### Styling: Tailwind CSS

**Why Tailwind**:
- Rapid development with utility classes
- Consistent design system
- Purge unused styles in production
- No CSS file management
- Responsive modifiers built-in

**Custom Configuration**:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3182CE',
        'input-bg': '#E2E8F0'
      }
    }
  }
}
```

---

## 🚀 Setup Instructions

### Prerequisites

**Required**:
- Node.js >= 20.0.0
- pnpm 9.15.4

**Check versions**:
```bash
node --version  # Should be v20.x.x or higher
pnpm --version  # Should be 9.15.4
```

### Installation

**Step 1: Install pnpm 9** (if not already installed)
```bash
npm install -g pnpm@9.15.4
```

**Step 2: Clone repository**
```bash
git clone <repository-url>
cd credstore-frontend-application
```

**Step 3: Install dependencies**
```bash
pnpm install
```

This will:
- Install all packages from `package.json`
- Generate `pnpm-lock.yaml` with version 9 format
- Setup node_modules with pnpm's efficient symlink structure

**Step 4: Verify installation**
```bash
# Check if node_modules exists
ls node_modules

# Verify lock file version
head -n 1 pnpm-lock.yaml  # Should show lockfileVersion: '9.0'
```

### Development

**Start dev server**:
```bash
pnpm dev
```

Server runs at: `http://localhost:3000`

**Navigate to checkout**:
```
http://localhost:3000/checkout
```

**Available scripts**:
```bash
pnpm dev      # Development server with hot reload
pnpm build    # Production build
pnpm start    # Serve production build
pnpm lint     # ESLint checks
```

### Environment Setup

**No environment variables required** - This is a frontend-only demo application.

---

## 📂 Project Structure

### Directory Organization

```
credstore-frontend-application/
├── app/
│   ├── api/checkout/           # API route handlers
│   │   ├── account/route.ts    # POST /api/checkout/account
│   │   ├── shipping/route.ts   # POST /api/checkout/shipping
│   │   ├── payment/route.ts    # POST /api/checkout/payment
│   │   ├── complete/route.ts   # POST /api/checkout/complete
│   │   └── summary/route.ts    # GET /api/checkout/summary
│   ├── checkout/
│   │   └── page.tsx            # Checkout page with Suspense
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout (providers)
│   └── page.tsx                # Home page
│
├── components/
│   ├── checkout/
│   │   ├── CheckoutContent.tsx # Main checkout logic
│   │   ├── OrderSummary.tsx    # Right sidebar
│   │   ├── StepIndicator.tsx   # Progress bar
│   │   └── steps/
│   │       ├── AccountStep.tsx # Step 1: Email/Password
│   │       ├── ShippingStep.tsx # Step 2: Address
│   │       └── PaymentStep.tsx # Step 3: Card details
│   ├── layout/
│   │   ├── CheckoutLayout.tsx  # Two-column layout
│   │   └── Header.tsx          # Nav + language toggle
│   └── ui/
│       ├── Button.tsx          # Reusable button
│       ├── Select.tsx          # Dropdown component
│       └── ValidatedInput.tsx  # Input with validation
│
├── context/
│   ├── CheckoutContext.tsx     # Checkout state
│   └── TranslationContext.tsx  # Global i18n
│
├── contexts/
│   └── TranslationContext.tsx  # (same as above)
│
├── hooks/
│   └── useTranslation.ts       # Re-export from context
│
├── lib/
│   └── validation.ts           # Validation utilities
│
├── locales/
│   └── translations.json       # EN/SW translations
│
├── types/
│   └── checkout.ts             # TypeScript interfaces
│
├── package.json                # Dependencies + pnpm spec
├── pnpm-lock.yaml              # Lock file (version 9)
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind config
└── README.md                   # User documentation
```

### Key Files Explained

**`app/layout.tsx`** - Root layout wrapping providers:
```typescript
<TranslationProvider>     // Global language state
  <CheckoutProvider>      // Checkout flow state
    {children}
  </CheckoutProvider>
</TranslationProvider>
```

**`components/checkout/CheckoutContent.tsx`** - Main checkout logic:
- Client component with `useSearchParams()`
- Single effect for URL synchronization
- Renders appropriate step component

**`contexts/TranslationContext.tsx`** - i18n implementation:
- Manages locale state (`en` | `sw`)
- Provides `t()` function for translations
- Handles currency formatting

**`lib/validation.ts`** - Validation utilities:
- Email, password, card number validation
- Returns `{ isValid, errorMessage }`
- Type-safe with TypeScript

---

## 🔧 Implementation Details

### Step Flow Architecture

**Step Progression**:
```
Account (Step 1)
  ↓ [Validate email/password]
Shipping (Step 2)
  ↓ [Validate address]
Payment (Step 3)
  ↓ [Validate card]
Success
```

**Routing Guard**:
```typescript
// In CheckoutContent.tsx
if (urlStep > 1 && !accountData.email) {
  router.replace("/checkout?step=account");
  return;
}
```

This prevents users from:
- Typing `/checkout?step=payment` directly
- Skipping account creation

### Form Validation Strategy

**Real-time Validation**:
```typescript
// In each step component
useEffect(() => {
  const result = validateEmail(email);
  setEmailValid(result.isValid);
  setErrorMessage(result.errorMessage);
}, [email]);
```

**Visual Feedback**:
- ✅ Black checkmark when valid
- ❌ Red border + error message when invalid
- Gray state when empty

**Validation Rules**:
- Email: RFC 5322 regex
- Password: Min 8 characters
- Card: 16 digits, numeric only
- Expiration: MM/YY format
- CVC: 3 digits

### State Persistence Pattern

**Data Flow**:
```
Component Local State (useState)
  ↓ [User types]
Validation (useEffect)
  ↓ [Valid input]
Context (updateAccountData)
  ↓ [Step navigation]
Persisted for entire session
```

**Example**:
```typescript
// AccountStep.tsx
const [email, setEmail] = useState(accountData.email); // Initialize from context

const handleNext = () => {
  updateAccountData({ email, password }); // Save to context
  router.push("/checkout?step=shipping"); // Navigate
};
```

When user returns to Step 1, `accountData.email` is preserved.

### Language Toggle Implementation

**Global State Update**:
```typescript
// Header.tsx - Toggle button
onClick={() => setLocale(locale === "en" ? "sw" : "en")}

// Any component - Automatically re-renders
const { t } = useTranslation();
<h2>{t("account.title")}</h2>  // "Account details" or "Maelezo ya akaunti"
```

**Translation File Structure**:
```json
{
  "en": {
    "account": { "title": "Account details" },
    "steps": { "account": "Account" }
  },
  "sw": {
    "account": { "title": "Maelezo ya akaunti" },
    "steps": { "account": "Akaunti" }
  }
}
```

### API Simulation

**Latency Simulation**:
```typescript
// app/api/checkout/complete/route.ts
export async function POST(request: Request) {
  await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5s delay
  return NextResponse.json({ success: true });
}
```

**Purpose**: Demonstrate loading states and user feedback during async operations.

---

## 🧪 Testing & Validation

### Manual Testing Checklist

#### Validation Tests
- [ ] Email: Test invalid formats (no @, no domain, etc.)
- [ ] Email: Test valid format shows checkmark
- [ ] Password: Test < 8 characters shows error
- [ ] Password: Test ≥ 8 characters shows checkmark
- [ ] Card: Test non-numeric input is rejected
- [ ] Card: Test 16-digit format is accepted
- [ ] Expiration: Test MM/YY validation
- [ ] CVC: Test 3-digit validation

#### Navigation Tests
- [ ] Cannot proceed to Step 2 without completing Step 1
- [ ] Browser back button returns to previous step
- [ ] Browser forward button advances after completion
- [ ] URL parameter `/checkout?step=shipping` works
- [ ] Routing guard prevents skipping steps

#### State Persistence Tests
- [ ] Step 1 → Step 2 → Step 1: Data persists
- [ ] Step 2 → Step 3 → Step 2: Data persists
- [ ] Order summary updates with quantity changes
- [ ] Order summary shows correct totals

#### i18n Tests
- [ ] Language toggle updates all labels
- [ ] Currency format changes (£ → KSh)
- [ ] Step indicator translates
- [ ] Form labels translate
- [ ] Error messages translate

#### UI Fidelity Tests
- [ ] Input backgrounds match (#E2E8F0)
- [ ] Checkmarks are black circles
- [ ] Step labels stay blue when completed
- [ ] Buttons align right
- [ ] Quantity buttons are soft squares
- [ ] Free shipping text is teal (#38B2AC)

#### Responsive Tests
- [ ] Desktop: Two-column layout
- [ ] Mobile: Stacked layout
- [ ] Sidebar is sticky on desktop
- [ ] All interactive elements are tappable

### Production Build Test

```bash
# Build for production
pnpm build

# Expected output:
# ✓ Compiled successfully
# ✓ Generating static pages
# Route (app)                  Size     First Load JS
# ┌ ○ /                        ...      ...
# ├ ƒ /checkout                ...      ...
# Exit code: 0
```

**Vercel Deployment Test**:
```bash
vercel --prod
```

Should deploy without errors.

---

## 🚀 Deployment Guide

### Vercel Deployment

**Step 1: Connect Repository**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import Git repository
4. Select this repository

**Step 2: Configure Build**
- **Framework Preset**: Next.js
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`
- **Node Version**: 20.x

**Step 3: Deploy**
- Click "Deploy"
- Wait for build (2-3 minutes)
- Visit deployment URL

### Environment Variables

**None required** for this demo application.

For production with real backend:
```
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Performance Optimizations

**Already Implemented**:
- Static generation where possible
- Image optimization (Next.js default)
- CSS purging (Tailwind production)
- Tree shaking (Next.js webpack)

**Monitoring**:
- Check Vercel Analytics for Core Web Vitals
- Lighthouse score should be 90+ for Performance

---

## ⚠️ Known Limitations

### 1. No Real Backend
- API routes are simulations with setTimeout
- No database persistence
- Order data is lost on page refresh

**Solution for Production**: Connect to real API endpoints.

### 2. No Authentication
- Account creation is simulated
- No JWT or session management
- No secure password hashing

**Solution for Production**: Implement NextAuth.js or similar.

### 3. No Payment Processing
- Card validation is client-side only
- No Stripe/PayPal integration
- No PCI compliance

**Solution for Production**: Integrate payment gateway with server-side processing.

### 4. Limited Error Handling
- Network errors not handled
- No retry logic
- No offline support

**Solution for Production**: Add error boundaries and retry mechanisms.

### 5. No Analytics
- No tracking of user behavior
- No conversion funnel analysis

**Solution for Production**: Add Google Analytics or Mixpanel.

---

## 🔮 Future Enhancements

### Short Term
1. **Form Autofill**: Support browser autofill for addresses
2. **Saved Addresses**: Implement actual saved address selection
3. **Guest Checkout**: Allow checkout without account
4. **Progress Save**: Save progress to localStorage

### Medium Term
1. **Email Verification**: Send verification emails
2. **Order Confirmation**: Email receipt after checkout
3. **Order History**: View past orders
4. **Address Validation**: Integrate with address verification API

### Long Term
1. **Multi-currency**: Support more currencies beyond £/KSh
2. **Tax Calculation**: Real-time tax based on location
3. **Shipping Estimates**: API integration for shipping costs
4. **Payment Options**: Support multiple payment methods
5. **Discount Codes**: Functional promo code system

---

## 📊 Metrics & KPIs

### Performance Targets
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 200KB initial load

### User Experience Targets
- **Form Completion Rate**: > 80%
- **Validation Error Rate**: < 5% on valid input
- **Mobile Usability**: 100/100 Google score

---

## 🤝 Development Guidelines

### Code Style
- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write descriptive component names

### Component Patterns
```typescript
// Prefer named exports
export const MyComponent: React.FC<Props> = ({ prop }) => { ... };

// Use controlled components
const [value, setValue] = useState("");

// Destructure props
const { email, password } = accountData;

// Type function props
interface Props {
  onSubmit: (data: FormData) => void;
}
```

### Git Workflow
```bash
# Feature branch
git checkout -b feature/add-guest-checkout

# Commit with descriptive message
git commit -m "feat: add guest checkout option to account step"

# Push and create PR
git push origin feature/add-guest-checkout
```
