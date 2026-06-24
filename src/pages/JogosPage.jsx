import { useEffect, useState } from "react";
import '../App.css';
import Button from "../components/Button";

export default function JogosPage(){
        const [jogos, setJogos] = useState([]);
        const [busca, setBusca] = useState("");
useEffect(() => {
    fetch("https://api.rawg.io/api/games?key=cc0655a7ca5948e39f1f947ebf30c3db")
    .then((response)=> response.json())
    .then((resData) => {
        setJogos(resData.results);
    });
    for (let page = 2; page <= 10; page++) {
     async function fetchPage() {
        const response = await fetch(`https://api.rawg.io/api/games?key=cc0655a7ca5948e39f1f947ebf30c3db&page=${page}`);
        const resData = await response.json();
        setJogos((prevJogos) => [...prevJogos, ...resData.results]);
    }
    fetchPage();
} }, []);

    return(
        <>
        <input className="search-input" type="text" placeholder="Buscar jogo..." value={busca} onChange={(event) => setBusca(event.target.value)}/>
        
      <div className="games-grid">
        {jogos.filter((item) => item.name.toLowerCase().includes(busca.toLowerCase())).map((item) => (
        <article className="game-card" key={item.id}>
        <img src={item.background_image} alt={item.name} />
        <div className="game-info">
            <h2>{item.name}</h2>
            <p>{item.released}</p>
            <span>{item.genres.map((genre) => genre.name).join(", ")}</span>
            <Button>Detalhes</Button>
        </div>
        </article>
    ))}
    </div>
    </>
    )
}
