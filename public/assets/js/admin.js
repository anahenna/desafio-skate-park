document.addEventListener("DOMContentLoaded", () => {
  const listaSkatersAdmin = document.getElementById('listaSkatersAdmin');

  const getUsuarios = async () => {
    try {
      const response = await axios.get('/api/v1/users');
      console.log('Datos de usuarios:', response.data);
      const usuarios = response.data;

      listaSkatersAdmin.innerHTML = '';

      usuarios.forEach((usuario, index) => {
        const row = document.createElement('tr');

        const imagen = usuario.foto ? `<img src="${usuario.foto}" alt="Foto de ${usuario.nombre}" style="max-width: 50px; max-height: 50px;">` : '<div style="width: 50px; height: 50px; background-color: lightgray;"></div>';

        const estadoClass = usuario.aprobado ? 'text-success font-weight-bold' : 'text-warning font-weight-bold';
        const estadoText = usuario.aprobado ? 'Aprobado' : 'En revisión';

        row.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${imagen}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.anos_experiencia}</td>
          <td>${usuario.especialidad}</td>
          <td><input type="checkbox" ${usuario.aprobado ? 'checked' : ''} data-email="${usuario.email}" /></td>
        `;

        const checkbox = row.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function(event) {
          const email = event.target.getAttribute('data-email');
          const state = event.target.checked;

          axios.put('/api/v1/users/user/state', { email, state })
            .then(response => {
              console.log('Estado actualizado en el backend:', response.data.user);
            })
            .catch(error => {
              console.error('Error al actualizar el estado:', error);
            });
        });

        listaSkatersAdmin.appendChild(row);
      });

    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      alert('Error al obtener los usuarios. Por favor, inténtelo de nuevo más tarde.');
    }
  };

  getUsuarios();
});