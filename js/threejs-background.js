/**
 * Three.js Background Animation
 * Subtle geometric particles for hero section
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

(function () {
    'use strict';

    // Configuration
    const config = {
        particleCount: 50,
        particleSize: 0.05,
        animationSpeed: 0.0005,
        mouseInfluence: 0.5,
        colors: {
            light: 0xd4a574, // Warm amber
            dark: 0x5a7a5a,  // Deep sage
        }
    };

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        console.log('Three.js animation disabled: user prefers reduced motion');
        return;
    }

    // Get hero container
    const heroSection = document.querySelector('.hero');
    if (!heroSection) {
        console.warn('Hero section not found, skipping Three.js animation');
        return;
    }

    // Create canvas container
    const canvasContainer = document.createElement('div');
    canvasContainer.className = 'hero__canvas';
    canvasContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.6;
    pointer-events: none;
  `;
    heroSection.insertBefore(canvasContainer, heroSection.firstChild);

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    // Get current theme color
    const getCurrentThemeColor = () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        return isDark ? config.colors.dark : config.colors.light;
    };

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = config.particleCount;

    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;

        // Random position
        positions[i3] = (Math.random() - 0.5) * 10;
        positions[i3 + 1] = (Math.random() - 0.5) * 10;
        positions[i3 + 2] = (Math.random() - 0.5) * 5;

        // Random velocity
        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material
    const particlesMaterial = new THREE.PointsMaterial({
        color: getCurrentThemeColor(),
        size: config.particleSize,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create connecting lines
    const linesGeometry = new THREE.BufferGeometry();
    const linesMaterial = new THREE.LineBasicMaterial({
        color: getCurrentThemeColor(),
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    let mouseTarget = new THREE.Vector2();

    window.addEventListener('mousemove', (event) => {
        mouseTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseTarget.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Update theme color when theme changes
    const updateThemeColor = () => {
        const newColor = getCurrentThemeColor();
        particlesMaterial.color.setHex(newColor);
        linesMaterial.color.setHex(newColor);
    };

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                updateThemeColor();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // Animation loop
    const clock = new THREE.Clock();

    function animate() {
        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();

        // Smooth mouse movement
        mouse.x += (mouseTarget.x - mouse.x) * 0.05;
        mouse.y += (mouseTarget.y - mouse.y) * 0.05;

        // Update particle positions
        const positions = particlesGeometry.attributes.position.array;

        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;

            // Apply velocity
            positions[i3] += velocities[i3];
            positions[i3 + 1] += velocities[i3 + 1];
            positions[i3 + 2] += velocities[i3 + 2];

            // Mouse influence
            const dx = mouse.x * 5 - positions[i3];
            const dy = mouse.y * 5 - positions[i3 + 1];
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 2) {
                positions[i3] += dx * config.mouseInfluence * delta;
                positions[i3 + 1] += dy * config.mouseInfluence * delta;
            }

            // Boundary check - wrap around
            if (Math.abs(positions[i3]) > 5) positions[i3] *= -1;
            if (Math.abs(positions[i3 + 1]) > 5) positions[i3 + 1] *= -1;
            if (Math.abs(positions[i3 + 2]) > 2.5) positions[i3 + 2] *= -1;
        }

        particlesGeometry.attributes.position.needsUpdate = true;

        // Update connecting lines
        const linePositions = [];
        const maxDistance = 1.5;

        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            const x1 = positions[i3];
            const y1 = positions[i3 + 1];
            const z1 = positions[i3 + 2];

            for (let j = i + 1; j < particlesCount; j++) {
                const j3 = j * 3;
                const x2 = positions[j3];
                const y2 = positions[j3 + 1];
                const z2 = positions[j3 + 2];

                const dx = x2 - x1;
                const dy = y2 - y1;
                const dz = z2 - z1;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (distance < maxDistance) {
                    linePositions.push(x1, y1, z1);
                    linePositions.push(x2, y2, z2);
                }
            }
        }

        linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

        // Gentle rotation
        particles.rotation.y = elapsed * config.animationSpeed;
        lines.rotation.y = elapsed * config.animationSpeed;

        // Render
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        observer.disconnect();
        renderer.dispose();
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        linesGeometry.dispose();
        linesMaterial.dispose();
    });

    console.log('✅ Three.js background animation initialized');
})();
