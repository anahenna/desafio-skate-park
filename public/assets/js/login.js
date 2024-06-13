const loginForm = document.querySelector("#loginForm")

loginForm.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post('/api/v1/users/login', { email, password });

        localStorage.setItem('userEmail', response.data.email);

        alert('Credenciales correctas... redirigiendo');
        window.location.href = "/datos";
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
});