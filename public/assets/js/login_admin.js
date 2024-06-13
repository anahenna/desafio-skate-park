const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        let errors = [];

        if (!email) errors.push('El email es requerido.');
        if (!password) errors.push('La contraseña es requerida.');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailPattern.test(email)) {
            errors.push('El formato del email es incorrecto.');
        }

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        const response = await axios.post('/api/v1/admins/login', { email, password });

        localStorage.setItem('userEmail', response.data.email);

        alert('Credenciales correctas... redirigiendo');
        window.location.href = "/admin/dashboard";
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
});
