import React, { useRef, Suspense, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from "three";
import { useWarnings } from "../../../context/WarningContext";
import { useTheme } from "../../../context/ThemeContext";
import { useSorting } from "../SortingContext";

// FPS monitoring component
const FPSMonitor = ({ onFPSChange }) => {
  useEffect(() => {
    let frameTimes = [];
    let lastTime = performance.now();

    const updateFPS = () => {
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;

      frameTimes.push(delta);
      if (frameTimes.length > 60) frameTimes.shift();

      const averageDelta =
        frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
      const fps = 1000 / averageDelta;

      onFPSChange(Math.round(fps));
      requestAnimationFrame(updateFPS);
    };

    const handle = requestAnimationFrame(updateFPS);
    return () => cancelAnimationFrame(handle);
  }, [onFPSChange]);

  return null;
};

// Floor component (non-instanced to ensure visibility)
const Floor = ({ position, color }) => {
  const { scene } = useGLTF("/models/floor_new.glb");
  const clonedScene = scene.clone();

  // Apply material color to all meshes in the scene
  clonedScene.traverse((child) => {
    if (child.isMesh && child.name === "room") {
      child.material = child.material.clone();
      child.material.color.set(color);
      child.material.metalness = 0.5;
      child.material.roughness = 0.5;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive object={clonedScene} position={position} />;
};

// Optimized building component using batching but no instancing (to fix visibility)
const Building = React.memo(
  ({ value, position, color, isActive, isSwapping, performanceMode }) => {
    const groupRef = useRef();
    const { scene } = useGLTF("/models/base_new.glb");

    // Use shader-based animation for performance
    const shakeAmount = useRef(0);

    useFrame(({ clock }) => {
      if (groupRef.current) {
        // Update shake amount based on state
        shakeAmount.current = isSwapping && isActive ? 0.1 : 0;

        if (shakeAmount.current > 0) {
          // Use sine wave for animation
          groupRef.current.position.x =
            position[0] +
            Math.sin(clock.getElapsedTime() * 10) * shakeAmount.current;
        } else {
          groupRef.current.position.x = position[0];
        }
      }
    });

    // Create floors for the building
    const floors = useMemo(() => {
      return Array.from({ length: value }, (_, index) => (
        <Floor
          key={index}
          position={[109.4, index * 3 - 0.1, -13.4]}
          color={color}
        />
      ));
    }, [value, color]);

    return (
      <group ref={groupRef} position={position} scale={[0.2, 0.2, 0.2]}>
        {/* Base */}
        <primitive
          object={scene.clone()}
          position={[0, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          castShadow={!performanceMode}
        />
        {/* Floors */}
        {floors}
      </group>
    );
  }
);

const Scene = ({ currentState, isDarkMode, performanceMode, size }) => {
  // FIXME:

  // Simplified lighting setup
  const ambientColor = isDarkMode ? "#b0d0ff" : "#fffdf0";
  const directionalColor = isDarkMode ? "#d1e0ff" : "#fff5d1";
  const dymamic_grid_size = 10 + (size - 3) * 2;
  const dynamic_scene_x = -2 - size + 3;

  // Get building color based on its state
  const getBuildingColor = (index) => {
    if (
      currentState.completedBars &&
      currentState.completedBars.includes(index)
    ) {
      return "#22c55e";
    }
    if (index === currentState.j || index === currentState.j + 1) {
      return currentState.action === "swap" ? "#dc2626" : "#facc15";
    }
    return isDarkMode ? "#60A5FA" : "#3B82F6";
  };

  // Load textures with memoization
  const [colorMap, roughnessMap, normalMap] = useLoader(TextureLoader, [
    "/tile_texture/Grass008_1K-JPG_Color.jpg",
    "/tile_texture/Grass008_1K-JPG_Roughness.jpg",
    "/tile_texture/Grass008_1K-JPG_NormalGL.jpg",
  ]);

  // Apply texture settings only once
  useEffect(() => {
    [colorMap, roughnessMap, normalMap].forEach((texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 4);
    });
  }, [colorMap, roughnessMap, normalMap]);

  // Group buildings by completion state for batch rendering
  const buildingGroups = useMemo(() => {
    const groups = {
      completed: [],
      active: [],
      normal: [],
    };

    currentState.array.forEach((value, index) => {
      const isActive = index === currentState.j || index === currentState.j + 1;
      const isCompleted =
        currentState.completedBars &&
        currentState.completedBars.includes(index);

      if (isCompleted) {
        groups.completed.push({ value, index });
      } else if (isActive) {
        groups.active.push({ value, index });
      } else {
        groups.normal.push({ value, index });
      }
    });

    return groups;
  }, [currentState]);

  return (
    <group scale={[1.7, 1.7, 1.7]}>
      {/* Simplified lighting - just two main lights */}
      <ambientLight intensity={isDarkMode ? 5 : 8} color={ambientColor} />
      <directionalLight
        position={[5, 15, 5]}
        intensity={isDarkMode ? 2.0 : 2.0}
        castShadow={!performanceMode}
        color={directionalColor}
        shadow-mapSize-width={performanceMode ? 1024 : 2048}
        shadow-mapSize-height={performanceMode ? 1024 : 2048}
      />

      {/* Render buildings by group */}
      <group position={[dynamic_scene_x, -5, 0]}>
        {/* Normal buildings */}
        {buildingGroups.normal.map(({ value, index }) => (
          <Building
            key={index}
            value={value}
            position={[index * 2, 0, 0]}
            isActive={false}
            isSwapping={false}
            color={getBuildingColor(index)}
            performanceMode={performanceMode}
          />
        ))}
        {/* Completed buildings */}
        {buildingGroups.completed.map(({ value, index }) => (
          <Building
            key={index}
            value={value}
            position={[index * 2, 0, 0]}
            isActive={false}
            isSwapping={false}
            color={getBuildingColor(index)}
            performanceMode={performanceMode}
          />
        ))}
        {/* Active buildings - rendered last for proper overlapping */}
        {buildingGroups.active.map(({ value, index }) => (
          <Building
            key={index}
            value={value}
            position={[index * 2, 0, 0]}
            isActive={true}
            isSwapping={currentState.action === "compare"}
            color={getBuildingColor(index)}
            performanceMode={performanceMode}
          />
        ))}
      </group>

      {/* Floor grid */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -5.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[dymamic_grid_size, 16]} />
        <meshStandardMaterial
          map={colorMap}
          roughnessMap={performanceMode ? null : roughnessMap}
          normalMap={performanceMode ? null : normalMap}
        />
      </mesh>

      {/* Camera controls with limited update rate */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={10}
        maxDistance={35}
        maxPolarAngle={Math.PI / 2}
      />
    </group>
  );
};

const SortingVisualization3D = () => {
  const { addWarning } = useWarnings();
  const { isDarkMode } = useTheme();
  const { sortingStates, currentStateIndex, size } = useSorting();
  const currentState = sortingStates[currentStateIndex] || { array: [] };
  const [fps, setFPS] = useState(60);
  const [performanceMode, setPerformanceMode] = useState(false);

  // Monitor FPS and adjust performance settings
  useEffect(() => {
    // Enable performance mode if FPS drops below threshold
    if (fps < 30 && !performanceMode) {
      setPerformanceMode(true);
      addWarning(
        "Performance mode enabled: Reduced visual quality for better performance",
        5000
      );
    } else if (fps > 45 && performanceMode) {
      // Disable performance mode if FPS is good
      setPerformanceMode(false);
    }
  }, [fps, performanceMode, addWarning]);

  useEffect(() => {
    addWarning(
      "Your 2D bars now become 3D buildings. Bar height defines building height.",
      5000
    );
  }, []);

  // Adjust canvas resolution based on performance
  const pixelRatio = useMemo(() => {
    if (performanceMode) {
      return Math.min(window.devicePixelRatio, 1.5);
    }
    return window.devicePixelRatio;
  }, [performanceMode]);

  return (
    <div className="w-full h-full">
      <Canvas
        shadows={!performanceMode}
        camera={{ position: [0, 0, 28], fov: 50 }}
        gl={{
          antialias: !performanceMode,
          powerPreference: "high-performance",
          pixelRatio: pixelRatio,
        }}
        dpr={pixelRatio}
      >
        <FPSMonitor onFPSChange={setFPS} />
        <Suspense fallback={null}>
          <Scene
            currentState={currentState}
            isDarkMode={isDarkMode}
            performanceMode={performanceMode}
            size={size}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload models
useGLTF.preload("/models/floor_new.glb");
useGLTF.preload("/models/base_new.glb");

export default SortingVisualization3D;
