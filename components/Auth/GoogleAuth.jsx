import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

const GoogleAuth = () => {
  const [user, setUser] = useState(null);

  const responseGoogle = async (authResult) => {
    try {
      console.log('Google Auth Result:', authResult);

      // Fetch user details from Google API
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${authResult.access_token}`,
        },
      });

      const userInfo = await res.json();
      console.log('User Info:', userInfo);
      setUser(userInfo); // Store user info in state
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => console.error('Google Login Error:', error),
  });

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center text-center">
      <button
        onClick={googleLogin}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
      >
        Google Login
      </button>

      {user && (
        <div className="mt-6 bg-white p-4 rounded shadow w-80">
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-full w-24 h-24 mx-auto"
          />
          <h2 className="text-xl font-bold mt-4">{user.name}</h2>
          <p className="text-gray-700">{user.email}</p>
          <p className="text-gray-500">Locale: {user.locale}</p>
        </div>
      )}
    </div>
  );
};

export default GoogleAuth;
