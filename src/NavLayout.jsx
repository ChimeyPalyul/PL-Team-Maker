import { NavLink, Link, Outlet } from "react-router-dom";

function NavLayout(){
    return(
        <div>
            <header>
                <nav>
                    <h1 className="Chelsea">CHELSEAAAA</h1>
                    <NavLink to="/">Playerlist  </NavLink>
                    <Link to="/subs">Substitutes  </Link>
                    <Link to="/EditButtons">Add Player  </Link>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
export default NavLayout