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
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = window.innerWidth < 768 ? 1000 : 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: 0x0AEFFF, // Teal color
      transparent: true,
      opacity: 0.8
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
      
      // Rotate particles continually regardless of mouse movement
      particlesMesh.rotation.x = elapsedTime * 0.05;
      particlesMesh.rotation.y = elapsedTime * 0.03;
      
      // Add slight wave motion
      particlesMesh.position.y = Math.sin(elapsedTime * 0.2) * 0.1;
      
      // Follow mouse with subtle movement if available
      if (mouseX !== 0 || mouseY !== 0) {
        particlesMesh.rotation.x += mouseY * 0.0003;
        particlesMesh.rotation.y += mouseX * 0.0003;
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
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticleBackground;
