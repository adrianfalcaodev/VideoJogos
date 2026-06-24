import { Outlet } from "react-router-dom";
import "../App.css";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function RootLayout() {
    return(
        <>
        <nav className="menubar" id="menubar">
                <Link to="/"><Button>Home</Button></Link>
                <Link to="/jogos"><Button>Jogos</Button></Link>
                <Link to="/theLast"><Button>The Last of Us</Button></Link>
                <Link to="/itTakesTwo"><Button>It Takes Two</Button></Link>
                <Link to="/uncharted"><Button>Uncharted</Button></Link>
                <Link to="/cod"><Button>Call of Duty</Button></Link>
                </nav>
        <Outlet />
        <footer className="footer">
            <p>© 2026 Meu Site de Jogos. Todos os direitos reservados.</p>
        </footer>
        </>
    )
}
