export const useAuth = () => {
  const authToken = useState('authToken', () => null); // Store token in memory
  const authUser = useState('authUser', () => null); // Store user info

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        authToken.value = data.token; // Store token in memory
        authUser.value = data.user; // Store user info
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    authToken.value = null; // Clear token from memory
    authUser.value = null;
  };

  // Check SSO on Page Load
  const checkSSO = async () => {
    try {
      
     
      const wpResponse = await fetch('http://localhost/crmlabs/wp-json/custom-sso/v1/check', {
      credentials: 'include', // Ensures cookies are sent
    });
     
        const wpUser = await wpResponse.json();
          
        if (!wpUser?.logged_in) {
           throw new Error("sso not found");
      }
      const ssotoken = wpUser.ssotoken;
      const response = await fetch('/api/users/checksso',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ssotoken  }),
      });

      const data = await response.json();
      if (!data.logged_in) {
        throw new Error("sso not found");
      }
      if (data.token) {
        authToken.value = data.token;
        authUser.value = data.user;
      }
    } catch (error) {
      console.error('SSO Check failed:', error);
      logout(); // Clear session if SSO fails
    }
  };

  return { authToken, authUser, login, logout, checkSSO };
};
