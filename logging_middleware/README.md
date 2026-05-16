# Logging Middleware

This is a standalone logging module designed to be used by the frontend application to push logs to the centralized evaluating service.

## Setup
1. The logging API requires a valid Bearer Token.
2. In `logger.js`, replace the placeholder `TOKEN` with the actual token provided.
3. In a future iteration, this token should be loaded securely from `.env` (e.g., `process.env.VITE_LOGGING_API_TOKEN`).

## Usage
Import the `Log` function and the required constants into your file:

```javascript
import { Log } from '../logging_middleware/logger';

// Example: Logging a page load
Log('frontend', 'info', 'page', 'Dashboard page loaded');
```
