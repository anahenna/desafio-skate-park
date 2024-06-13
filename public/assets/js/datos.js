const emailInput = document.querySelector("#input_email");
const nombreInput = document.querySelector("#input_name");
const passwordInput = document.querySelector("#input_password");
const passwordInputRepeat = document.querySelector("#input_password_repeat");
const experienciaInput = document.querySelector("#input_experience");
const especialidadInput = document.querySelector("#input_speciality");
const updateBtn = document.querySelector("#btn_update");
const deleteBtn = document.querySelector("#btn_delete");

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const securityData = await axios.get('/protected');
        if (!securityData.data.validToken) {
            window.location.href = '/login.html';
            throw { msg: 'Token no encontrado!' };
        }

        const userEmail = localStorage.getItem('userEmail');
        const { data } = await axios.get(`/api/v1/users/user/${userEmail}`);
        const user = data.user;
        console.log(user);
        emailInput.value = user.email;
        nombreInput.value = user.nombre;
        experienciaInput.value = user.anos_experiencia;
        especialidadInput.value = user.especialidad;

    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }

    updateBtn.addEventListener('click', async (e) => {
        try {
            e.preventDefault();
            const securityData = await axios.get('/protected');
            if (!securityData.data.validToken) {
                window.location.href = '/login.html';
                throw { msg: 'Token no encontrado!' };
            }

            const email = emailInput.value.trim();
            const nombre = nombreInput.value.trim();
            const password = passwordInput.value.trim();
            const passwordRepeat = passwordInputRepeat.value.trim();
            const anos_experiencia = experienciaInput.value.trim();
            const especialidad = especialidadInput.value.trim();

            // Validaciones
            if (password !== passwordRepeat) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            const { data } = await axios.put('/api/v1/users/user/update', { email, nombre, password, anos_experiencia, especialidad });
            console.log(data);
            alert("Usuario editado correctamente... redirigiendo");
            window.location.href = '/';

        } catch (error) {
            console.log(error);
            alert(error.response?.data?.msg || error.msg);
        }
    });

    deleteBtn.addEventListener('click', async (e) => {
        try {
            e.preventDefault();
            const securityData = await axios.get('/protected');
            if (!securityData.data.validToken) {
                window.location.href = '/login.html';
                throw { msg: 'Token no encontrado!' };
            }

            const userEmail = localStorage.getItem('userEmail');

            const deleteConfirm = confirm('¿Está seguro de eliminar su cuenta?');
            if (!deleteConfirm) {
                return;
            }

            await axios.delete('/api/v1/users/user/delete', { data: { email: userEmail } });
            alert("Usuario eliminado correctamente... redirigiendo");
            window.location.href = '/';

        } catch (error) {
            console.log(error);
            alert(error.response?.data?.msg || error.msg);
        }
    });

});
