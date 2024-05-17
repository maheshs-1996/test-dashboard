const users: any = {
  msdevadiga: {
    password: "12345678",
    name: "Mahesh",
  },
  santhoshkumar: {
    password: "12345678",
    name: "Santhosh",
  },
  gomat: {
    password: "12345678",
    name: "Gowtham",
  },
  arunkumar: {
    password: "12345678",
    name: "Arun",
  },
};

const getUser = (username: string) => {
  if (users.hasOwnProperty(username)) {
    return {
      ...users[username],
      username,
    };
  }
  return null;
};

export const hasUser = (username: string) => {
  return users.hasOwnProperty(username);
};

export const addUser = (username: string, data: Record<string, string>) => {
  users[username] = data;
};

export const validateUser = (username: string, password: string) => {
  const user = getUser(username);
  if (!user) {
    return {
      found: false,
      errorType: "NOT_FOUND",
      message: "User not found",
    };
  }

  if (user.password === password) {
    return {
      found: true,
      message: "Logged In",
      user,
    };
  }

  return {
    found: false,
    errorType: "PASSWORD_MISMATCH",
    message: "Invalid password",
  };
};
