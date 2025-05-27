// 룬 데이터 인터페이스
export interface Rune {
  _id: string;
  category: string;
  name: string;
  type: string;
  condition: string;
  cooldown: string;
  duration: string;
  effect: string;
}

// 장비 슬롯 타입
export type EquipmentSlot = 
  | '무기'
  | '목걸이'
  | '반지1'
  | '반지2'
  | '펫'
  | '엠블렘'
  | '투구'
  | '상의'
  | '하의'
  | '장갑'
  | '신발';

// 카테고리별 룬 맵핑
export const categoryToSlotMap: Record<string, EquipmentSlot[]> = {
  'weapon': ['무기'],
  'armor': ['투구', '상의', '하의', '장갑', '신발'],
  'emblem': ['엠블렘'],
  'accessory': ['목걸이', '반지1', '반지2', '펫']
};
