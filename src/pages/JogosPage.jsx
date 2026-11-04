import { useEffect, useState } from "react";
import '../App.css';
import Button from "../components/Button";
import { gameDescriptions } from "../data/gameDescriptions";

const URL_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

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
        const [erro, setErro] = useState("");
        const [carregando, setCarregando] = useState(true);

useEffect(() => {
    async function fetchData() {
        if (!URL_API_KEY) {
            setErro("Configure VITE_RAWG_API_KEY no arquivo .env.");
            setCarregando(false);
            return;
        }

        try {
            const totalPages = 10;
            const requests = [];

            for (let page = 1; page <= totalPages; page++) {
                const url =
                    page === 1
                        ?`https://api.rawg.io/api/games?key=${URL_API_KEY}`
                        : `https://api.rawg.io/api/games?key=${URL_API_KEY}&page=${page}`;

                requests.push(
                    fetch(url)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`Falha na API RAWG: ${response.status}`);
                            }
                            return response.json();
                        })
                );
            }

            const pagesData = await Promise.all(requests);
            const allGames = pagesData.flatMap((pageData) => pageData.results || []);

            const uniqueGames = Array.from(
                new Map(allGames.map((game) => [game.id, game])).values()
            );

            setJogos(uniqueGames);
        } catch (error) {
            console.error("Erro ao buscar os jogos:", error);
            setErro("Não foi possível carregar os jogos. Tente novamente mais tarde.");
        } finally {
            setCarregando(false);
        }
    }
fetchData();
}, []);

    return(
        <>

        <input className="search-input" type="text" placeholder="Buscar jogo..." value={busca} onChange={(event) => setBusca(event.target.value)}/>

      <div className="games-grid">
        {erro ? (
            <p role="alert">{erro}</p>
        ) : carregando ? (
            <p>Carregando jogos...</p>
        ) : (
            jogos.filter((item) => item.name.toLowerCase().includes(busca.toLowerCase())).map((item) => (
                <article className="game-card" key={item.id}>
                    <img src={item.background_image} alt={item.name} />
                    <div className="game-info">
                        <h2>{item.name}</h2>
                        <p>{item.released}</p>
            <span>{item.genres.map((genre) => genre.name).join(", ")}</span>
            <Button clickFunction={() => setJogoSelecionado(item)}>Detalhes</Button>
        </div>
        </article>
        ))
    )}
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
