import { headerData } from '../data/header'
import { useState, useEffect } from 'react'
import '../App.css';
import { Link } from 'react-router-dom';


export default function HomePage() {

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % headerData.length);
    }, 3000);

    return () => clearInterval(interval);
});

  return(
    <>
    <header className="hero">
      <img src={headerData[currentIndex].image} alt="Imagem de destaque" />

      <div className="hero-content">
          <h1>Explore mundos incríveis</h1>
          <p>Descubra jogos populares, histórias marcantes e experiências inesquecíveis.</p>
          <br></br>
        <Link to="/jogos"><button>Ver jogos</button></Link>
      </div>
    </header>
    <main className="home-featured">
      <h2>Jogos em destaque</h2>
      <div className="games-grid">      
        <article className="game-card">
          <img src="https://media.rawg.io/media/games/364/3642d850efb217c58feab80b8affaa89.jpg" alt="The Last of Us" />
          <div className="game-info">
            <h2>The Last of Us</h2>
            <p>Data de lançamento: 14 de junho de 2013</p>
            <p>Gênero: Ação, Aventura, Sobrevivência</p>
            <Link to="/theLast"><button>Detalhes</button></Link>
          </div>
        </article>
        <article className="game-card">
          <img  src="https://upload.wikimedia.org/wikipedia/pt/1/1c/Uncharted_1_capa.png" alt="Uncharted"/>
          <div className="game-info">
            <h2>Uncharted</h2>
            <p>Data de lançamento: 19 de novembro de 2007</p>
            <p>Gênero: Ação, Aventura</p>
            <Link to="/uncharted"><button>Detalhes</button></Link>
          </div>
        </article>
        <article className="game-card">
          <img src="https://image.api.playstation.com/vulcan/ap/rnd/202012/0815/IjqyQi0J2PL7GdEo3K8jKWMh.png" alt="It Takes Two" />
          <div className="game-info">
            <h2>It Takes Two</h2>
            <p>Data de lançamento: 26 de março de 2021</p>
            <p>Gênero: Ação, Aventura, Cooperativo</p>
            <Link to="/itTakesTwo"><button>Detalhes</button></Link>
          </div>
        </article>
        <article className="game-card">
          <img src="https://upload.wikimedia.org/wikipedia/pt/5/54/Call-of-Duty---Black-Ops---Cover-.jpg" alt="Call of Duty" />
          <div className="game-info">
            <h2>Call of Duty</h2>
            <p>Data de lançamento: 29 de outubro de 2003</p>
            <p>Gênero: Tiro, Ação</p>
            <Link to="/cod"><button>Detalhes</button></Link>
          </div>
        </article>
      </div>
    </main>
    </>
  )
}
