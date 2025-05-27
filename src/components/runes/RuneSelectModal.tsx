'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Rune, EquipmentSlot, categoryToSlotMap } from '@/types/rune';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RuneSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: EquipmentSlot | null;
  onSelectRune: (rune: Rune) => void;
}

export function RuneSelectModal({ isOpen, onClose, slot, onSelectRune }: RuneSelectModalProps) {
  const [runes, setRunes] = useState<Rune[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRunes, setFilteredRunes] = useState<Rune[]>([]);

  // 슬롯에 맞는 카테고리 찾기
  const findCategoryForSlot = (slot: EquipmentSlot | null): string | null => {
    if (!slot) return null;
    
    for (const [category, slots] of Object.entries(categoryToSlotMap)) {
      if (slots.includes(slot)) {
        return category;
      }
    }
    return null;
  };

  // 룬 데이터 가져오기
  useEffect(() => {
    const fetchRunes = async () => {
      if (!isOpen || !slot) return;

      setLoading(true);
      try {
        const category = findCategoryForSlot(slot);
        const queryParam = category ? `?category=${category}` : '';
        const response = await fetch(`/api/runes${queryParam}`);
        
        if (!response.ok) {
          throw new Error('서버에서 데이터를 가져오는데 실패했습니다.');
        }
        
        const result = await response.json();
        setRunes(result.data || []);
        setFilteredRunes(result.data || []);
      } catch (error) {
        console.error('룬 데이터 로딩 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRunes();
  }, [isOpen, slot]);

  // 검색어에 따른 필터링
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredRunes(runes);
      return;
    }

    const filtered = runes.filter(rune => 
      rune.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rune.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredRunes(filtered);
  }, [searchQuery, runes]);

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-visible flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{slot ? `${slot} 룬 선택` : '룬 선택'}</DialogTitle>
        </DialogHeader>
        
        <div className="mb-3 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="룬 이름 또는 효과 검색" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9"
          />
        </div>
        
        <ScrollArea className="flex-1 pr-4 h-[calc(80vh-150px)] overflow-auto">
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-muted/10 rounded-full"></div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredRunes.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-muted-foreground">검색 결과가 없습니다</p>
            </div>
          ) : (
            <div className="space-y-3 pr-2 min-h-[200px]">
              {filteredRunes.map((rune) => (
                <TooltipProvider key={rune._id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-full">
                        <Card 
                          className="cursor-pointer hover:bg-accent/30 transition-all duration-200 border-2 border-primary/50 hover:border-primary shadow-sm hover:shadow-md overflow-hidden"
                          onClick={() => onSelectRune(rune)}
                        >
                          <CardContent className="py-0 px-4">
                            <div className="flex flex-col space-y-2">
                              <div className="flex justify-between items-start gap-2">
                                <h3 className="font-bold text-base text-foreground">{rune.name}</h3>
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                  {rune.type}
                                </span>
                              </div>
                              
                              <Badge variant="secondary" className="text-xs w-fit">
                                {rune.effect}
                              </Badge>
                              
                              <div className="text-sm space-y-1 mt-1">
                                {rune.condition && (
                                  <div className="flex items-center gap-1">
                                    <span className="font-medium text-muted-foreground">조건:</span>
                                    <span>{rune.condition}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-4 text-sm">
                                  {rune.cooldown && (
                                    <div className="flex items-center gap-1">
                                      <span className="font-medium text-muted-foreground">쿨다운:</span>
                                      <span>{rune.cooldown}</span>
                                    </div>
                                  )}
                                  {rune.duration && (
                                    <div className="flex items-center gap-1">
                                      <span className="font-medium text-muted-foreground">지속:</span>
                                      <span>{rune.duration}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right"
                      align="start"
                      className="p-4 w-[320px] z-[100] bg-background/95 backdrop-blur-sm shadow-xl border border-border"
                      sideOffset={5}
                      avoidCollisions={true}
                      collisionPadding={20}
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-bold text-lg text-foreground">{rune.name}</h4>
                          <div className="text-sm text-primary font-medium mt-0.5">{rune.type}</div>
                        </div>
                        
                        <Badge variant="secondary" className="text-sm">
                          {rune.effect}
                        </Badge>
                        
                        <div className="space-y-2 text-sm">
                          {rune.condition && (
                            <div className="flex items-start gap-2">
                              <span className="font-medium text-muted-foreground whitespace-nowrap">조건:</span>
                              <span className="text-foreground">{rune.condition}</span>
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-2">
                            {rune.cooldown && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-muted-foreground">쿨다운:</span>
                                <span className="text-foreground">{rune.cooldown}</span>
                              </div>
                            )}
                            {rune.duration && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-muted-foreground">지속시간:</span>
                                <span className="text-foreground">{rune.duration}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          )}
        </ScrollArea>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
