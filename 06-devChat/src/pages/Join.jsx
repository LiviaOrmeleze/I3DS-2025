import React, { useRef } from 'react'
import {io} from 'socket.io-client'
import logo from "../assets/logo.png"
const Join = (props) => {
//Hooks
const usernameRef = useRef()

const handleSubmit = async () => {
    const username = usernameRef.current.value;
    if(!username.trim() || username.length < 3){ 
       alert("Por favor, digite um nome de usuário válido.");
    return
}
//Criando a conexão com servidor socket
const servidorSocket = await io.connect("http://192.168.0.118:5000");
servidorSocket.emit("set_username", username);

//abriando a pagina de chat
props.setSocket(servidorSocket)
props.visibility(true)
};


  return (
    <div id='chat' className='text-center '>
      <img className="logo object-fit-cover" src={logo} alt="" />

      <div id="join-box" className='mt-4 bg-warning rounded-5 p-4 py-4 px-5 d-flex flex-column justify-content-center align-items-center gap-3'> 

        <h3 className='text-warning-emphasis '>Bem-Vindo ao devChat!</h3>

        <div className="form-floating mb-3 ">

      <input 
      ref={usernameRef}
       id="floatingInput" 
       className='form-control rounded-4' 
       type="text" placeholder='Nome de Usuário' />
      <label  htmlFor="floatingInput" className="">
            Nome de usuário
          </label>
      </div>
      <button id='btn' className='btn btn-secondary px-5 py-2 rounded-4' onClick={() => handleSubmit()}>
        Entrar
      </button>
      </div>
    </div>
  )
}

export default Join
