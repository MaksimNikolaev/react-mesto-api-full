import LoaderImg from '../images/loader.svg'

function Loader() {
  return (
    <div>
      <img src={LoaderImg} alt="Loader" className="loader__img"></img>
      <h2 className="loader__text">Идет загрузка...</h2>
    </div>    
  )
}

export default Loader;