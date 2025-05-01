"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const createCustomShape = (type) => {
  switch (type) {
    case "star":
      const starShape = new THREE.Shape();
      const points = 5;
      const outerRadius = 0.5;
      const innerRadius = 0.2;

      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i / (points * 2)) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        i === 0 ? starShape.moveTo(x, y) : starShape.lineTo(x, y);
      }
      return new THREE.ShapeGeometry(starShape);

    case "triangle":
      const triangleGeometry = new THREE.BufferGeometry();
      const triangleVertices = new Float32Array([
        0.0,
        0.5,
        0.0, // top
        -0.5,
        -0.5,
        0.0, // bottom left
        0.5,
        -0.5,
        0.0, // bottom right
      ]);
      triangleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(triangleVertices, 3)
      );
      return triangleGeometry;

    case "diamond":
      const diamondGeometry = new THREE.BufferGeometry();
      const diamondVertices = new Float32Array([
        0.0,
        0.5,
        0.0, // top
        0.5,
        0.0,
        0.0, // right
        0.0,
        -0.5,
        0.0, // bottom
        -0.5,
        0.0,
        0.0, // left
      ]);
      diamondGeometry.setIndex([0, 1, 2, 2, 3, 0]);
      diamondGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(diamondVertices, 3)
      );
      return diamondGeometry;

    case "cross":
      const crossShape = new THREE.Shape();
      crossShape.moveTo(-0.2, 0.5);
      crossShape.lineTo(0.2, 0.5);
      crossShape.lineTo(0.2, 0.2);
      crossShape.lineTo(0.5, 0.2);
      crossShape.lineTo(0.5, -0.2);
      crossShape.lineTo(0.2, -0.2);
      crossShape.lineTo(0.2, -0.5);
      crossShape.lineTo(-0.2, -0.5);
      crossShape.lineTo(-0.2, -0.2);
      crossShape.lineTo(-0.5, -0.2);
      crossShape.lineTo(-0.5, 0.2);
      crossShape.lineTo(-0.2, 0.2);
      crossShape.lineTo(-0.2, 0.5);
      return new THREE.ShapeGeometry(crossShape);

    default:
      return new THREE.CircleGeometry(0.5, 32);
  }
};

