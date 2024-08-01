import logo from '../../../public/assets/img/logo.png';
import { useState } from 'react';


export default function NavBar({ isLoggedIn}) {
  const [isSignUp, setIsSignUp] = useState(true);
  
  

  return (
    <div className="navbar bg-base-100" data-theme="dark" style={{ width: '80%', margin: '0 auto', borderRadius: '9999px' }}> 
  <div className="flex-none">
    
      <img src={logo} alt="logo" className="w-12 h-13" />
    
  </div>
    <div className='flex-1'>
  <ul className="menu menu-horizontal px-1">
    <li><a>Accueil</a></li>
    </ul>
  </div>


  <div className="flex-1">
      <ul className="menu menu-horizontal px-1 justify-end">
        <li><a>Recherche</a></li>
        
      </ul>
    </div>

  <div className="flex-1">
    <ul className="menu menu-horizontal px-1 justify-end">
        <li>
          {isSignUp ? (
            <a onClick={() => setIsSignUp(false)}>Inscription</a>
          ) : (
            <a onClick={() => setIsSignUp(true)}>Connexion</a>
          )}
        </li>
  </ul>

  </div>
  

  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Rechercher un service ..." className="input input-bordered input-sm w-full max-w-xs" />
    </div>
    
    {isLoggedIn && (
      <div tabIndex={0} role="button" className="dropdown btn btn-ghost btn-circle avatar"> 
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
    )}
      
      {/* <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul> */}
    
      
    
  </div>
</div>
  );
}

