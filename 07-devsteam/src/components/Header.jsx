import React from "react";

const Header = () => {
  return (
  <header className="w-100 navbar navbar-dark bg-black justify-content-around align-items-center"> 

    <div id="info" className="d-flex g-5 w-50 justify-content-between">

      <div id="logo" role="button" className="d-flex align-items-center me-5">
        <i className="bi bi-controller fs-1 text-light me-3"></i>
        <span className="navbar-brand fw-bold fs-3">DevSteam</span>
      </div>

      <input 
      type="text" 
      className="w-100 d-none d-md-block border-0 rounded-1 search-input px-4 my-2 ms-5 buscar" 
      placeholder="Buscar..."  
      />
    </div>
    
    <div id="carrinho">
      <i className="bi bi-cart4 text-light fs-2"></i>
    </div>
    </header>
 
);
};

export default Header;
