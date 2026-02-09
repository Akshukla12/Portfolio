/**
 * Three.js Skill Cards Animation
 * 3D rotating geometric shapes for skill cards
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

(function () {
    'use strict';

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        console.log('Skill card 3D animation disabled: user prefers reduced motion');
        return;
    }

    // Get all skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length === 0) {
        console.warn('No skill cards found, skipping 3D animation');
        return;
    }

    // Get current theme color
    const getCurrentThemeColor = () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        return isDark ? 0x5a7a5a : 0xd4a574; // Sage : Amber
    };

    // Create 3D scene for each skill card
    skillCards.forEach((card, index) => {
        // Create canvas container
        const canvasContainer = document.createElement('div');
        canvasContainer.className = 'skill-card__3d';
        canvasContainer.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      width: 80px;
      height: 80px;
      pointer-events: none;
      opacity: 0.7;
      z-index: 1;
    `;

        // Insert at beginning of card
        card.style.position = 'relative';
        card.insertBefore(canvasContainer, card.firstChild);

        // Scene setup
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
        camera.position.z = 3;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setSize(80, 80);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        canvasContainer.appendChild(renderer.domElement);

        // Create different geometry for each card
        const geometries = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.OctahedronGeometry(0.7),
            new THREE.TetrahedronGeometry(0.8),
            new THREE.IcosahedronGeometry(0.7),
            new THREE.TorusGeometry(0.6, 0.25, 16, 32),
            new THREE.ConeGeometry(0.6, 1.2, 8),
        ];

        const geometry = geometries[index % geometries.length];

        // Material with wireframe
        const material = new THREE.MeshBasicMaterial({
            color: getCurrentThemeColor(),
            wireframe: true,
            transparent: true,
            opacity: 0.8,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Add edges for more definition
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({
            color: getCurrentThemeColor(),
            transparent: true,
            opacity: 0.4,
        });
        const lineSegments = new THREE.LineSegments(edges, lineMaterial);
        scene.add(lineSegments);

        // Animation state
        let isVisible = false;
        let rotationSpeed = 0.005 + (index * 0.001);

        // Intersection Observer for visibility
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
            });
        }, { threshold: 0.1 });

        observer.observe(card);

        // Mouse interaction
        card.addEventListener('mouseenter', () => {
            rotationSpeed *= 2;
        });

        card.addEventListener('mouseleave', () => {
            rotationSpeed /= 2;
        });

        // Theme change observer
        const themeObserver = new MutationObserver(() => {
            const newColor = getCurrentThemeColor();
            material.color.setHex(newColor);
            lineMaterial.color.setHex(newColor);
        });

        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        // Animation loop
        const clock = new THREE.Clock();

        function animate() {
            if (isVisible) {
                const elapsed = clock.getElapsedTime();

                // Rotate mesh
                mesh.rotation.x += rotationSpeed;
                mesh.rotation.y += rotationSpeed * 1.5;
                lineSegments.rotation.x = mesh.rotation.x;
                lineSegments.rotation.y = mesh.rotation.y;

                // Gentle floating
                mesh.position.y = Math.sin(elapsed + index) * 0.1;
                lineSegments.position.y = mesh.position.y;

                renderer.render(scene, camera);
            }

            requestAnimationFrame(animate);
        }

        animate();

        // Cleanup
        window.addEventListener('beforeunload', () => {
            observer.disconnect();
            themeObserver.disconnect();
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            edges.dispose();
            lineMaterial.dispose();
        });
    });

    console.log('✅ Skill card 3D animations initialized');
})();
