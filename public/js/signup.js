const signup = document.querySelector('#signup');
signup.addEventListener('submit', async el => {
  el.preventDefault();
  const email = signup.email.value;
  const name = signup.name.value;
  const password = signup.password.value;
  const passwordConfirm = signup.passwordConfirm.value;
  const url = 'http://localhost:3000/api/v1/users/signup';

  try {
    const res = await axios.post(url, {
      email,
      name,
      password,
      passwordConfirm
    });
    if (res.data.status === 'success') {
      // Redirect to a new page
      window.location.assign('/');
    } else {
      // Show error message
      alert('signup failed');
    }
  } catch (error) {
    // Handle success as above
    console.error('signup error:', error.response.data);
    alert('signup failed');
  }
});
