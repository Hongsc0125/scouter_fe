'use client';

import { Rune } from '@/types/rune';
import { X } from 'lucide-react';

interface SelectedRuneDisplayProps {
  rune: Rune;
  onRemove: () => void;
}

export function SelectedRuneDisplay({ rune, onRemove }: SelectedRuneDisplayProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center group">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-md group-hover:from-primary/20 group-hover:to-primary/10 transition-all"></div>
      
      {/* 삭제 버튼 - 마우스 오버시에만 표시 */}
      <button
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-background/80 hover:bg-destructive/20 text-destructive z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X size={10} />
      </button>
      
      {/* 룬 이름과 효과 */}
      <div className="z-10 text-center px-1 flex flex-col items-center">
        <div className="font-bold text-xs truncate max-w-full">{rune.name}</div>
      </div>
    </div>
  );
}
