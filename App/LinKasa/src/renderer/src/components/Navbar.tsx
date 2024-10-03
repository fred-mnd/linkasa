import NavbarLogged from "./NavbarController/NavbarLogged"
import NavbarNotLogged from "./NavbarController/NavbarNotLogged"
import { auth } from "./lib/firebase"

function Navbar()
{
  if(auth.currentUser){
    return (
      <NavbarLogged auth = {auth} />
    )
  }
  else{
    return (
      <NavbarNotLogged />
    )
  }
}

export default Navbar
