axios.get('/api/v1/users')
  .then(response => {
    const usuarios = response.data;

    const listaSkatersAdmin = document.getElementById('listaSkatersAdmin');

    listaSkatersAdmin.innerHTML = '';

    usuarios.forEach((usuario, index) => {
      const row = document.createElement('tr');

      const imagen = usuario.foto ? `<img src="${usuario.foto}" alt="Foto de ${usuario.nombre}" style="max-width: 50px; max-height: 50px;">` : '<div style="width: 50px; height: 50px; background-color: lightgray;"></div>';

      row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${imagen}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.anos_experiencia}</td>
        <td>${usuario.especialidad}</td>
        <td><input type="checkbox" ${usuario.aprobado ? 'checked' : ''} data-email="${usuario.email}" /></td>
      `;

      // Agregar listener al checkbox
      const checkbox = row.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('change', function(event) {
        const email = event.target.getAttribute('data-email');
        const state = event.target.checked;

        // Enviar datos al backend
        axios.put('/api/v1/users/user/state', { email, state })
          .then(response => {
            console.log('Estado actualizado en el backend:', response.data.user);
            // Aquí podrías refrescar la lista o realizar otras acciones necesarias
          })
          .catch(error => {
            console.error('Error al actualizar el estado:', error);
            // Manejar el error según tus necesidades
          });
      });

      listaSkatersAdmin.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error al obtener los usuarios:', error);
  });
