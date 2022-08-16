import { Link, Routes, Route } from 'react-router-dom';
import logo from '../images/header/logo.svg';

function Header({email,handleLogOut}) {
  return (
    <header className="header">
      <div className="header__container">
        <img
          src={logo}
          alt="Логотип Место"
          className="header__logo"
       />
        <Routes>
          <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>}/>
          <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>}/>
          <Route path="/" element={
            <div className="header__user-menu">
             <p className="header__email">{email}</p> 
             <Link to='/sign-in' className="header__link" onClick={handleLogOut}>Выйти</Link>
            </div>
         }/>
        </Routes>
      </div>
      
    </header>
  );
}

export default Header;