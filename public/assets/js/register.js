
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = document.getElementById('registerForm');
    const formData = new FormData(form);

    const email = formData.get('email');
    const nombre = formData.get('nombre');
    const password = formData.get('password');
    const password2 = formData.get('password2');
    const anos_experiencia = formData.get('anos_experiencia');
    const especialidad = formData.get('especialidad');

    let errors = [];

 
    if (!email) errors.push('El email es requerido.');
    if (!nombre) errors.push('El nombre es requerido.');
    if (!password) errors.push('La contraseña es requerida.');
    if (!password2) errors.push('Debe repetir la contraseña.');
    if (!anos_experiencia) errors.push('Los años de experiencia son requeridos.');
    if (!especialidad) errors.push('La especialidad es requerida.');


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


    if (anos_experiencia && isNaN(anos_experiencia)) {
        errors.push('Los años de experiencia deben ser un número.');
    }

    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    try {
        const response = await axios.post('/api/v1/users/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        alert("Usuario creado, redirigiendo al login...");
        window.location.href = "/login";
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
});
