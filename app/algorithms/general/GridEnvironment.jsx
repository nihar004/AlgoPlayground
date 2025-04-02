// components/GridEnvironment.js
import React from "react";
import styles from "./styles.module.css";

const GridEnvironment = ({ grid, soldier }) => {
  return (
    <div className={styles.grid}>
      {grid.map((row, y) => (
        <div key={`row-${y}`} className={styles.row}>
          {row.map((cell, x) => (
            <div
              key={`cell-${x}-${y}`}
              className={`${styles.cell} ${styles[cell]}`}
            >
              {soldier.x === x && soldier.y === y && (
                <div
                  className={`${styles.soldier} ${
                    styles[`facing-${soldier.direction}`]
                  }`}
                >
                  {/* SVG or character representation of soldier */}
                  <div className={styles.soldierIcon}>🧍</div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridEnvironment;
