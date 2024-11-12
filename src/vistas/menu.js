function showRegisterUser() {
    document.getElementById('contentDiv').innerHTML = `
      <h2>Registrar Usuario</h2>
      <form id="formUsuario">
          <table>
              <tr>
                  <th>Nombre: </th>
                  <td><input type="text" id="fnombreU" required></td>
              </tr>
              <tr>
                  <th>Cedula: </th>
                  <td><input type="text" id="fcedulaU" required></td>
              </tr>
              <tr>
                  <th>Email: </th>
                  <td><input type="email" id="femailU" required></td>
              </tr>
              <tr>
                  <th>Edad: </th>
                  <td><input type="number" id="fedadU" required></td>
              </tr>
              <tr>
                  <th><input type="submit" value="Registrar"></th>
                  <td><label id="resultado"></label></td>
              </tr>
          </table>
      </form>    
    `;
}

document.getElementById('contentDiv').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('fnombreU').value;
    const cedula = document.getElementById('fcedulaU').value;
    const email = document.getElementById('femailU').value;
    const edad = document.getElementById('fedadU').value;

    // verificar
    document.getElementById("resultado").innerText = "Exitosamente agregado!";
})


function showRegisterPokemon() {
    document.getElementById('contentDiv').innerHTML = `
      <h2>Registrar Pokemon</h2>
      <form>
          <table>
              <tr>
                  <th>Nombre: </th>
                  <td><input type="text" id="fnombreP" required></td>
              </tr>
              <tr>
                  <th>Tipo: </th>
                  <td><input type="text" id="ftipoP" required></td>
              </tr>
              <tr>
                  <th>Poder: </th>
                  <td><input type="text" id="fpoderP" required></td>
              </tr>
              <tr>
                  <th><input type="submit" value="Registrar"></th>
                  <td><label id="resultado"></label></td>
              </tr>
          </table>
      </form>   
    `;
  }

  document.getElementById('contentDiv').addEventListener('submit', function(event){
    event.preventDefault();
    const nombreP = document.getElementById("fnombreP").value;
    const tipoP = document.getElementById("ftipoP").value;
    const poderP = document.getElementById("fpoderP").value;

    document.getElementById('resultado').innerText = "Exito!";
  });

  function showSelectUser() {
    document.getElementById('contentDiv').innerHTML = `
      <h3>Seleccionar usuario activo</h3>
      <p>Seleccione el usuario que desea activar.</p>
    `;
  }