import React, { useEffect, useRef } from 'react';

interface ParticleEffectProps {
  isPlaying: boolean;
  intensity?: 'low' | 'medium' | 'high';
  color?: string;
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({ 
  isPlaying, 
  intensity = 'medium',
  color = '#3b82f6'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying || !containerRef.current) return;

    const container = containerRef.current;
    const particleCount = intensity === 'low' ? 15 : intensity === 'medium' ? 25 : 40;

    // 기존 파티클 제거
    const existingParticles = container.querySelectorAll('.dynamic-particle');
    existingParticles.forEach(particle => particle.remove());

    // 새 파티클 생성
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'dynamic-particle absolute rounded-full pointer-events-none';
      
      // 랜덤 크기와 위치
      const size = Math.random() * 6 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;

      // 스타일 적용
      Object.assign(particle.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        background: `radial-gradient(circle, ${color}, transparent)`,
        animation: `particle-float ${duration}s ease-in-out infinite ${delay}s`,
        boxShadow: `0 0 ${size * 2}px ${color}40`,
      });

      container.appendChild(particle);

      // 파티클 자동 제거
      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, (duration + delay) * 1000);
    }

    // 클린업 함수
    return () => {
      const particles = container.querySelectorAll('.dynamic-particle');
      particles.forEach(particle => particle.remove());
    };
  }, [isPlaying, intensity, color]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleEffect; 