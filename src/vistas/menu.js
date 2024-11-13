function showRegisterUser() {
    document.getElementById('contentDiv').innerHTML = `
      <h2>Registrar Usuario</h2>
      <form id="formUsuario" method="POST">
          <table>
              <tr>
                  <th>Nombre: </th>
                  <td><input type="text" id="fnombreU" name="nombre" required></td>
              </tr>
              <tr>
                  <th>Cedula: </th>
                  <td><input type="text" id="fcedulaU" name="cedula" required></td>
              </tr>
              <tr>
                  <th>Email: </th>
                  <td><input type="email" id="femailU" name="email" required></td>
              </tr>
              <tr>
                  <th>Edad: </th>
                  <td><input type="number" id="fedadU" name="edad" required></td>
              </tr>
              <tr>
                  <th><input type="submit" value="Registrar"></th>
                  <td><label id="resultado"></label></td>
              </tr>
          </table>
      </form>    
    `;

    // Select the form element inside the div and the result message element
    const form = document.getElementById('formUsuario');
    const confirmacion = document.getElementById('resultado');

    // Add the event listener on the form
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent page reload on submit
      
        // Gather form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
      
        try {
          // Make the POST request to the server
          const response = await fetch('http://3.144.3.134:3000/api/usuario/registrar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
      
          const result = await response.json();

          // Check if the response has validation errors
          if (!response.ok) {
            const validationErrors = result.resultado.erroresValidacion;
            if (validationErrors) {
              successMessage.textContent = `Errores en datos: ${validationErrors}`;
            } 
            return;
          }
      
          console.log('Usuario registrado:', result);
      
          // Display success message if registration is successful
          
          confirmacion.textContent = 'Registro completado!';
          
        } catch (error) {
          console.error('Error registrando usuario:', error);
          confirmacion.textContent = 'Error registrando, trata de nuevo mas tarde.';
        }
    });
}





function showRegisterPokemon() {
    document.getElementById('contentDiv').innerHTML = `
      <h2>Registrar Pokemon</h2>
      <form id="pokemonForm" method="POST">
          <table>
              <tr>
                  <th>Nombre: </th>
                  <td><input type="text" id="fnombreP" name="nombre" required></td> <!-- Added name="nombre" -->
              </tr>
              <tr>
                  <th>Tipo: </th>
                  <td><input type="text" id="ftipoP" name="tipo" required></td> <!-- Added name="tipo" -->
              </tr>
              <tr>
                  <th>Poder: </th>
                  <td><input type="text" id="fpoderP" name="poder" required></td> <!-- Added name="poder" -->
              </tr>
              <tr>
                  <th><input type="submit" value="Registrar"></th>
                  <td><label id="resultado"></label></td>
              </tr>
          </table>
      </form>   
    `;
    
    const pokemonForm = document.getElementById('pokemonForm');
    const confirmacion = document.getElementById('resultado');

    pokemonForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(pokemonForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const respuesta = await fetch('http://3.144.3.134:3000/api/pokemon/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                if (resultado.mensaje) {
                    confirmacion.innerText = `Error: ${resultado.mensaje}`;
                }
                return;
            }

            confirmacion.innerText = `¡Éxito! ${resultado.mensaje}`;
        } catch (error) {
            confirmacion.innerText = 'Error en registro, intente más tarde.';
        }
    });
}


  async function showPokemons() {
    document.getElementById('contentDiv').innerHTML=`
            <table id="tablaPokemon">
                <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Poder</th>
                    <th>Capturar</th>
                </tr>
                <tbody>
                </tbody>
            </table>
            <h1 id="resultado"></h1>
            `;
            
    try{
        const respuesta = await fetch('http://3.144.3.134:3000/api/pokemon/listar',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const resultado = await respuesta.json();
        

        if(resultado.resultado && resultado.resultado.length > 0){
            const tablaPokemon = document.getElementById('tablaPokemon').getElementsByTagName('tbody')[0];
            resultado.resultado.forEach(pokemon => {
                const nuevaFila = tablaPokemon.insertRow();

                nuevaFila.insertCell(0).textContent = pokemon.nombre;
                nuevaFila.insertCell(1).textContent = pokemon.tipo;
                nuevaFila.insertCell(2).textContent = pokemon.poder;
                nuevaFila.insertCell(3).innerHTML = `<button onclick="capturePokemon(${pokemon.id})">Capturar</button>`
            })
            document.getElementById('resultado').innerText = 'Pokemones listados'
        } else{
            document.getElementById('resultado').innerText = 'No se encontraron pokemones'
        }

    } catch (error){
        console.log('etwas')
    }
  }

  function capturePokemon(pokemonId) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML += `<table>
              <tr>
                  <th>Cedula: </th>
                  <td><input type="text" id="cedulaCU${pokemonId}" name="cedula" required></td>
                  <td><button onclick="confirmCapture(${pokemonId}, document.getElementById('cedulaCU${pokemonId}').value)">Confirmar captura</button></td>
              </tr>
              </table>
              `;
  }

  async function confirmCapture(pokemonId, userId) {
    try {
      const response = await fetch('http://3.144.3.134:3000/api/captura/capturar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pokemonId: pokemonId,
          usuarioCedula: userId
        })
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log('Capture confirmed:', result);
  
      // Optionally, display a success message in the UI
      document.getElementById('resultado').innerText = 'Captura confirmada!';
    } catch (error) {
      console.error('Error confirming capture:', error);
  
      // Optionally, display an error message in the UI
      document.getElementById('resultado').innerText = 'Error al confirmar la captura. Por favor, inténtelo de nuevo.';
    }
  }
  

  async function showUsers() {
    document.getElementById('contentDiv').innerHTML=`
            <table id="tablaUsers">
                <tr>
                    <th>Cedula</th>
                    <th>Email</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                </tr>
                <tbody>
                </tbody>
            </table>
            <h1 id="resultado"></h1>
            `;
            
    try{
        const respuesta = await fetch('http://3.144.3.134:3000/api/usuario/listar',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const resultado = await respuesta.json();
        

        if(resultado.resultado && resultado.resultado.length > 0){
            const tablaUser = document.getElementById('tablaUsers').getElementsByTagName('tbody')[0];
            resultado.resultado.forEach(user => {
                const nuevaFila = tablaUser.insertRow();

                nuevaFila.insertCell(0).textContent = user.cedula;
                nuevaFila.insertCell(1).textContent = user.email;
                nuevaFila.insertCell(2).textContent = user.nombre;
                nuevaFila.insertCell(3).textContent = user.nombre;
                nuevaFila.insertCell(2).textContent = user.nombre;
            })
            document.getElementById('resultado').innerText = 'Usuarios listados'
        } else{
            document.getElementById('resultado').innerText = 'No se encontraron usuarios'
        }

    } catch (error){
        console.log('etwas')
    }
  }