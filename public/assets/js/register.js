
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = document.getElementById('registerForm');
    const formData = new FormData(form);

    try {
        const response = await axios.post('/api/v1/users/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        });
        alert("Usuario creado, redirigiendo al login...")
        window.location.href = "/login"
    } catch (error) {
        console.log(error)
        alert(error.response.data.msg)
    }
});


