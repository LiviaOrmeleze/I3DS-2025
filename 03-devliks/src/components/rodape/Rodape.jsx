import styles from './Rodape.module.css'

const Rodape = ({children}) => {
  return (
   <footer>
    <p> 
        Feito com 🩶 <a href="https://github.com">{children}</a>
    </p>
   </footer>
  )
}

export default Rodape
