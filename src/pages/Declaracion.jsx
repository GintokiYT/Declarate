import { useEffect, useState, useRef } from "react"

import { Contenedor } from "./Declaracion.elements"

import Swal from "sweetalert2"

const Declaracion = () => {

  const ButtonNo = useRef(null);

  const [ data, setData ] = useState({
    mensaje: '',
    salida: '',
  })

  
  const handleMouseOver = () => {
    const randomX = parseInt(Math.random()*100);
    const randomY = parseInt(Math.random()*100);
    ButtonNo.current.style.setProperty('top',randomY+'%');
    ButtonNo.current.style.setProperty('left',randomX+'%');
    ButtonNo.current.style.setProperty('transform',`translate(-${randomX}%,-${randomY}%)`);
  }

  const handleClickNo = () => {
    const randomX = parseInt(Math.random()*100);
    const randomY = parseInt(Math.random()*100);
    ButtonNo.current.style.setProperty('top',randomY+'%');
    ButtonNo.current.style.setProperty('left',randomX+'%');
    ButtonNo.current.style.setProperty('transform',`translate(-${randomX}%,-${randomY}%)`);
  }

  const handleClickYes = () => {
    return Swal.fire({
      title: data.salida,
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url(/assets/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/assets/nyan-cat.gif")
        left top
        no-repeat
      `
    })
  }

  useEffect(() => {

    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    const values = urlParams.values();

    const arreglo = [];

    for (const value of values) {
      arreglo.push(value);
    }

    // Desencriptar los datos
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

    const desencriptar = async (contraseña, encriptadoEnBase64) => {
      const decoder = new TextDecoder();
      const datosEncriptados = base64ABuffer(encriptadoEnBase64);
      const sal = datosEncriptados.slice(0, LONGITUD_SAL);
      const vectorInicializacion = datosEncriptados.slice(0 + LONGITUD_SAL, LONGITUD_SAL + LONGITUD_VECTOR_INICIALIZACION);
      const clave = await derivacionDeClaveBasadaEnContraseña(contraseña, sal, 100000, 256, 'SHA-256');
      const datosDesencriptadosComoBuffer = await window.crypto.subtle.decrypt(
        { name: "AES-CBC", iv: vectorInicializacion },
        clave,
        datosEncriptados.slice(LONGITUD_SAL + LONGITUD_VECTOR_INICIALIZACION)
      );
      return decoder.decode(datosDesencriptadosComoBuffer);
    }

    const ejecutarDesencriptado = async (texto) => {
      const contraseña = "GintokiSama"
      if (!contraseña) {
        return alert("No hay contraseña");
      }
      const textoCifradoBase64 = texto;
      if (!textoCifradoBase64) {
        return alert("No hay texto en base64");
      }
      try {
        const desencriptado = await desencriptar(contraseña, textoCifradoBase64);
        const resultado = desencriptado;
        
        return resultado;
      } catch (e) {
        console.log("Error desencriptando: " + e.message + ". ¿La contraseña es la correcta y la información está en base64?");
      }
    };

    const desencriptarParametros = async () => {
      let texto1 = arreglo[0]
      texto1 = texto1.replaceAll("á", "/");
      texto1 = texto1.replaceAll("é", "+");

      let texto2 = arreglo[1]
      texto2 = texto2.replaceAll("á", "/");
      texto2 = texto2.replaceAll("é", "+");

      const mensaje = await ejecutarDesencriptado(texto1);
      const salida = await ejecutarDesencriptado(texto2);

      setData({
        mensaje,
        salida,
      })
    }     
    
    desencriptarParametros();

  }, [])

  return (  
    <Contenedor>
      <h2>{data.mensaje}</h2>
      
      <div>
        <button 
          className="btnYes" 
          onClick={handleClickYes}
        >Si</button>
        <button
          className="btnNo" 
          ref={ButtonNo} 
          onMouseOver={handleMouseOver}
          onClick={handleClickNo}
        >No</button>
      </div>
    </Contenedor>
  );
}
 
export default Declaracion;