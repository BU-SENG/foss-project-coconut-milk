const STORAGE_KEYS = {
  USERS: 'skill-exchange-users',
  CURRENT_USER: 'skill-exchange-current-user'
};

const defaultNotifications = {
  productUpdates: true,
  sessionReminders: true,
  marketingEmails: false,
  smsAlerts: false
};

const defaultPrivacy = {
  profileVisibility: 'community',
  showEmail: false,
  shareActivity: true
};

const dispatchEvent = (name) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(name));
};

export const getStoredUsers = () => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveUsers = (users) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  dispatchEvent('user-updated');
};

export const getCurrentUserId = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || '';
};

export const setCurrentUserId = (userId) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userId);
  dispatchEvent('user-login');
};

export const clearCurrentUserId = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  dispatchEvent('user-logout');
};

export const getCurrentUser = () => {
  const userId = getCurrentUserId();
  if (!userId) return null;
  const users = getStoredUsers();
  return users.find((user) => user.id === userId) || null;
};

export const upsertUser = (updatedUser) => {
  const users = getStoredUsers();
  const index = users.findIndex((user) => user.id === updatedUser.id);

  if (index === -1) {
    users.push(addDefaultPreferences(updatedUser));
  } else {
    users[index] = addDefaultPreferences({
      ...users[index],
      ...updatedUser
    });
  }

  saveUsers(users);
  return users[index === -1 ? users.length - 1 : index];
};

export const updateCurrentUser = (updater) => {
  const userId = getCurrentUserId();
  if (!userId) return null;

  const users = getStoredUsers();
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) return null;

  const currentUser = users[index];
  const nextUser =
    typeof updater === 'function'
      ? addDefaultPreferences({ ...currentUser, ...updater(currentUser) })
      : addDefaultPreferences({ ...currentUser, ...updater });

  users[index] = nextUser;
  saveUsers(users);
  return nextUser;
};

export const deleteCurrentUser = () => {
  const userId = getCurrentUserId();
  if (!userId) return false;

  const users = getStoredUsers();
  const filtered = users.filter((user) => user.id !== userId);
  saveUsers(filtered);
  clearCurrentUserId();
  dispatchEvent('user-deleted');
  return true;
};

export const addDefaultPreferences = (user) => ({
  notificationPreferences: {
    ...defaultNotifications,
    ...(user.notificationPreferences || {})
  },
  privacyPreferences: {
    ...defaultPrivacy,
    ...(user.privacyPreferences || {})
  },
  ...user
});

export const DEFAULT_NOTIFICATION_PREFS = defaultNotifications;
export const DEFAULT_PRIVACY_PREFS = defaultPrivacy;
export { STORAGE_KEYS };

