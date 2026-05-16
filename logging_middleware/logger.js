import axios from 'axios';
import { LOGGING_API_URL } from './constants.js';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYWhhYW5hLnZhMjAyMkB2aXRzdHVkZW50LmFjLmluIiwiZXhwIjoxNzc4OTI5NjA3LCJpYXQiOjE3Nzg5Mjg3MDcsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIzZTQyYzg5MS00OGZmLTQ0NDktYWYxZS1kMWEwMDE5Y2UxYWYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzYWhhYW5hIHYgYSIsInN1YiI6IjdkZDc1MzYwLTA3ZmMtNDk3Mi1iNDYxLWY2YTFjMThhYTQ5ZCJ9LCJlbWFpbCI6InNhaGFhbmEudmEyMDIyQHZpdHN0dWRlbnQuYWMuaW4iLCJuYW1lIjoic2FoYWFuYSB2IGEiLCJyb2xsTm8iOiIyMm1pczA1MzQiLCJhY2Nlc3NDb2RlIjoiU2ZGdVdnIiwiY2xpZW50SUQiOiI3ZGQ3NTM2MC0wN2ZjLTQ5NzItYjQ2MS1mNmExYzE4YWE0OWQiLCJjbGllbnRTZWNyZXQiOiJCRFFnYU5XQWdyZFFjc0t4In0.BZg2Zh5MNQukkSyeQ_rkj6vdsTxQVEVd8NlwH-H2cvU';

export const Log = async (stack, level, packageName, message) => {
  try {
    await axios.post(
      LOGGING_API_URL,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        timeout: 5000,
      }
    );
  } catch (error) {
    console.error('Logging Middleware Error: Failed to send log', error.message);
  }
};
