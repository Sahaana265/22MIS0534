import { useState, useEffect } from 'react';
import { fetchNotifications } from '../services/api';
import { getTopPriorityUnread } from '../utils/priority';

export const useNotifications = (params = {}, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchNotifications(params);
      setData(response.data);
      setTotal(response.total);
    } catch (err) {
      setError(err.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.page, params.limit, params.notification_type]);

  const refresh = () => loadData();

  return { data, loading, error, total, refresh };
};
