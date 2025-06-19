import React, { useState } from 'react';

interface MemberAvatarProps {
  name: string;
  imageUrl: string;
  favoriteColor: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const MemberAvatar: React.FC<MemberAvatarProps> = ({ 
  name, 
  imageUrl, 
  favoriteColor, 
  size = 'md', 
  className = '' 
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-20 h-20 text-2xl'
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const generateGradient = (color: string) => {
    // 기본 색상에서 밝은 버전과 어두운 버전을 생성
    const baseColor = color.replace('#', '');
    const r = parseInt(baseColor.substr(0, 2), 16);
    const g = parseInt(baseColor.substr(2, 2), 16);
    const b = parseInt(baseColor.substr(4, 2), 16);
    
    const lighterColor = `rgb(${Math.min(255, r + 30)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 30)})`;
    const darkerColor = `rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`;
    
    return `linear-gradient(135deg, ${lighterColor} 0%, ${color} 50%, ${darkerColor} 100%)`;
  };

  if (!imageError && imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white/20 ${className}`}
        onError={handleImageError}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold text-white border-2 border-white/20 ${className}`}
      style={{ 
        background: generateGradient(favoriteColor),
        boxShadow: `0 4px 12px ${favoriteColor}40`
      }}
    >
      {getInitials(name)}
    </div>
  );
};

export default MemberAvatar; 