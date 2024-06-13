document.addEventListener("DOMContentLoaded", () => {
    const listaSkaters = document.querySelector("#listaSkaters");

    const getSkaters = async () => {
        try {
            const response = await axios.get('/api/v1/users');
            console.log('Response data:', response.data);
            const skaters = response.data;

            if (skaters.length === 0) {
                console.warn('No skaters found.');
            }

            skaters.forEach(skater => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <th scope="row">${skater.id}</th>
                    <td><div><img src="${skater.foto}" style="width: 50px; height: 60px;"</td>
                    <td>${skater.nombre}</td>
                    <td>${skater.anos_experiencia}</td>
                    <td>${skater.especialidad}</td>
                    <td class="${skater.estado === 'true' ? 'text-success font-weight-bold' : 'text-warning font-weight-bold'}">${skater.estado === 'true' ? 'Aprobado' : 'En revisión'}</td>

                `;
                
                
                listaSkaters.appendChild(tr);
                
            });

        } catch (error) {
            console.log(error)
            alert(error.response.data.msg)

        }
    };


    getSkaters();
});
