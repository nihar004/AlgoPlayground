// components/GridEnvironment.js
import React from "react";
import styles from "./styles.module.css";

const directionArrows = {
  north: "↑",
  south: "↓",
  east: "→",
  west: "←",
};

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
                  <div className={styles.soldierIcon}>
                    {directionArrows[soldier.direction] || "→"}
                  </div>
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
