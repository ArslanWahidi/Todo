import axios from 'axios';
import { Toast } from 'flowbite-react';

// Create an Axios instance
const AccessTokenAPI = axios.create();

// Add an interceptor to handle token expiration
AccessTokenAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the response status is 401 (Unauthorized)
    if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
      // Refresh the access token using your preferred method
      
      try{
            await axios.post('/token/customize_refresh/', {
            refresh: 'undefined',
            }, {
              headers: {
                  'Content-Type': 'application/json',
              }
            })
            
            // Retry the original request with the new access token
            return AccessTokenAPI(originalRequest);
      }catch(error){
          // Handle the token refresh error, e.g., log out the user
          console.error('Failed to refresh access token:', error);
          if(error.response.status === 401){
            window.location = '/login_page/';
          }
          
          if(error.response.status === 400){
            console.log('You have to login in order to enable functinality. in AccessTokenAPI');
            <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                <HiX className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">You have to login!</div>
              <Toast.Toggle />
            </Toast>
          }
          // Log out the user or redirect to the login page
      }
      
    }
    
    return Promise.reject(error);
}
);

export default AccessTokenAPI;