import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 2;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    if (container.children.length > 0) {
      container.removeChild(container.children[0]);
    }
    
    container.appendChild(renderer.domElement);
    
    // Create candlestick particles, dollar signs, and dollar notes
    const candlesticksCount = window.innerWidth < 768 ? 80 : 150;
    const dollarSignsCount = window.innerWidth < 768 ? 40 : 70;
    const dollarNotesCount = window.innerWidth < 768 ? 25 : 50;
    const totalCount = candlesticksCount + dollarSignsCount + dollarNotesCount;
    const allObjects: THREE.Group[] = [];
    const velocityArray = new Float32Array(totalCount * 3);
    
    for (let i = 0; i < candlesticksCount; i++) {
      const candlestickGroup = new THREE.Group();
      
      // Random position
      candlestickGroup.position.x = (Math.random() - 0.5) * 20;
      candlestickGroup.position.y = (Math.random() - 0.5) * 20;
      candlestickGroup.position.z = (Math.random() - 0.5) * 20;
      
      // Determine if bullish (green) or bearish (red)
      const isBullish = Math.random() > 0.5;
      const color = isBullish ? 0x00FF88 : 0xFF4444; // Green or Red
      
      // Create candlestick body (rectangle)
      const bodyGeometry = new THREE.BoxGeometry(0.08, 0.15, 0.02);
      const bodyMaterial = new THREE.MeshBasicMaterial({ 
        color: color, 
        transparent: true, 
        opacity: 0.8 
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      
      // Create candlestick wicks (thin lines)
      const wickGeometry = new THREE.BoxGeometry(0.01, 0.25, 0.01);
      const wickMaterial = new THREE.MeshBasicMaterial({ 
        color: color, 
        transparent: true, 
        opacity: 0.9 
      });
      const topWick = new THREE.Mesh(wickGeometry, wickMaterial);
      const bottomWick = new THREE.Mesh(wickGeometry, wickMaterial);
      
      // Position wicks
      topWick.position.y = 0.12;
      bottomWick.position.y = -0.12;
      
      // Add to group
      candlestickGroup.add(body);
      candlestickGroup.add(topWick);
      candlestickGroup.add(bottomWick);
      
      // Set random rotation
      candlestickGroup.rotation.x = Math.random() * Math.PI;
      candlestickGroup.rotation.y = Math.random() * Math.PI;
      candlestickGroup.rotation.z = Math.random() * Math.PI;
      
      // Store velocity
      velocityArray[i * 3] = (Math.random() - 0.5) * 0.015; // x velocity
      velocityArray[i * 3 + 1] = -Math.random() * 0.02 - 0.008; // y velocity (falling)
      velocityArray[i * 3 + 2] = (Math.random() - 0.5) * 0.015; // z velocity
      
      allObjects.push(candlestickGroup);
      scene.add(candlestickGroup);
    }
    
    // Create dollar sign particles
    for (let i = 0; i < dollarSignsCount; i++) {
      const dollarGroup = new THREE.Group();
      
      // Random position
      dollarGroup.position.x = (Math.random() - 0.5) * 20;
      dollarGroup.position.y = (Math.random() - 0.5) * 20;
      dollarGroup.position.z = (Math.random() - 0.5) * 20;
      
      // White color for dollar signs to differentiate from candlesticks
      const color = 0xFFFFFF; // White
      
      // Create a simple dollar sign shape using basic geometry
      // Create the S shape using two rings
      const topRingGeometry = new THREE.RingGeometry(0.04, 0.07, 8);
      const bottomRingGeometry = new THREE.RingGeometry(0.04, 0.07, 8);
      const dollarMaterial = new THREE.MeshBasicMaterial({ 
        color: color, 
        transparent: true, 
        opacity: 0.85,
        side: THREE.DoubleSide
      });
      
      const topRing = new THREE.Mesh(topRingGeometry, dollarMaterial);
      const bottomRing = new THREE.Mesh(bottomRingGeometry, dollarMaterial);
      
      // Position the rings to form an S shape
      topRing.position.y = 0.05;
      bottomRing.position.y = -0.05;
      
      // Add vertical lines through the center
      const lineGeometry = new THREE.BoxGeometry(0.008, 0.18, 0.008);
      const lineMaterial = new THREE.MeshBasicMaterial({ 
        color: color, 
        transparent: true, 
        opacity: 0.9 
      });
      const line1 = new THREE.Mesh(lineGeometry, lineMaterial);
      const line2 = new THREE.Mesh(lineGeometry, lineMaterial);
      line2.position.x = 0.02;
      
      dollarGroup.add(topRing);
      dollarGroup.add(bottomRing);
      dollarGroup.add(line1);
      dollarGroup.add(line2);
      
      // Set random rotation
      dollarGroup.rotation.x = Math.random() * Math.PI;
      dollarGroup.rotation.y = Math.random() * Math.PI;
      dollarGroup.rotation.z = Math.random() * Math.PI;
      
      // Store velocity for dollar signs
      const dollarIndex = candlesticksCount + i;
      velocityArray[dollarIndex * 3] = (Math.random() - 0.5) * 0.02; // x velocity
      velocityArray[dollarIndex * 3 + 1] = -Math.random() * 0.025 - 0.01; // y velocity (falling)
      velocityArray[dollarIndex * 3 + 2] = (Math.random() - 0.5) * 0.02; // z velocity
      
      allObjects.push(dollarGroup);
      scene.add(dollarGroup);
    }
    
    // Create dollar note particles
    for (let i = 0; i < dollarNotesCount; i++) {
      const noteGroup = new THREE.Group();
      
      // Random position
      noteGroup.position.x = (Math.random() - 0.5) * 20;
      noteGroup.position.y = (Math.random() - 0.5) * 20;
      noteGroup.position.z = (Math.random() - 0.5) * 20;
      
      // Create realistic dollar note (rectangular bill)
      const noteGeometry = new THREE.PlaneGeometry(0.2, 0.12);
      const noteMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xE8F5E8, // Light greenish-white (realistic dollar bill color)
        transparent: true, 
        opacity: 0.85,
        side: THREE.DoubleSide
      });
      const note = new THREE.Mesh(noteGeometry, noteMaterial);
      
      // Add border to the note
      const borderGeometry = new THREE.EdgesGeometry(noteGeometry);
      const borderMaterial = new THREE.LineBasicMaterial({ 
        color: 0x2F5233, // Dark green border
        transparent: true, 
        opacity: 0.9 
      });
      const border = new THREE.LineSegments(borderGeometry, borderMaterial);
      
      // Add small decorative elements (simple rectangles for detail)
      const detailGeometry = new THREE.PlaneGeometry(0.05, 0.03);
      const detailMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x1E4D72, // Blue-green details like real dollar bills
        transparent: true, 
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      const detail1 = new THREE.Mesh(detailGeometry, detailMaterial);
      const detail2 = new THREE.Mesh(detailGeometry, detailMaterial);
      
      detail1.position.set(-0.05, 0.02, 0.001);
      detail2.position.set(0.05, -0.02, 0.001);
      
      noteGroup.add(note);
      noteGroup.add(border);
      noteGroup.add(detail1);
      noteGroup.add(detail2);
      
      // Set random rotation
      noteGroup.rotation.x = Math.random() * Math.PI;
      noteGroup.rotation.y = Math.random() * Math.PI;
      noteGroup.rotation.z = Math.random() * Math.PI;
      
      // Store velocity for dollar notes (slower falling for realistic bill effect)
      const noteIndex = candlesticksCount + dollarSignsCount + i;
      velocityArray[noteIndex * 3] = (Math.random() - 0.5) * 0.01; // x velocity
      velocityArray[noteIndex * 3 + 1] = -Math.random() * 0.015 - 0.005; // y velocity (slower falling)
      velocityArray[noteIndex * 3 + 2] = (Math.random() - 0.5) * 0.01; // z velocity
      
      allObjects.push(noteGroup);
      scene.add(noteGroup);
    }
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    function onMouseMove(event: MouseEvent) {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    
    window.addEventListener('mousemove', onMouseMove);
    
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Animate falling candlesticks and dollar signs
      allObjects.forEach((object, index) => {
        // Apply velocities
        object.position.x += velocityArray[index * 3];
        object.position.y += velocityArray[index * 3 + 1];
        object.position.z += velocityArray[index * 3 + 2];
        
        // Add rotation for flying effect
        object.rotation.x += 0.01;
        object.rotation.y += 0.008;
        object.rotation.z += 0.005;
        
        // Reset objects that fall too far
        if (object.position.y < -10) {
          object.position.x = (Math.random() - 0.5) * 20;
          object.position.y = 10;
          object.position.z = (Math.random() - 0.5) * 20;
          
          // Reset rotation
          object.rotation.x = Math.random() * Math.PI;
          object.rotation.y = Math.random() * Math.PI;
          object.rotation.z = Math.random() * Math.PI;
        }
        
        // Reset objects that drift too far horizontally
        if (Math.abs(object.position.x) > 10) {
          object.position.x = (Math.random() - 0.5) * 20;
        }
        if (Math.abs(object.position.z) > 10) {
          object.position.z = (Math.random() - 0.5) * 20;
        }
      });
      
      // Add gentle floating motion to entire scene
      scene.position.y = Math.sin(elapsedTime * 0.1) * 0.1;
      
      // Mouse interaction effects
      if (mouseX !== 0 || mouseY !== 0) {
        scene.rotation.x += mouseY * 0.0001;
        scene.rotation.y += mouseX * 0.0001;
      }
      
      // Render
      renderer.render(scene, camera);
      
      // Call animate again on the next frame
      window.requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      // Clean up all object geometries
      allObjects.forEach(object => {
        object.children.forEach(child => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (child.material instanceof THREE.Material) {
              child.material.dispose();
            }
          }
        });
      });
      
      renderer.dispose();
      scene.clear();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        pointerEvents: 'none',
        backgroundColor: 'transparent'
      }}
    />
  );
};

export default ParticleBackground;