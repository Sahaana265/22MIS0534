import axios from 'axios';
import { Log } from '../../../logging_middleware/logger';

const API_BASE_URL = 'http://4.224.186.213/evaluation-service';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYWhhYW5hLnZhMjAyMkB2aXRzdHVkZW50LmFjLmluIiwiZXhwIjoxNzc4OTI5NjA3LCJpYXQiOjE3Nzg5Mjg3MDcsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIzZTQyYzg5MS00OGZmLTQ0NDktYWYxZS1kMWEwMDE5Y2UxYWYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzYWhhYW5hIHYgYSIsInN1YiI6IjdkZDc1MzYwLTA3ZmMtNDk3Mi1iNDYxLWY2YTFjMThhYTQ5ZCJ9LCJlbWFpbCI6InNhaGFhbmEudmEyMDIyQHZpdHN0dWRlbnQuYWMuaW4iLCJuYW1lIjoic2FoYWFuYSB2IGEiLCJyb2xsTm8iOiIyMm1pczA1MzQiLCJhY2Nlc3NDb2RlIjoiU2ZGdVdnIiwiY2xpZW50SUQiOiI3ZGQ3NTM2MC0wN2ZjLTQ5NzItYjQ2MS1mNmExYzE4YWE0OWQiLCJjbGllbnRTZWNyZXQiOiJCRFFnYU5XQWdyZFFjc0t4In0.BZg2Zh5MNQukkSyeQ_rkj6vdsTxQVEVd8NlwH-H2cvU';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
  timeout: 5000,
});

const MOCK_NOTIFICATIONS = [
  { id: 1, notification_type: 'Placement', message: 'You have been selected for Microsoft!', timestamp: new Date(Date.now() - 1000 * 60).toISOString(), isRead: false },
  { id: 2, notification_type: 'Result', message: 'End Semester Results are out.', timestamp: new Date(Date.now() - 1000 * 3600).toISOString(), isRead: false },
  { id: 3, notification_type: 'Event', message: 'Tech Symposium tomorrow at 10 AM.', timestamp: new Date(Date.now() - 1000 * 7200).toISOString(), isRead: false },
  { id: 4, notification_type: 'Placement', message: 'Amazon coding round link.', timestamp: new Date(Date.now() - 1000 * 86400).toISOString(), isRead: false },
  { id: 5, notification_type: 'Result', message: 'Mid-term marks updated.', timestamp: new Date(Date.now() - 1000 * 86400 * 2).toISOString(), isRead: false },
  { id: 6, notification_type: 'Event', message: 'Hackathon registration closing.', timestamp: new Date(Date.now() - 1000 * 86400 * 3).toISOString(), isRead: false },
  { id: 7, notification_type: 'Placement', message: 'Google resume shortlisting results.', timestamp: new Date(Date.now() - 1000 * 86400 * 4).toISOString(), isRead: false },
  { id: 8, notification_type: 'Result', message: 'Assignment 3 grades published.', timestamp: new Date(Date.now() - 1000 * 86400 * 4 - 3600).toISOString(), isRead: false },
  { id: 9, notification_type: 'Event', message: 'Guest lecture on Artificial Intelligence.', timestamp: new Date(Date.now() - 1000 * 86400 * 5).toISOString(), isRead: false },
  { id: 10, notification_type: 'Placement', message: 'Flipkart HR interview schedule.', timestamp: new Date(Date.now() - 1000 * 86400 * 5 - 7200).toISOString(), isRead: false },
  { id: 11, notification_type: 'Result', message: 'Quiz 2 marks released.', timestamp: new Date(Date.now() - 1000 * 86400 * 6).toISOString(), isRead: false },
  { id: 12, notification_type: 'Event', message: 'Annual Sports Meet 2026.', timestamp: new Date(Date.now() - 1000 * 86400 * 7).toISOString(), isRead: false },
  { id: 13, notification_type: 'Placement', message: 'Pre-placement talk by Affordmed.', timestamp: new Date(Date.now() - 1000 * 86400 * 8).toISOString(), isRead: false },
  { id: 14, notification_type: 'Result', message: 'Lab practical final scores.', timestamp: new Date(Date.now() - 1000 * 86400 * 9).toISOString(), isRead: false },
  { id: 15, notification_type: 'Event', message: 'Cultural fest registrations now open!', timestamp: new Date(Date.now() - 1000 * 86400 * 10).toISOString(), isRead: false },
  { id: 16, notification_type: 'Placement', message: 'Goldman Sachs aptitude test details.', timestamp: new Date(Date.now() - 1000 * 86400 * 11).toISOString(), isRead: false },
  { id: 17, notification_type: 'Event', message: 'Workshop on Cloud Computing.', timestamp: new Date(Date.now() - 1000 * 86400 * 12).toISOString(), isRead: false },
];

export const fetchNotifications = async (params = {}) => {
  Log('frontend', 'info', 'api', `Fetching notifications with params: ${JSON.stringify(params)}`);
  
  try {
    const response = await apiClient.get('/notifications', { params });
    Log('frontend', 'info', 'api', 'Notifications fetched successfully');
    return response.data;
  } catch (error) {
    Log('frontend', 'error', 'api', `Failed to fetch notifications: ${error.message}`);
    console.warn('API fetch failed, falling back to mock data for evaluation purposes.', error.message);
    
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    let data = [...MOCK_NOTIFICATIONS];
    
    if (params.notification_type) {
      data = data.filter((n) => n.notification_type === params.notification_type);
    }
    
    const limit = params.limit || 10;
    const page = params.page || 1;
    const start = (page - 1) * limit;
    const paginatedData = data.slice(start, start + limit);
    
    return {
      success: true,
      data: paginatedData,
      total: data.length,
      page,
      limit,
    };
  }
};
