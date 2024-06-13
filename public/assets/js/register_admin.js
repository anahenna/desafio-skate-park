
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = document.getElementById('registerForm');
    const formData = new FormData(form);

    try {
        const response = await axios.post('/api/v1/admins/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        });
        alert("Admin creado, redirigiendo al login...")
        window.location.href = "/admin/login"
    } catch (error) {
        console.log(error)
        alert(error.response.data.msg)
    }
});


