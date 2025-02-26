import "./App.css"
import foto from "./img/IMG_20241231_221913_757.webp"

import Perfil from "./components/perfil/perfil"
import Switch from "./components/switch/Switch"
import Links from "./components/links/Links"
import SocialLinks from "./components/socialLinks/SocialLinks"
import Rodape from "./components/rodape/Rodape"
import { useState } from "react"

const App = () => {
  const [isLight, setIsLight] = useState(false)

const troca =() => {
  setIsLight (!isLight)
}

  return (
  
    <div id="App" className={isLight && "light"}>

    <Perfil fotoPerfil={foto} >@liv_217m </Perfil>
    
    <Switch troca={troca} isLight={isLight}/>
    <ul>
    <Links link={"https://github.com/LiviaOrmeleze"}>GitHub</Links>
    <Links link={"https://www.instagram.com/liv_217m/"}>Instagram</Links>
    <Links link={"https://br.pinterest.com/lormeleze217/"}>Pinterest</Links>
    <Links link={"https://open.spotify.com/playlist/7kzfyFtGu1YS3W9NiAWskd"}>Spotify</Links>
   
    </ul>


<div id='socialLinks'>
  <SocialLinks 
    link={"https://github.com/LiviaOrmeleze"}
    icon={"logo-github"}
  />
  <SocialLinks 
    link={"https://www.instagram.com/liv_217m/"}
    icon={"logo-instagram"}
  /><SocialLinks 
  link={"https://br.pinterest.com/lormeleze217/"}
  icon={"logo-pinterest"}
/><SocialLinks 
    link={"https://open.spotify.com/playlist/7kzfyFtGu1YS3W9NiAWskd"}
    icon={"play-circle-outline"}
  />
</div>
<Rodape>@liv_217m</Rodape>
    </div>
   
  )
}

export default App
