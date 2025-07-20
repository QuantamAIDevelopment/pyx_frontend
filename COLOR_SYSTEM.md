# PyX Color System

This document explains the centralized color system for the PyX project, which eliminates the need to define colors in every component.

## Overview

The color system consists of:
1. **CSS Custom Properties** in `src/components/styles/globals.css`
2. **Tailwind Configuration** in `tailwind.config.js`
3. **TypeScript Utilities** in `src/utils/colors.ts`

## Usage

### 1. Using Predefined Button Classes

Instead of writing long className strings, use the predefined button classes:

```tsx
import { BUTTON_CLASSES } from '../utils/colors';

// Before
<button className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all">
  Submit
</button>

// After
<button className={`w-full md:w-[160px] h-[42px] ${BUTTON_CLASSES.PRIMARY}`}>
  Submit
</button>
```

### 2. Using Predefined Card Classes

```tsx
import { CARD_CLASSES } from '../utils/colors';

// Before
<div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
  Content
</div>

// After
<div className={`${CARD_CLASSES.DEFAULT} mb-8`}>
  Content
</div>
```

### 3. Using Color Constants

```tsx
import { COLORS, getColorClass } from '../utils/colors';

// Using color constants
const primaryColor = COLORS.BRAND_PRIMARY; // '#FF620A'

// Using utility functions
const bgClass = getColorClass('BRAND_PRIMARY', 'bg'); // 'bg-[#FF620A]'
const textClass = getColorClass('BRAND_PRIMARY', 'text'); // 'text-[#FF620A]'
```

### 4. Using Tailwind Classes

```tsx
import { TAILWIND_CLASSES } from '../utils/colors';

// Brand colors
<div className={TAILWIND_CLASSES.BRAND_PRIMARY}>Primary Background</div>
<div className={TAILWIND_CLASSES.TEXT_BRAND_PRIMARY}>Primary Text</div>

// UI colors
<div className={TAILWIND_CLASSES.SUCCESS}>Success</div>
<div className={TAILWIND_CLASSES.ERROR}>Error</div>
```

## Available Colors

### Brand Colors
- `BRAND_PRIMARY`: #FF620A (Main orange)
- `BRAND_SECONDARY`: #993B06 (Dark orange)
- `BRAND_ACCENT`: #D94B05 (Medium orange)

### UI Colors
- `SUCCESS`: #10b981 (Green)
- `WARNING`: #f59e0b (Yellow)
- `ERROR`: #ef4444 (Red)
- `INFO`: #3b82f6 (Blue)
- `PURPLE`: #8b5cf6 (Purple)
- `CYAN`: #06b6d4 (Cyan)
- `LIME`: #84cc16 (Lime)
- `ORANGE`: #f97316 (Orange)

### Status Colors
- `ACTIVE`: #10b981 (Green)
- `PENDING`: #f59e0b (Yellow)
- `INACTIVE`: #6b7280 (Gray)
- `STATUS_ERROR`: #ef4444 (Red)

### Text Colors
- `TEXT_PRIMARY`: #1a1a2e (Dark)
- `TEXT_SECONDARY`: #6b7280 (Medium)
- `TEXT_MUTED`: #9ca3af (Light)
- `TEXT_WHITE`: #ffffff (White)

### Background Colors
- `BG_PRIMARY`: #ffffff (White)
- `BG_SECONDARY`: #f9fafb (Light gray)
- `BG_MUTED`: #f1f2f4 (Muted gray)
- `BG_CARD`: #ffffff (White)
- `BG_OVERLAY`: rgba(0, 0, 0, 0.5) (Overlay)

## Available Button Classes

- `BUTTON_CLASSES.PRIMARY`: Brand primary button
- `BUTTON_CLASSES.SECONDARY`: Secondary button
- `BUTTON_CLASSES.SUCCESS`: Success button
- `BUTTON_CLASSES.WARNING`: Warning button
- `BUTTON_CLASSES.ERROR`: Error button
- `BUTTON_CLASSES.GRADIENT`: Gradient button

## Available Card Classes

- `CARD_CLASSES.DEFAULT`: Default card styling
- `CARD_CLASSES.HOVER`: Card with hover effects
- `CARD_CLASSES.MUTED`: Muted card styling

## Migration Guide

### Step 1: Replace Hardcoded Colors

Find all instances of hardcoded colors like `bg-[#FF620A]` and replace them:

```tsx
// Before
className="bg-[#FF620A] text-white"

// After
className={`${TAILWIND_CLASSES.BRAND_PRIMARY} ${TAILWIND_CLASSES.TEXT_WHITE}`}
```

### Step 2: Replace Button Classes

```tsx
// Before
className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"

// After
className={`w-full md:w-[160px] h-[42px] ${BUTTON_CLASSES.PRIMARY}`}
```

### Step 3: Replace Card Classes

```tsx
// Before
className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8"

// After
className={`${CARD_CLASSES.DEFAULT} mb-8`}
```

## Benefits

1. **Consistency**: All colors are defined in one place
2. **Maintainability**: Change colors globally by updating CSS variables
3. **Type Safety**: TypeScript ensures correct color usage
4. **Performance**: Reduced bundle size by eliminating duplicate color definitions
5. **Developer Experience**: IntelliSense support for color names

## Best Practices

1. **Always use the color system** instead of hardcoded values
2. **Import only what you need** to keep bundle size small
3. **Use semantic color names** (e.g., `SUCCESS` instead of `GREEN`)
4. **Combine with existing Tailwind classes** for flexibility
5. **Test color changes** across different components

## Examples

### Complete Button Example
```tsx
import { BUTTON_CLASSES } from '../utils/colors';

function SubmitButton({ loading, children }) {
  return (
    <button 
      className={`w-full md:w-[160px] h-[42px] ${BUTTON_CLASSES.PRIMARY}`}
      disabled={loading}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
```

### Complete Card Example
```tsx
import { CARD_CLASSES } from '../utils/colors';

function ResultCard({ title, content }) {
  return (
    <div className={`${CARD_CLASSES.DEFAULT} mb-8`}>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p>{content}</p>
    </div>
  );
}
```

### Status Indicator Example
```tsx
import { TAILWIND_CLASSES } from '../utils/colors';

function StatusBadge({ status }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'active': return TAILWIND_CLASSES.ACTIVE;
      case 'pending': return TAILWIND_CLASSES.PENDING;
      case 'error': return TAILWIND_CLASSES.STATUS_ERROR;
      default: return TAILWIND_CLASSES.INACTIVE;
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-white ${getStatusClass(status)}`}>
      {status}
    </span>
  );
}
``` 