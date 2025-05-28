'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { RuneSelectModal } from '@/components/runes/RuneSelectModal';
import { SelectedRuneDisplay } from '@/components/runes/SelectedRuneDisplay';
import { Rune, EquipmentSlot } from '@/types/rune';

export default function MeasurePage() {
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [selectedRunes, setSelectedRunes] = useState<Record<EquipmentSlot, Rune | null>>({} as Record<EquipmentSlot, Rune | null>);
  const [activeSlot, setActiveSlot] = useState<EquipmentSlot | null>(null);
  const [isRuneModalOpen, setIsRuneModalOpen] = useState(false);
  const equipmentLeft = ['무기', '목걸이', '반지1', '반지2', '', '펫'];
  const equipmentRight = ['엠블렘', '투구', '상의', '하의', '장갑', '신발'];
  const primarySpecs = [
    { label: '공격력', key: 'atk' },
    { label: '강타 강화', key: 'smash' },
    { label: '연타 강화', key: 'rapid' },
    { label: '콤보 강화', key: 'combo' },
    { label: '스킬 위력', key: 'skill' },
    { label: '광역 강화', key: 'aoe' },
    { label: '치명타', key: 'crit' },
    { label: '추가타', key: 'extra' },
    { label: '궁극기', key: 'ult' }
  ];
  const job = ['힐러', '화염술사', '전사', '장궁병', '음유시인', '악사', '수도사', '석궁사수', '사제', '빙결술사', '마법사', '듀얼블레이드', '도적', '댄서', '대검전사', '궁수'];

  // 룬 선택 핸들러
  const handleSelectRune = (rune: Rune) => {
    if (activeSlot) {
      setSelectedRunes(prev => ({
        ...prev,
        [activeSlot]: rune
      }));
      setIsRuneModalOpen(false);
    }
  };

  // 룬 제거 핸들러
  const handleRemoveRune = (slot: EquipmentSlot) => {
    setSelectedRunes(prev => ({
      ...prev,
      [slot]: null
    }));
  };

  // 장비 슬롯 클릭 핸들러
  const handleSlotClick = (slot: EquipmentSlot) => {
    setActiveSlot(slot);
    setIsRuneModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 flex flex-col items-center">
      {/* 상단: 장비 및 직업 선택 (가로 스크롤) */}
      <div className="w-full max-w-7xl mb-6">
        <div className="flex flex-nowrap overflow-x-auto pb-4 gap-4 sm:gap-6 scrollbar-hide">
          {/* 왼쪽 장비 */}
          <div className="flex flex-col items-center space-y-4 min-w-[80px]">
            {equipmentLeft.map((item) => (
              <Button
                key={item}
                variant={selectedRunes[item as EquipmentSlot] ? "default" : "outline"}
                disabled={!item}
                className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex flex-col items-center justify-center gap-1 p-0 overflow-hidden ${
                  !item ? 'opacity-50 cursor-not-allowed' : 
                  selectedRunes[item as EquipmentSlot] ? 'border-primary shadow-sm' : 
                  'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => item && handleSlotClick(item as EquipmentSlot)}
              >
                {selectedRunes[item as EquipmentSlot] ? (
                  <SelectedRuneDisplay 
                    rune={selectedRunes[item as EquipmentSlot]!} 
                    onRemove={() => handleRemoveRune(item as EquipmentSlot)} 
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full p-1">
                    <Plus className="h-4 w-4 sm:h-6 sm:w-6" />
                    <span className="text-[10px] sm:text-xs mt-1">{item}</span>
                  </div>
                )}
              </Button>
            ))}
          </div>

          {/* 직업 선택 */}
          <div className="flex flex-col items-center space-y-4 w-[140px] sm:w-[160px] flex-shrink">
            <select 
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="w-full h-12 px-4 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">직업 선택</option>
              {job.map((jobName) => (
                <option key={jobName} value={jobName}>
                  {jobName}
                </option>
              ))}
            </select>
            <div className="w-full h-64 sm:h-80 bg-card rounded-2xl border border-border flex items-center justify-center overflow-hidden">
              {selectedJob ? (
                <img 
                  src={`/images/job/${selectedJob}.png`} 
                  alt={selectedJob}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Plus className="text-muted-foreground" size={48} />
              )}
            </div>
          </div>

          {/* 오른쪽 장비 */}
          <div className="flex flex-col items-center space-y-4 w-[80px]">
            {equipmentRight.map((item) => (
              <Button
                key={item}
                variant={selectedRunes[item as EquipmentSlot] ? "default" : "outline"}
                className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex flex-col items-center justify-center gap-1 p-0 overflow-hidden ${
                  selectedRunes[item as EquipmentSlot] ? 'border-primary shadow-sm' : 
                  'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => handleSlotClick(item as EquipmentSlot)}
              >
                {selectedRunes[item as EquipmentSlot] ? (
                  <SelectedRuneDisplay 
                    rune={selectedRunes[item as EquipmentSlot]!} 
                    onRemove={() => handleRemoveRune(item as EquipmentSlot)} 
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full p-1">
                    <Plus className="h-4 w-4 sm:h-6 sm:w-6" />
                    <span className="text-[10px] sm:text-xs mt-1">{item}</span>
                  </div>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* 하단: 스탯 입력 */}
      <div className="w-full max-w-7xl">
        <Card className="border-border">
          <CardHeader className="bg-card border-b border-border p-3">
            <h2 className="text-sm font-medium">스펙 입력</h2>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
            {primarySpecs.map(({ label, key }) => (
              <div key={key} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="text-xs text-muted-foreground">{label}</span>
                <Input id={key} type="number" placeholder="0" className="w-full sm:w-24 h-8 text-sm" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 룬 선택 모달 */}
      <RuneSelectModal 
        isOpen={isRuneModalOpen} 
        onClose={() => setIsRuneModalOpen(false)} 
        slot={activeSlot}
        onSelectRune={handleSelectRune}
      />
    </div>
  );
}