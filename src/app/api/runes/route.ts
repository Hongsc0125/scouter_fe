import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// 룬 데이터 타입 정의
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

// GET 요청 처리 - 모든 룬 또는 카테고리별 룬 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const runesCollection = db.collection('rune');
    
    let query = {};
    if (category) {
      query = { category };
    }
    
    const runes = await runesCollection.find(query).toArray();
    
    return NextResponse.json({ success: true, data: runes });
  } catch (error) {
    console.error('룬 데이터를 불러오는 중 오류 발생:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
