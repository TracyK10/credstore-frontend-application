# 🛒 BNPL Checkout Flow

A high-fidelity, 3-step Buy Now Pay Later checkout experience built with **Next.js 14**, **TypeScript**, and **Tailwind CSS** using vanilla React patterns (no external state or validation libraries).

![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4+-38bdf8)

## ✨ Features

- 🎯 **3-Step Flow**: Account → Shipping → Payment
- ✅ **Real-time Validation**: Manual validation with regex patterns and logic
- 💾 **State Persistence**: React Context API for cross-step data retention
- 🌍 **Bilingual**: English and Swahili with custom i18n hook
- 🎨 **Pixel-Perfect UI**: Matches Figma designs using Tailwind CSS
- 📱 **Responsive**: Two-column desktop layout, mobile stack
- 🔄 **Loading States**: 600ms API latency simulation
- 🚀 **Type-Safe**: Full TypeScript strict mode

## 🏗️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (Strict mode) |
| Styling | Tailwind CSS |
| State Management | React Context API |
| Forms | Controlled components (`useState`) |
| Validation | Manual utilities (regex, length checks) |
| i18n | Custom `useTranslation` hook |

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000/checkout
```

## 📂 Project Structure

```
app/
├── api/checkout/          # API Route Handlers (600ms latency)
├── checkout/              # Main checkout page
└── layout.tsx             # Root layout with CheckoutProvider

components/
├── checkout/
│   ├── OrderSummary.tsx   # Sidebar with product details
│   ├── StepIndicator.tsx  # Progress indicator
│   └── steps/             # Step 1, 2, 3 components
├── layout/
│   ├── Header.tsx         # Navigation
│   └── CheckoutLayout.tsx # Two-column layout
└── ui/
    ├── ValidatedInput.tsx # Input with checkmark
    ├── Select.tsx         # Dropdown
    └── Button.tsx         # Primary/secondary

context/
└── CheckoutContext.tsx    # React Context for state

hooks/
└── useTranslation.ts      # Custom i18n hook

lib/
└── validation.ts          # Manual validation utilities

locales/
└── translations.json      # EN/SW dictionary

types/
└── checkout.ts            # TypeScript interfaces
```

## 🎮 How to Use

### Step 1: Account
1. Enter email and password
2. Watch for checkmarks on valid inputs
3. Click "Shipping details"

### Step 2: Shipping
1. Fill in address fields
2. Select shipping method
3. Click "Payment"

### Step 3: Payment
1. Enter card details (numeric only)
2. Click "Complete order"
3. See loading state and confirmation

### Test State Persistence
- Fill Step 1 → Go to Step 2 → Return to Step 1
- **Your data persists** via `CheckoutContext`

## 🔧 Key Implementation Details

### React Context API for State Management

```typescript
// context/CheckoutContext.tsx
const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }) => {
  const [state, setState] = useState<CheckoutState>(initialState);
  // CRUD operations
};

export const useCheckout = () => useContext(CheckoutContext);
```

### Manual Validation

```typescript
// lib/validation.ts
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return { isValid: emailRegex.test(email), errorMessage: "..." };
};
```

### Custom i18n Hook

```typescript
// hooks/useTranslation.ts
export const useTranslation = () => {
  const [locale, setLocale] = useState<"en" | "sw">("en");
  const t = (key: string) => translations[locale][key];
  const formatCurrency = (amount: number) => 
    locale === "en" ? `£${amount}` : `KSh ${amount}`;
  return { t, locale, setLocale, formatCurrency };
};
```

### Step Component Pattern

```typescript
// components/checkout/steps/AccountStep.tsx
export const AccountStep = () => {
  const { accountData, updateAccountData, setCurrentStep } = useCheckout();
  
  const [email, setEmail] = useState(accountData.email); // Local state
  const [emailValid, setEmailValid] = useState(false);   // Validation state
  
  useEffect(() => {
    // Real-time validation
    const result = validateEmail(email);
    setEmailValid(result.isValid);
  }, [email]);
  
  const handleNext = () => {
    updateAccountData({ email }); // Persist to context
    setCurrentStep(2);             // Navigate
  };
  
  return <ValidatedInput value={email} onChange={setEmail} isValid={emailValid} />;
};
```

## 🌍 Internationalization

Switch between English and Swahili:

```typescript
const { t, setLocale } = useTranslation();

setLocale("sw"); // Swahili
// All labels update automatically
// Currency changes: £ → KSh
```

## 🎨 Design System

**Colors**:
- Primary: `#3B82F6`
- Input BG: `#F3F4F6`
- Border: `#E5E7EB`
- Success: `#10B981`

**Typography**: Inter font

**Components**: All styled with Tailwind CSS utilities

## 📡 API Endpoints

All endpoints simulate 600ms latency:

- `GET /api/checkout/summary` - Order summary
- `POST /api/checkout/account` - Validate credentials
- `POST /api/checkout/shipping` - Save address
- `POST /api/checkout/payment` - Validate card
- `POST /api/checkout/complete` - Finalize order

## ✅ What Makes This Implementation Special

### 1. **No External Libraries for State/Validation**
- Uses React Context API instead of Zustand
- Manual validation instead of React Hook Form + Zod
- Demonstrates deep React knowledge

### 2. **Full TypeScript Strict Mode**
- No `any` types
- Complete interface definitions
- Type-safe throughout

### 3. **Production-Ready Patterns**
- Modular component architecture
- Separation of concerns
- Scalable structure

### 4. **Educational Value**
- Shows how to build complex forms without libraries
- Demonstrates state management from scratch
- Custom i18n implementation

## 🧪 Testing Checklist

- ✅ Email validation (regex)
- ✅ Password validation (min 8 chars)
- ✅ Card number validation (numeric only)
- ✅ Expiration date validation (MM/YY)
- ✅ Success checkmarks on valid inputs
- ✅ Loading spinner on submit
- ✅ State persists when navigating between steps
- ✅ Responsive layout (desktop/mobile)
- ✅ API calls with 600ms delay
- ✅ Two-column layout with sticky sidebar

## 📚 Additional Resources

- **Walkthrough**: See `brain/walkthrough.md` for detailed implementation guide
- **Implementation Plan**: See `brain/implementation_plan.md` for architecture
- **UI Designs**: See `/UI/` directory for Figma references

## 🎓 Learning Outcomes

This project demonstrates:
- React Context API for state management
- Controlled components with `useState`
- Manual form validation
- TypeScript strict typing
- Next.js 14 App Router
- Responsive design with Tailwind
- Custom hooks (`useTranslation`)
- API integration with loading states

## 🤝 Contributing

This is a demonstration project showing vanilla React patterns for a BNPL checkout flow.

## 📄 License

MIT

---

**Built with ❤️ using vanilla React patterns**  
No Zustand • No React Hook Form • No Zod
