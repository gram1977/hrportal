# HR Portal - AI Coding Agent Instructions

## Project Overview
This is an HR Portal application built with **Create React App (CRA)** using **React 19.2.0**. The project follows standard CRA conventions and is in early development with baseline scaffolding.

## Architecture & Structure

### Core Entry Points
- `src/index.js` - Application entry point using `ReactDOM.createRoot()` with StrictMode enabled
- `src/App.js` - Root component (currently default CRA template)
- `public/index.html` - Single HTML template with `<div id="root">` mount point

### Key Dependencies
- **React 19.2.0** - Latest React version with new features
- **react-scripts 5.0.1** - CRA build tooling (Webpack, Babel, ESLint)
- **@testing-library/react 16.3.0** - Testing utilities compatible with React 19
- **web-vitals** - Performance monitoring enabled via `reportWebVitals()`

## Development Workflows

### Essential Commands
```bash
npm start        # Development server on http://localhost:3000 with hot reload
npm test         # Interactive test runner (Jest) in watch mode
npm run build    # Production build to ./build folder
```

### Testing Approach
- Tests use React Testing Library with `@testing-library/jest-dom` matchers
- Test files follow `.test.js` naming convention (see `App.test.js`)
- Tests render components and query using accessible queries (`getByText`, `getByRole`, etc.)
- Configured in `setupTests.js` which imports Jest DOM matchers globally

### Build Configuration
- Uses CRA's zero-config approach - no exposed Webpack/Babel configs
- ESLint extends `react-app` and `react-app/jest` presets
- Browserslist targets modern browsers in development, broader support in production
- Assets in `public/` are copied as-is; use `%PUBLIC_URL%` for references in HTML

## Coding Conventions

### Component Patterns
- Functional components with hooks (no class components observed)
- Default exports for components (`export default App`)
- Components import their own CSS (`import './App.css'`)
- **Keep it simple**: Use basic React patterns without complex abstractions

### Styling
- **Plain CSS only** - no CSS-in-JS or preprocessors
- CSS files co-located with components (`App.css` with `App.js`)
- Global styles in `index.css`
- Uses CSS custom properties and modern CSS features (flexbox, animations)
- Standard HTML elements with semantic markup

### State & Logic
- **Simple JavaScript only** - no TypeScript, no complex libraries
- Use built-in React hooks: `useState`, `useEffect`, `useContext`
- Keep logic straightforward and readable
- Avoid over-engineering - prefer simple solutions

### File Organization
- All source code in `src/`
- Static assets in `public/`
- Component/test/style triads at same directory level (e.g., `App.js`, `App.test.js`, `App.css`)

## Project-Specific Notes

### HR Portal Context
- **Core Features**: Employee data management, leave requests, onboarding workflows, attendance regularization
- **No backend integration** - This is a frontend-only application with local/mock data
- **Authentication**: User authentication required (implementation pending)
- Currently at scaffolding stage with default CRA template
- No custom routing, state management, or API integration yet

### Planned Feature Modules
1. **Employee Management**: CRUD operations for employee profiles, personal info, job details
2. **Leave Management**: Request submission, approval workflows, leave balance tracking
3. **Onboarding**: Document collection, task checklists, new hire workflows
4. **Attendance Regularization**: Correction requests, approval processes, attendance history

### Performance Monitoring
- `reportWebVitals()` integrated but not actively logging by default
- To enable: pass callback function to `reportWebVitals(console.log)` in `index.js`

### PWA Support
- Manifest configured in `public/manifest.json`
- Service worker not registered (PWA features not enabled)

## When Implementing Features

1. **New Components**: Create in `src/components/` (directory doesn't exist yet - create as needed)
   - Suggested structure: `src/components/employees/`, `src/components/leave/`, `src/components/onboarding/`, `src/components/attendance/`, `src/components/auth/`
2. **Routing**: Install `react-router-dom` when adding multi-page navigation
   - Consider routes: `/login`, `/employees`, `/leave`, `/onboarding`, `/attendance`
   - Implement protected routes for authenticated pages
3. **State Management**: Use React hooks (`useState`, `useReducer`, `useContext`) for state management
   - Create custom hooks for reusable logic: `useAuth`, `useEmployees`, `useLeaveRequests`, etc.
   - Keep state management simple and local to components when possible
4. **Authentication**: Implement simple mock authentication with localStorage
   - Store auth tokens/user data in localStorage
   - Create `src/hooks/useAuth.js` for authentication logic
   - Mock user roles (employee, manager, admin) for role-based access
5. **Data Storage**: Use localStorage for persisting mock data (no backend APIs)
   - Create `src/data/` for mock data files: `employees.js`, `leaveRequests.js`, `users.js`, etc.
6. **Forms**: Use controlled components with `useState` - no form libraries needed
   - Handle form state with simple React hooks
   - Use standard HTML form elements (`<input>`, `<select>`, `<textarea>`)
7. **Styling**: Continue with plain CSS - maintain CSS files co-located with components

## Important: React 19 Considerations
This project uses React 19.2.0 - be aware of:
- New React compiler features (automatic memoization)
- Updated `use` hook for async operations
- Changes to ref handling and StrictMode behavior
- Ensure any third-party libraries are React 19 compatible
