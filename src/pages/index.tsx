import { Link, useLoaderData } from "react-router";
import { Collection } from "../models/collection";
import styles from "./index.module.css";
import { FaPlay } from "react-icons/fa6";
import { Music } from "../models/music";

const MAX_ARTISTS = 3;

const getArtists = (musics: readonly Music[], max: number): string[] => {
  return [...new Set(musics.flatMap((music) => music.artists))];
};

export const IndexPage = () => {
  const collections = useLoaderData<readonly Collection[]>();

  return (
    <div className={styles.container} data-theme="light">
      <div className={styles.wrapper}>
        <ul className={styles.collections}>
          {collections.map((collection) => (
            <li key={collection.id} className={styles.collection}>
              <Link to={`/collections/${collection.id}`}>
                <div className={styles.collection__inner}>
                  <div className={styles.collection__content}>
                    <h1 className={styles.collection__title}>
                      {collection.title}
                    </h1>

                    <p className={styles.collection__artists}>
                      {getArtists(collection.musics, MAX_ARTISTS)
                        .slice(0, MAX_ARTISTS)
                        .join(", ")}
                    </p>
                  </div>

                  <button className={styles["collection__play-button"]}>
                    <FaPlay />
                  </button>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
