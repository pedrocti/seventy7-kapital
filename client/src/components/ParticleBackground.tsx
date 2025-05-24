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
    
    // Clear existing canvas if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    container.appendChild(renderer.domElement);
    
    // Create flying stars particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = window.innerWidth < 768 ? 1500 : 3000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 20; // x
      posArray[i + 1] = (Math.random() - 0.5) * 20; // y
      posArray[i + 2] = (Math.random() - 0.5) * 20; // z
      
      // Velocity for falling effect
      velocityArray[i] = (Math.random() - 0.5) * 0.02; // x velocity
      velocityArray[i + 1] = -Math.random() * 0.03 - 0.01; // y velocity (falling)
      velocityArray[i + 2] = (Math.random() - 0.5) * 0.02; // z velocity
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Enhanced materials for better visibility
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x0AEFFF, // Bright teal color
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true
    });
    
    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    function onMouseMove(event: MouseEvent) {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    
    window.addEventListener('mousemove', onMouseMove);
    
    // Handle resize
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
      
      // Get particles position array for falling animation
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      
      // Animate falling particles
      for (let i = 0; i < particlesCount * 3; i += 3) {
        // Apply velocities
        positions[i] += velocityArray[i]; // x movement
        positions[i + 1] += velocityArray[i + 1]; // y movement (falling)
        positions[i + 2] += velocityArray[i + 2]; // z movement
        
        // Reset particles that fall too far
        if (positions[i + 1] < -10) {
          positions[i] = (Math.random() - 0.5) * 20;
          positions[i + 1] = 10;
          positions[i + 2] = (Math.random() - 0.5) * 20;
        }
        
        // Reset particles that drift too far horizontally
        if (Math.abs(positions[i]) > 10) {
          positions[i] = (Math.random() - 0.5) * 20;
        }
        if (Math.abs(positions[i + 2]) > 10) {
          positions[i + 2] = (Math.random() - 0.5) * 20;
        }
      }
      
      // Update geometry
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Rotate entire particle system for flying effect
      particlesMesh.rotation.x = elapsedTime * 0.02;
      particlesMesh.rotation.y = elapsedTime * 0.01;
      
      // Add gentle floating motion
      particlesMesh.position.y = Math.sin(elapsedTime * 0.1) * 0.2;
      
      // Mouse interaction for flying stars
      if (mouseX !== 0 || mouseY !== 0) {
        particlesMesh.rotation.x += mouseY * 0.0002;
        particlesMesh.rotation.y += mouseX * 0.0002;
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
