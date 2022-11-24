import { useState } from "react"
import { Contenedor, Titulo, Formulario, FormControl } from "./Home.elements";
import Swal from 'sweetalert2'
import ClipboardJS from "clipboard"

const Home = () => {

  const [ informacion, setInformacion ] = useState({
    mensaje: "",
    salida: "",
    url: ""
  });

  const handleChange = (e) => {
    setInformacion({
      ...informacion,
      [e.target.name]: e.target.value,
      url: ""
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Encriptar los datos
    const bufferABase64 = buffer => btoa(String.fromCharCode(...new Uint8Array(buffer)));
    const base64ABuffer = buffer => Uint8Array.from(atob(buffer), c => c.charCodeAt(0));
    const LONGITUD_SAL = 16;
    const LONGITUD_VECTOR_INICIALIZACION = LONGITUD_SAL;
    const derivacionDeClaveBasadaEnContraseña = async (contraseña, sal, iteraciones, longitud, hash, algoritmo = 'AES-CBC') => {
      const encoder = new TextEncoder();
      let keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        encoder.encode(contraseña),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
      );
      return await window.crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: encoder.encode(sal),
          iterations: iteraciones,
          hash
        },
        keyMaterial,
        { name: algoritmo, length: longitud },
        false,
        ['encrypt', 'decrypt']
      );
	  }

    const encriptar = async (contraseña, textoPlano) => {
      const encoder = new TextEncoder();
      const sal = window.crypto.getRandomValues(new Uint8Array(LONGITUD_SAL));
      const vectorInicializacion = window.crypto.getRandomValues(new Uint8Array(LONGITUD_VECTOR_INICIALIZACION));
      const bufferTextoPlano = encoder.encode(textoPlano);
      const clave = await derivacionDeClaveBasadaEnContraseña(contraseña, sal, 100000, 256, 'SHA-256');
      const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-CBC", iv: vectorInicializacion },
        clave,
        bufferTextoPlano
      );
      return bufferABase64([
        ...sal,
        ...vectorInicializacion,
        ...new Uint8Array(encrypted)
      ]);
    };

    const ejecutarEncriptado = async (texto) => {
      const contraseña = "GintokiSama";
      if (!contraseña) {
        console.log("No hay contraseña");
      }
      const textoPlano = texto;
      if (!textoPlano) {
        console.log("No hay texto para encriptar");
      }
      const encriptado = await encriptar(contraseña, textoPlano);

      console.log(encriptado);
      return encriptado;  
    };
    
    let mensaje = await ejecutarEncriptado(informacion.mensaje);
    let salida = await ejecutarEncriptado(informacion.salida);

    mensaje = mensaje.replaceAll("/", "á");
    mensaje = mensaje.replaceAll("+", "é");

    salida = salida.replaceAll("/", "á");
    salida = salida.replaceAll("+", "é");

    let ruta = `m=${mensaje}&s=${salida}`;

    const url = `${String(window.location)}declaracion/?${ruta}`;

    if(informacion.mensaje === "") {
      return Swal.fire('Primero ingrese como quiere declararse')
    };

    if(informacion.salida === "") {
      return Swal.fire('Primero ingrese la salida del mensaje')
    };

    setInformacion({
      ...informacion,
      url : url
    })
  }

  const handleCopy = () => {

    new ClipboardJS('.btn');

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Texto copiado en el portapapeles',
      showConfirmButton: false,
      timer: 1500
    })
  }

  return ( 
    <Contenedor>
      <Titulo>Declarate a tu crush</Titulo>
        < Formulario
          onSubmit={handleSubmit}
        >
          <FormControl>
            <label>Ingrese como quiere declararse</label>
            <input 
              type="text" 
              name="mensaje"
              placeholder="Ej. ¿Fulan@ quieres ser mi novi@?"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <label>Ingrese el mensaje de salida</label>
            <input 
              type="text" 
              name="salida"
              placeholder="Ej. Sabia que aceptarias jiji ❤️"
              onChange={handleChange}
            />
          </FormControl>
          <input type="submit" value="Generar Link"/>
          
          {
            informacion.url !== ""
            ? <button 
                onClick={handleCopy}
                className='btn'
                data-clipboard-text={informacion.url}
              >Enlace</button>
            : null
          }

        </Formulario>
    </Contenedor>
  );
}
 
export default Home;