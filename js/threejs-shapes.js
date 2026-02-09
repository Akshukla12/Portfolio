/**
 * Three.js Floating Shapes Animation
 * Abstract geometric shapes floating in sections
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

(function () {
    'use strict';

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        console.log('Floating shapes animation disabled: user prefers reduced motion');
        return;
    }

    // Target sections
    const sections = [
        { selector: '.about', shapeCount: 3 },
        { selector: '.projects', shapeCount: 4 },
    ];

    // Get current theme colors
    const getCurrentColors = () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        return {
            primary: isDark ? 0x5a7a5a : 0xd4a574,  // Sage : Amber
            secondary: isDark ? 0x9b7653 : 0x6b8e6b, // Terracotta : Light Sage
            accent: isDark ? 0x8b7355 : 0xc9a66b,    // Warm : Light Amber
        };
    };

    sections.forEach(({ selector, shapeCount }) => {
        const section = document.querySelector(selector);
        if (!section) return;

        // Create canvas container
        const canvasContainer = document.createElement('div');
        canvasContainer.className = 'section__3d-shapes';
        canvasContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0.15;
      z-index: 0;
      overflow: hidden;
    `;

        section.style.position = 'relative';
        section.insertBefore(canvasContainer, section.firstChild);

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

        // Create shapes
        const shapes = [];
        const colors = getCurrentColors();
        const colorArray = [colors.primary, colors.secondary, colors.accent];

        for (let i = 0; i < shapeCount; i++) {
            // Random geometry
            const geometryTypes = [
                new THREE.TorusGeometry(0.8, 0.3, 16, 32),
                new THREE.OctahedronGeometry(1),
                new THREE.IcosahedronGeometry(0.8),
                new THREE.TetrahedronGeometry(1),
                new THREE.TorusKnotGeometry(0.6, 0.2, 64, 8),
            ];

            const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];

            // Material
            const material = new THREE.MeshBasicMaterial({
                color: colorArray[i % colorArray.length],
                wireframe: true,
                transparent: true,
                opacity: 0.6,
            });

            const mesh = new THREE.Mesh(geometry, material);

            // Random position
            mesh.position.x = (Math.random() - 0.5) * 10;
            mesh.position.y = (Math.random() - 0.5) * 8;
            mesh.position.z = (Math.random() - 0.5) * 5;

            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;

            // Store velocity
            mesh.userData.velocity = {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                rotation: (Math.random() - 0.5) * 0.02,
            };

            scene.add(mesh);
            shapes.push(mesh);
        }

        // Visibility tracking
        let isVisible = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
            });
        }, { threshold: 0.1 });

        observer.observe(section);

        // Theme change observer
        const themeObserver = new MutationObserver(() => {
            const newColors = getCurrentColors();
            const newColorArray = [newColors.primary, newColors.secondary, newColors.accent];
            shapes.forEach((shape, i) => {
                shape.material.color.setHex(newColorArray[i % newColorArray.length]);
            });
        });

        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Animation loop
        const clock = new THREE.Clock();

        function animate() {
            if (isVisible) {
                const delta = clock.getDelta();

                shapes.forEach(shape => {
                    // Move shapes
                    shape.position.x += shape.userData.velocity.x;
                    shape.position.y += shape.userData.velocity.y;

                    // Rotate shapes
                    shape.rotation.x += shape.userData.velocity.rotation;
                    shape.rotation.y += shape.userData.velocity.rotation * 1.5;

                    // Boundary wrapping
                    if (Math.abs(shape.position.x) > 6) {
                        shape.position.x *= -0.9;
                        shape.userData.velocity.x *= -1;
                    }
                    if (Math.abs(shape.position.y) > 4) {
                        shape.position.y *= -0.9;
                        shape.userData.velocity.y *= -1;
                    }
                });

                renderer.render(scene, camera);
            }

            requestAnimationFrame(animate);
        }

        animate();

        // Cleanup
        window.addEventListener('beforeunload', () => {
            observer.disconnect();
            themeObserver.disconnect();
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            shapes.forEach(shape => {
                shape.geometry.dispose();
                shape.material.dispose();
            });
        });
    });

    console.log('✅ Floating shapes animations initialized');
})();
