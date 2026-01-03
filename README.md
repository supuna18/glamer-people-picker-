# People Picker Component - Glamer Media Task

A React-based People Picker component featuring a debounced search, keyboard navigation, and a professional Dark & Gold UI theme. Built with Vite, React, Tailwind CSS, and Framer Motion.

## 🚀 How to Run

1.  **Clone/Unzip the repository**
2.  Open a terminal in the project folder.
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

## 🛠 Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS (v3) - _Chosen for stability and configuration control._
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Utils:** clsx, tailwind-merge

## ⚖️ Trade-offs & Decisions

- **Tailwind CSS v3 vs v4:** I opted for Tailwind v3 (Stable) instead of v4 (Alpha/Beta) to ensure a reliable configuration setup and avoid tooling issues during the timed assessment.
- **Mock Data:** As requested, data is generated locally (`MOCK_DATA`) to simulate an API response without external dependencies.
- **State Management:** Local state (`useState`, `useReducer` logic) was sufficient for this scope. For a larger app, I would move the search logic to a custom hook or global store (Zustand/Context).

## 🔮 Future Improvements (What I'd do next)

1.  **Testing:**
    - Add **Unit Tests** (Vitest/Jest) for the `useDebounce` hook and list filtering logic.
    - Add **Integration Tests** (React Testing Library) to verify keyboard navigation (Arrow Up/Down/Enter) and selection removal.
2.  **Performance for 10k+ Users:**
    - Implement **Virtualization** (e.g., `react-window`) to render large lists efficiently.
    - Move search logic to a **Web Worker** or backend to prevent blocking the main thread.
3.  **UX Enhancements:**
    - Highlight the matching substring in the search results (e.g., searching "Ali" highlights "**Ali**ce").
    - Add "Select All" functionality for filtered results.

## 📚 Resources Used

- **React Documentation:** For hook best practices (`useEffect`, `useRef`).
- **Tailwind CSS Docs:** For color palette and utility classes.
- **Framer Motion Docs:** For `AnimatePresence` and layout animations.
- **AI Assistant:** Used for generating the initial boilerplate for the Tailwind config and troubleshooting a TypeScript import error in the JSX environment.

---

**Candidate:** [Supun Anjana]
**Role:** Frontend Developer
