const login = document.querySelector('#login');
login.addEventListener('submit', async el => {
  el.preventDefault();
  const email = login.email.value;
  const password = login.password.value;
  const url = 'http://localhost:3000/api/v1/users/login';

  try {
    const res = await axios.post(url, {
      email,
      password
    });
    console.log(res);

    if (res.data.status === 'success') {
      // Redirect to a new page
      window.location.assign('/');
    } else {
      // Show error message
      alert('Login failed');
    }
  } catch (error) {
    // Handle success as above
    console.error('Login error:', error.response.data);
    alert('Login failed');
  }
});
