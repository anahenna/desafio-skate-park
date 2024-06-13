document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = document.getElementById('registerForm');
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
    const password2 = formData.get('password2');

    let errors = [];

    if (!email) errors.push('El email es requerido.');
    if (!password) errors.push('La contraseña es requerida.');
    if (!password2) errors.push('Debe repetir la contraseña.');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) {
        errors.push('El formato del email es incorrecto.');
    }

    if (password && password.length < 8) {
        errors.push('La contraseña debe tener al menos 8 caracteres.');
    }

    if (password !== password2) {
        errors.push('Las contraseñas no coinciden.');
    }

    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    try {
        const response = await axios.post('/api/v1/admins/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        alert("Admin creado, redirigiendo al login...");
        window.location.href = "/admin/login";
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
});
