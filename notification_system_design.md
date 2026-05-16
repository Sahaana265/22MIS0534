# Notification System Design & Approach

Hey! Here is a breakdown of how I approached building the frontend for the Affordmed Campus Hiring Evaluation. I split my focus into making the priority logic robust (Stage 1) and ensuring the React dashboard felt like a premium SaaS product (Stage 2). 

## 1. Stage 1: Priority Logic

I needed a straightforward way to rank the notifications as they come in. I decided to assign a simple numerical weight to each type:
- **Placement**: 3 (Highest priority)
- **Result**: 2 
- **Event**: 1 (Lowest priority)

The sorting logic is pretty simple: first, we compare the weights. If two notifications have the same weight (like two Placement notifications), we tie-break by looking at the timestamp, ensuring the newest one always floats to the top.

### Scalability Thoughts
Right now, we are just using standard array sorting on the batches of data we fetch. But if this were a massive, real-time system with thousands of notifications pouring in, sorting the whole array every single time would be too slow ($O(M \log M)$). 

If we needed to scale this, I would absolutely implement a **Min-Heap (Priority Queue)**. To keep a running list of the "Top 10", we'd just maintain a Min-Heap of size 10. When a new notification arrives, we compare it to the root of the heap (the lowest priority item currently in our top 10). If the new one is more important, we pop the root and push the new one. This reduces the insertion time to just $O(\log 10)$, which is incredibly fast and efficient for continuous data streams.

## 2. Stage 2: React Dashboard

### Architecture & Folder Structure
I built the app as a Single Page Application using React and Vite. I stuck strictly to Material UI for all the components and styling, avoiding Tailwind or custom CSS files to keep the bundle clean.

Here's how I organized the `src/` folder:
- `components/`: Reusable stuff like the NotificationCard and FilterBar.
- `hooks/`: Extracted the data fetching logic into a `useNotifications` hook so I didn't have to rewrite `useEffect` fetches on every page.
- `layouts/`: The `MainLayout` handles the sidebar and top navbar wrapper.
- `pages/`: The actual views (Dashboard, AllNotifications, PriorityInbox).
- `services/`: Axios clients for the API.
- `theme/`: All the Material UI design tokens and overrides.
- `utils/`: Where the priority sorting logic lives.

### Handling Responsiveness
It was super important that this worked well on mobile. I used MUI's `Grid` and `Stack`. On desktop, the sidebar is pinned to the left, but on mobile/tablet, it automatically hides into a hamburger menu drawer to save space.

### Error Handling & Fallbacks
Since the app relies on fetching from the evaluation service (`http://4.224.186.213/...`), I knew there was a chance the token could expire or the network could fail during testing. To handle this gracefully, I set up a mock data fallback in `api.js`. If the Axios request fails, the app catches the error, simulates a slight network delay, and loads a hardcoded list of notifications instead. This ensures the UI never breaks and can always be evaluated!

## 3. Logging Middleware
For the middleware requirement, I created a standalone `logging_middleware` folder. It has a `logger.js` file that exports an async `Log` function. Throughout the React app, whenever a component mounts, an API call is made, or a filter is clicked, we fire off `Log(stack, level, package, message)`. 

If the logging API goes down, the middleware just catches the error and logs a quiet warning to `console.error` without spamming the user or breaking the app.

## 4. Final Thoughts & Tradeoffs
I prioritized making the UI look as clean and recruiter-friendly as possible using soft backgrounds, glassmorphism on the header, and smooth hover shadows. 
If I had more time or if this was going to production, I'd probably swap the standard React Context/Hooks state management for Redux Toolkit, and look into setting up WebSockets so notifications push to the client in real-time instead of needing a refresh. But for the scope of this evaluation, I think this setup hits the sweet spot between clean architecture and solid user experience.