export default function AboutMe() {
  const mountRef = useRef(null);
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    // Get the total page height including scrollable content
    const updateCanvasSize = () => {
      const height = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      setPageHeight(height);
      renderer.setSize(window.innerWidth, height);
      camera.aspect = window.innerWidth / height;
      camera.updateProjectionMatrix();
    };

    // Initial setup
    updateCanvasSize();
    renderer.setClearColor(0x000000, 0.1);
    mountRef.current.appendChild(renderer.domElement);

    // Camera position
    camera.position.z = 15;

    // Create multiple star layers with adjusted parameters
    const starLayers = [
      {
        count: 2000,
        size: 0.1,
        color: 0xffffff,
        speed: 0.0005,
        distance: 50,
        shape: "circle",
      },
      {
        count: 1500,
        size: 0.15,
        color: 0xccccff,
        speed: 0.001,
        distance: 40,
        shape: "star",
      },
      {
        count: 2000,
        size: 0.2,
        color: 0x9999ff,
        speed: 0.002,
        distance: 30,
        shape: "triangle",
      },
    ];

    const starGroups = [];

    starLayers.forEach((layer) => {
      const stars = new THREE.Group();

      for (let i = 0; i < layer.count; i++) {
        const geometry = createCustomShape(layer.shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: Math.random() * 0.5 + 0.5,
          side: THREE.DoubleSide,
        });

        const star = new THREE.Mesh(geometry, material);

        // Random position
        star.position.x = (Math.random() - 0.5) * 2 * layer.distance;
        star.position.y = (Math.random() - 0.5) * 2 * layer.distance;
        star.position.z = (Math.random() - 0.5) * 2 * layer.distance;

        // Random rotation
        star.rotation.x = Math.random() * Math.PI;
        star.rotation.y = Math.random() * Math.PI;

        // Random scale
        const scale = Math.random() * layer.size + layer.size * 0.5;
        star.scale.set(scale, scale, scale);

        stars.add(star);
      }

      scene.add(stars);
      starGroups.push({
        group: stars,
        speed: layer.speed,
        rotationAxis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize(),
      });
    });

    // Handle window resize and content changes
    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener("resize", handleResize);

    // Create a ResizeObserver to detect content changes
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(document.body);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Update star positions relative to scroll
      const scrollY = window.scrollY;
      starGroups.forEach((item, index) => {
        item.group.rotation.x += item.speed;
        item.group.rotation.y += item.speed * 0.5;
        // Add subtle parallax effect
        item.group.position.y = scrollY * 0.0001 * (index + 1);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Three.js canvas */}
      <div
        ref={mountRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ background: "transparent" }}
      />

      {/* Content container */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto bg-black bg-opacity-70 p-8 rounded-lg border border-indigo-500 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start mb-8">
            <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-indigo-400 shadow-lg">
                <img
                  src="/api/placeholder/200/200"
                  alt="Nihar Singla"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:w-2/3 md:pl-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                Nihar Singla
              </h1>
              <h2 className="text-xl text-indigo-400 mb-4">
                Full Stack Developer & Algorithm Enthusiast
              </h2>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 bg-indigo-900 text-indigo-200 rounded-full text-sm">
                  JavaScript
                </span>
                <span className="px-3 py-1 bg-indigo-900 text-indigo-200 rounded-full text-sm">
                  React
                </span>
                <span className="px-3 py-1 bg-indigo-900 text-indigo-200 rounded-full text-sm">
                  Next.js
                </span>
                <span className="px-3 py-1 bg-indigo-900 text-indigo-200 rounded-full text-sm">
                  Algorithms
                </span>
                <span className="px-3 py-1 bg-indigo-900 text-indigo-200 rounded-full text-sm">
                  Data Structures
                </span>
                <span className="px-3 py-1 bg-indigo-900 text-indigo-200 rounded-full text-sm">
                  Web Development
                </span>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/nihar-singla001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
                >
                  LinkedIn
                </a>
                <a
                  href="https://algoplayground.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition duration-300"
                >
                  AlgoPlayground
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-8 text-gray-100">
            <section>
              <h3 className="text-2xl font-semibold text-indigo-400 mb-4">
                About Me
              </h3>
              <p className="mb-4">
                I'm a passionate full-stack developer with a deep interest in
                algorithms and data structures. My journey in software
                development has been driven by a desire to create intuitive,
                efficient, and impactful solutions that make complex concepts
                accessible to everyone.
              </p>
              <p>
                With expertise in modern web technologies like React and
                Next.js, I enjoy building interactive web applications that
                provide exceptional user experiences. My academic background and
                continued learning in computer science principles enable me to
                approach problems with both creativity and technical rigor.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-indigo-400 mb-4">
                AlgoPlayground
              </h3>
              <p className="mb-4">
                AlgoPlayground is my flagship project—an interactive platform
                designed to make learning algorithms and data structures
                intuitive and engaging. The project reflects my belief that
                complex computer science concepts can be understood more easily
                through visual and interactive learning.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-indigo-800 hover:border-indigo-400 transition-all duration-300">
                  <h4 className="text-xl font-medium text-indigo-300 mb-3">
                    Algorithm Categories
                  </h4>
                  <p className="text-gray-300">
                    Explore a comprehensive collection of algorithms categorized
                    by type and difficulty level.
                  </p>
                  <a
                    href="https://algoplayground.vercel.app/category"
                    className="inline-block mt-4 text-indigo-400 hover:text-indigo-300"
                  >
                    Explore Categories →
                  </a>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 border border-indigo-800 hover:border-indigo-400 transition-all duration-300">
                  <h4 className="text-xl font-medium text-indigo-300 mb-3">
                    AlgoMentor
                  </h4>
                  <p className="text-gray-300">
                    Get personalized guidance and practice recommendations based
                    on your skill level and learning goals.
                  </p>
                  <a
                    href="https://algoplayground.vercel.app/AlgoMentor"
                    className="inline-block mt-4 text-indigo-400 hover:text-indigo-300"
                  >
                    Try AlgoMentor →
                  </a>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 border border-indigo-800 hover:border-indigo-400 transition-all duration-300">
                  <h4 className="text-xl font-medium text-indigo-300 mb-3">
                    Interactive Learning
                  </h4>
                  <p className="text-gray-300">
                    Visualize algorithm execution, step through code, and
                    understand complex concepts through interactive examples.
                  </p>
                  <a
                    href="https://algoplayground.vercel.app"
                    className="inline-block mt-4 text-indigo-400 hover:text-indigo-300"
                  >
                    Start Learning →
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-indigo-400 mb-4">
                Skills & Expertise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-medium text-indigo-300 mb-3">
                    Technical Skills
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      • Frontend: React, Next.js, JavaScript, HTML5, CSS3,
                      Tailwind CSS
                    </li>
                    <li>• Backend: Node.js, Express, RESTful APIs</li>
                    <li>• Database: MongoDB, SQL</li>
                    <li>• Data Structures & Algorithms</li>
                    <li>• Version Control: Git, GitHub</li>
                    <li>• Interactive Visualizations & Animations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-indigo-300 mb-3">
                    Areas of Interest
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Algorithm Optimization</li>
                    <li>• Educational Technology</li>
                    <li>• Interactive Learning Platforms</li>
                    <li>• Data Visualization</li>
                    <li>• Computer Science Education</li>
                    <li>• Web Application Development</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-indigo-400 mb-4">
                My Mission
              </h3>
              <p className="mb-4">
                I believe in democratizing knowledge and making complex
                technical concepts accessible to everyone. Through projects like
                AlgoPlayground, I aim to create educational tools that break
                down barriers to learning and help aspiring developers build
                strong foundations in computer science.
              </p>
              <p>
                My goal is to continue developing innovative solutions that
                combine technical excellence with user-centered design, creating
                experiences that are both powerful and intuitive.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-indigo-400 mb-4">
                Get In Touch
              </h3>
              <p className="mb-6">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision. Feel free to reach out
                through LinkedIn or visit AlgoPlayground to see my work in
                action.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.linkedin.com/in/nihar-singla001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://algoplayground.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  AlgoPlayground
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
