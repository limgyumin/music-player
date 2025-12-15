import { Link, useLoaderData } from "react-router";
import { Collection } from "../models/collection";
import styles from "./index.module.css";
import { FaPlay } from "react-icons/fa6";

export const IndexPage = () => {
  const collections = useLoaderData<readonly Collection[]>();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.introduction}>
          <h1 className={styles.introduction__title}>
            Discover what
            <br />
            he listening to
            <br />
            while he focus.
          </h1>

          <p className={styles.introduction__description}>
            Playlists by milimgyu.
          </p>
        </div>

        <ul className={styles.collections}>
          {collections.map((collection) => (
            <li key={collection.id} className={styles.collection}>
              <img
                src={collection.thumbnail}
                alt={collection.thumbnail}
                className={styles.collection__thumbnail}
              />

              <Link to={`/collections/${collection.id}`}>
                <button className={styles["collection__play-button"]}>
                  <FaPlay />
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
