/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',  // Assuming your signup endpoint is /signup
      data: {
        name,  // Assuming your API expects a name for signup
        email,
        password,
        passwordConfirm  // Assuming your API expects password confirmation
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Signed up successfully!');
      window.setTimeout(() => {
        location.assign('/');  // Redirecting to home page after successful signup
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
