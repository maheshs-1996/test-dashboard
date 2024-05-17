const CURRENT_USER_LS_KEY = "currentUser";

export const getUserFromLS = () => {
  try {
    const currentUser = JSON.parse(
      localStorage.getItem(CURRENT_USER_LS_KEY) || ""
    );
    return currentUser;
  } catch (error) {
    return null;
  }
};

export const setUserInLS = (data = {}) => {
  localStorage.setItem(CURRENT_USER_LS_KEY, JSON.stringify(data));
};

export const deleteUserFromLS = () => {
  localStorage.removeItem(CURRENT_USER_LS_KEY);
};
