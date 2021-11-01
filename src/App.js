import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FilmeEmDestaque from "./components/FilmeEmDestaque";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [dadosDestaque, setDestaqueDados] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a Lista Total
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      // Pegando o Destaque
      let originals = list.filter((i) => i.slug === "originals");
      let escolhaRandom = Math.floor(
        Math.random() * (originals[0].items.results.length - 1));
      let escolhido = originals[0].items.results[escolhaRandom];

      console.log(escolhido);
    };
    loadAll();
  }, []);

  return (
    <div className="page">
      {dadosDestaque && <FilmeEmDestaque item={dadosDestaque} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
};
