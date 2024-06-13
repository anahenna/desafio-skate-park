document.addEventListener("DOMContentLoaded", () => {
  const listaSkatersAdmin = document.getElementById('listaSkatersAdmin');

  // Función para obtener y mostrar los usuarios
  const getUsuarios = async () => {
    try {
      const response = await axios.get('/api/v1/users');
      console.log('Datos de usuarios:', response.data);
      const usuarios = response.data;

      // Limpiar la tabla antes de agregar nuevos datos
      listaSkatersAdmin.innerHTML = '';

      // Iterar sobre cada usuario y crear una fila en la tabla
      usuarios.forEach((usuario, index) => {
        const row = document.createElement('tr');

        // Construir la imagen o un div gris si no hay imagen disponible
        const imagen = usuario.foto ? `<img src="${usuario.foto}" alt="Foto de ${usuario.nombre}" style="max-width: 50px; max-height: 50px;">` : '<div style="width: 50px; height: 50px; background-color: lightgray;"></div>';

        // Determinar la clase CSS y el texto del estado basado en el valor de usuario.aprobado
        const estadoClass = usuario.aprobado ? 'text-success font-weight-bold' : 'text-warning font-weight-bold';
        const estadoText = usuario.aprobado ? 'Aprobado' : 'En revisión';

        // Llenar la fila con los datos del usuario
        row.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${imagen}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.anos_experiencia}</td>
          <td>${usuario.especialidad}</td>
          <td><input type="checkbox" ${usuario.aprobado ? 'checked' : ''} data-email="${usuario.email}" /></td>
        `;

        // Agregar listener al checkbox para actualizar el estado
        const checkbox = row.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function(event) {
          const email = event.target.getAttribute('data-email');
          const state = event.target.checked;

          // Enviar datos al backend para actualizar el estado
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

        // Agregar la fila a la tabla
        listaSkatersAdmin.appendChild(row);
      });

    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      alert('Error al obtener los usuarios. Por favor, inténtelo de nuevo más tarde.');
    }
  };

  // Llamar a la función para obtener y mostrar los usuarios al cargar la página
  getUsuarios();
});