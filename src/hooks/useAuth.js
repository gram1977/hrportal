import { useState, useEffect } from 'react';
import users from '../data/users';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // The setLoading(false) signals "I've finished checking authentication, now proceed with rendering the appropriate UI."
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      return { success: true };
    }

    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const hasRole = (role) => {
    return user && user.role === role;
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole
  };
};

export default useAuth;
