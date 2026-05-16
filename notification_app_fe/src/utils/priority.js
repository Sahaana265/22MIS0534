const PRIORITY_MAP = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const getPriorityWeight = (type) => {
  return PRIORITY_MAP[type] || 0;
};

export const sortNotificationsByPriority = (notifications) => {
  if (!Array.isArray(notifications)) return [];

  return [...notifications].sort((a, b) => {
    const priorityA = getPriorityWeight(a.notification_type);
    const priorityB = getPriorityWeight(b.notification_type);

    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }

    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();

    return timeB - timeA;
  });
};

export const getTopPriorityUnread = (notifications, topN = 10) => {
  if (!Array.isArray(notifications)) return [];

  const unread = notifications.filter((n) => !n.isRead);
  const sorted = sortNotificationsByPriority(unread);
  return sorted.slice(0, topN);
};
