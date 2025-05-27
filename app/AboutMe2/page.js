"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Image from "next/image";
import Link from "next/link";

export default function AboutAlgoPlayground() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Three.js setup for starfield background
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Camera position
    camera.position.z = 5;

    // Create multiple star layers with different colors and behaviors
    const starLayers = [
      { count: 300, size: 0.05, color: 0xffffff, speed: 0.0003, distance: 30 },
      { count: 200, size: 0.08, color: 0x88ccff, speed: 0.0007, distance: 25 },
      { count: 150, size: 0.1, color: 0xffaacc, speed: 0.001, distance: 20 },
      { count: 100, size: 0.15, color: 0xaaffff, speed: 0.002, distance: 15 },
    ];

    const starGroups = [];

    starLayers.forEach((layer) => {
      const stars = new THREE.Group();
      const geometry = new THREE.BufferGeometry();
      const vertices = [];

      for (let i = 0; i < layer.count; i++) {
        const x = (Math.random() - 0.5) * 2 * layer.distance;
        const y = (Math.random() - 0.5) * 2 * layer.distance;
        const z = (Math.random() - 0.5) * 2 * layer.distance;
        vertices.push(x, y, z);
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      const material = new THREE.PointsMaterial({
        size: layer.size,
        color: layer.color,
        transparent: true,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
      });

      const starField = new THREE.Points(geometry, material);
      stars.add(starField);
      scene.add(stars);
      starGroups.push({ group: stars, speed: layer.speed });
    });

    // Add some larger, brighter stars
    const brightStarGeometry = new THREE.BufferGeometry();
    const brightStarVertices = [];
    const brightStarColors = [];

    const brightStarColorOptions = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xffeedd),
      new THREE.Color(0xddeeff),
      new THREE.Color(0xaaffff),
    ];

    for (let i = 0; i < 50; i++) {
      const x = (Math.random() - 0.5) * 2 * 20;
      const y = (Math.random() - 0.5) * 2 * 20;
      const z = (Math.random() - 0.5) * 2 * 20;
      brightStarVertices.push(x, y, z);

      const color =
        brightStarColorOptions[
          Math.floor(Math.random() * brightStarColorOptions.length)
        ];
      brightStarColors.push(color.r, color.g, color.b);
    }

    brightStarGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(brightStarVertices, 3)
    );
    brightStarGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(brightStarColors, 3)
    );

    const brightStarMaterial = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const brightStars = new THREE.Points(
      brightStarGeometry,
      brightStarMaterial
    );
    scene.add(brightStars);

    // Create a subtle glow effect in the center
    const glowGeometry = new THREE.SphereGeometry(2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x0033aa,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate star layers at different speeds
      starGroups.forEach((item) => {
        item.group.rotation.x += item.speed;
        item.group.rotation.y += item.speed * 0.7;
      });

      // Pulse the glow effect
      const time = Date.now() * 0.001;
      glow.scale.set(
        1 + 0.1 * Math.sin(time * 0.5),
        1 + 0.1 * Math.sin(time * 0.5),
        1 + 0.1 * Math.sin(time * 0.5)
      );

      // Slowly rotate bright stars in the opposite direction
      brightStars.rotation.x -= 0.0001;
      brightStars.rotation.y -= 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-blue-900 via-purple-900 to-black overflow-hidden">
      {/* Three.js canvas */}
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />

      {/* Content container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero section */}
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="inline-block mb-8 relative">
              <h1 className="text-6xl font-bold text-white mb-2 relative z-10">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  AlgoPlayground
                </span>
              </h1>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-20 blur-lg -z-10"></div>
            </div>

            <h2 className="text-2xl text-blue-200 font-light max-w-3xl mb-8">
              Explore the universe of algorithms through interactive
              visualizations, guided learning, and hands-on practice
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href="/category"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Categories
              </a>
              <a
                href="/AlgoMentor"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Try AlgoMentor
              </a>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30 shadow-xl mb-8">
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <svg
                    className="w-8 h-8 mr-3 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    ></path>
                  </svg>
                  Our Mission
                </h3>
                <p className="text-lg text-blue-100 mb-4">
                  AlgoPlayground was born from a passion for demystifying
                  algorithms and data structures. We believe that understanding
                  these fundamental concepts should be accessible to everyone,
                  regardless of their background or learning style.
                </p>
                <p className="text-lg text-blue-100 mb-4">
                  Our interactive platform transforms abstract algorithmic
                  concepts into visual, tactile experiences that make learning
                  intuitive and engaging. By seeing algorithms in action,
                  understanding their inner workings becomes natural and
                  memorable.
                </p>
                <p className="text-lg text-blue-100">
                  Whether you&apos;re a computer science student, a coding
                  bootcamp graduate, or a seasoned developer brushing up on
                  fundamentals, AlgoPlayground offers a space to explore,
                  experiment, and grow your algorithmic thinking.
                </p>
              </div>

              <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30 shadow-xl">
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <svg
                    className="w-8 h-8 mr-3 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    ></path>
                  </svg>
                  What Makes Us Different
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-700/30">
                    <h4 className="text-xl font-semibold text-blue-300 mb-3">
                      Interactive Visualizations
                    </h4>
                    <p className="text-blue-100">
                      Watch algorithms unfold step by step with our dynamic
                      visualizations that bring abstract concepts to life,
                      making them easier to understand and remember.
                    </p>
                  </div>

                  <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/30">
                    <h4 className="text-xl font-semibold text-purple-300 mb-3">
                      Personalized Learning Path
                    </h4>
                    <p className="text-purple-100">
                      AlgoMentor analyzes your progress and adapts to your
                      learning style, creating a customized journey through
                      algorithms based on your strengths and areas for growth.
                    </p>
                  </div>

                  <div className="bg-indigo-900/30 p-6 rounded-xl border border-indigo-700/30">
                    <h4 className="text-xl font-semibold text-indigo-300 mb-3">
                      Comprehensive Library
                    </h4>
                    <p className="text-indigo-100">
                      From sorting to graph algorithms, our extensive collection
                      covers essential techniques categorized by type,
                      application, and difficulty level.
                    </p>
                  </div>

                  <div className="bg-pink-900/30 p-6 rounded-xl border border-pink-700/30">
                    <h4 className="text-xl font-semibold text-pink-300 mb-3">
                      Hands-On Practice
                    </h4>
                    <p className="text-pink-100">
                      Apply what you&apos;ve learned through interactive coding
                      exercises and real-world problem-solving challenges that
                      reinforce your understanding.
                    </p>
                  </div>
                </div>

                <p className="text-lg text-blue-200 italic">
                  &quot;AlgoPlayground transforms the way algorithms are taught
                  and learned, making the complex accessible through visual,
                  interactive experiences.&quot;
                </p>
              </div>
            </div>

            <div className="md:col-span-4 space-y-8">
              <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-2xl p-6 border border-indigo-500/30 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  Created By
                </h3>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-400">
                      <Image
                        src="/api/placeholder/64/64"
                        alt="Nihar Singla"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-white">
                      Nihar Singla
                    </h4>
                    <p className="text-indigo-300">Founder & Lead Developer</p>
                  </div>
                </div>

                <p className="text-blue-100 mb-4">
                  Algorithm enthusiast and full-stack developer with a passion
                  for creating educational tools that make complex concepts
                  accessible to everyone.
                </p>

                <a
                  href="https://www.linkedin.com/in/nihar-singla001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-300 hover:text-indigo-200 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>

              <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                  Key Features
                </h3>

                <ul className="space-y-3 text-blue-100">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Step-by-step algorithm visualization
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Categorized algorithm library
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    AlgoMentor personal guidance
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Interactive code playgrounds
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Progress tracking
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Algorithm complexity analysis
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-4 text-center">
                  Get Started Today
                </h3>
                <p className="text-blue-100 mb-6 text-center">
                  Begin your journey into the world of algorithms with our
                  interactive learning platform.
                </p>
                <Link
                  href="/"
                  className="block w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition duration-300 text-center transform hover:scale-105 shadow-lg"
                >
                  Explore AlgoPlayground
                </Link>
              </div>
            </div>
          </div>

          {/* Testimonials/Features */}
          <div className="mt-16 px-4">
            <h3 className="text-3xl font-bold text-center text-white mb-12 relative">
              <span className="relative z-10">
                The AlgoPlayground Experience
              </span>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl -z-10 rounded-full"></div>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-blue-800/30 shadow-lg transform transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-6">
                  <svg
                    className="w-16 h-16 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-center text-blue-300 mb-3">
                  Visual Learning
                </h4>
                <p className="text-blue-100 text-center">
                  Watch algorithms in action with dynamic visualizations that
                  make complex concepts clearer and more intuitive.
                </p>
              </div>

              <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-purple-800/30 shadow-lg transform transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-6">
                  <svg
                    className="w-16 h-16 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-center text-purple-300 mb-3">
                  Comprehensive Library
                </h4>
                <p className="text-purple-100 text-center">
                  Access a vast collection of algorithms organized by category,
                  difficulty, and application domain.
                </p>
              </div>

              <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-pink-800/30 shadow-lg transform transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-6">
                  <svg
                    className="w-16 h-16 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-center text-pink-300 mb-3">
                  Personal Guidance
                </h4>
                <p className="text-pink-100 text-center">
                  Get tailored learning recommendations from AlgoMentor based on
                  your progress, interests, and goals.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-20 py-8 border-t border-blue-800/30 text-center">
            <p className="text-blue-300 mb-2">
              AlgoPlayground — Making algorithm learning interactive, intuitive,
              and inclusive
            </p>
            <p className="text-blue-400">
              Created by{" "}
              <a
                href="https://www.linkedin.com/in/nihar-singla001"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-white transition-colors"
              >
                Nihar Singla
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
