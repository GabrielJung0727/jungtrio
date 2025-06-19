import React, { ReactNode } from 'react';
import { X } from 'lucide-react';

interface SlideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const SlideMenu: React.FC<SlideMenuProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* 배경 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* 슬라이드 메뉴 */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-900 text-white p-6 transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">메뉴</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default SlideMenu; 