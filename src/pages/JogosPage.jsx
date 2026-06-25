import { useEffect, useState } from "react";
import '../App.css';
import Button from "../components/Button";
import { gameDescriptions } from "../data/gameDescriptions";

function getGameDescription(gameName) {
    const gameDescription = gameDescriptions.find((item) =>
        gameName.toLowerCase().includes(item.name.toLowerCase())
    );

    return gameDescription?.description || "Conheça mais detalhes sobre este jogo, seus gêneros e sua experiência.";
}

export default function JogosPage(){
        const [jogos, setJogos] = useState([]);
        const [busca, setBusca] = useState("");
        const [jogoSelecionado, setJogoSelecionado] = useState(null);
useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch("https://api.rawg.io/api/games?key=cc0655a7ca5948e39f1f947ebf30c3db");
            const resData = await response.json();
            setJogos(resData.results);
        } catch (error) {
            console.error("Erro ao buscar os jogos:", error);
        }

        for (let page = 2; page <= 7; page++) {
            await fetch(`https://api.rawg.io/api/games?key=cc0655a7ca5948e39f1f947ebf30c3db&page=${page}`)
            .then((response) => response.json())
            .then((resData) => {
                setJogos((prevJogos) => [...prevJogos, ...resData.results]);
            });
        }
    }
fetchData();
}, []);

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
            <Button clickFunction={() => setJogoSelecionado(item)}>Detalhes</Button>
        </div>
        </article>
    ))}
    </div>

    {jogoSelecionado && (
        <div className="modal-overlay" onClick={() => setJogoSelecionado(null)}>
            <div className="modal-content" onClick={(event) => event.stopPropagation()}>
                <button className="modal-close" onClick={() => setJogoSelecionado(null)}>
                    Fechar
                </button>

                {jogoSelecionado.background_image && (
                    <img src={jogoSelecionado.background_image} alt={jogoSelecionado.name} />
                )}

                <h2>{jogoSelecionado.name}</h2>
                <p>{getGameDescription(jogoSelecionado.name)}</p>

                <div className="modal-details">
                    <p><strong>Data de lançamento:</strong> {jogoSelecionado.released || "Não informada"}</p>
                    <p><strong>Nota:</strong> {jogoSelecionado.rating || "Não informada"}</p>
                    <p><strong>Gêneros:</strong> {jogoSelecionado.genres?.map((genre) => genre.name).join(", ") || "Não informado"}</p>
                    <p><strong>Plataformas:</strong> {jogoSelecionado.platforms?.map((platform) => platform.platform.name).join(", ") || "Não informado"}</p>
                </div>
            </div>
        </div>
    )}
    </>
    )
}
