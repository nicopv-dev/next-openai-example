import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import Searchbar from "../components/Searchbar";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sugerencias, setSugerencias] = useState<string[]>([""]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      priceMin: 5000,
      priceMax: 15000,
      gender: "mujer",
      age: 23,
      hobbies: "viajera, estudiante, escritora",
    };

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        const result = await response.json();
        setSugerencias(result.data as string[]);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen space-y-8 px-4 sm:px-0">
      <Head>
        <title>SuGIFTS | Sugerencia de regalos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="space-y-4 grid place-content-center p-10">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-whtie text-5xl font-bold text-white">SuGIFTS</h1>
          <p className="text-white text-2xl font-light">
            Selecciona las caracteristicas para un regalo
          </p>
        </div>
      </main>

      <div className="flex justify-center w-full">
        <form
          className="max-w-4xl w-full grid grid-cols-2 gap-4"
          onSubmit={onSubmit}
        >
          <Searchbar />
          <select className="select w-full bg-cyan-800 shadow-lg">
            <option value={"mujer"}>Mujer</option>
            <option value={"hombre"}>Hombre</option>
          </select>
          <input
            type="text"
            placeholder="Edad"
            className="input input-bordered w-full"
          />
          <div className="col-span-2">
            <button
              type="submit"
              className="text-white bg-white bg-opacity-80 backdrop-blur-md bg-white/30 rounded-md shadow w-full p-4 transition-all duration-300 ease-out hover:shadow-lg"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-center">
        {isLoading ? (
          <Loading />
        ) : (
          <ul className="max-w-4xl flex flex-col gap-2">
            {sugerencias.length > 0
              ? sugerencias.map((sugerencia, index) => (
                  <li key={index} className="text-white">
                    {sugerencia}
                  </li>
                ))
              : null}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
