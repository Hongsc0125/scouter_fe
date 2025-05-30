import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">모비스코어</h3>
            <p className="text-sm text-muted-foreground">
              마비노기 스코어를 측정하고
              <br />
              최적의 스펙을 찾아보세요.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4">메뉴</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">홈</Link></li>
              <li><Link href="/measure" className="text-sm text-muted-foreground hover:text-foreground transition-colors">데미지 측정</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4">문의/개선요청</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://discord.gg/mabinogi01" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  Discord Link
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4">제작자</h4>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold">힝트 </span>
                <span>던컨서버 동글/풀잎 길드</span>
              </p>
              <p className="text-xs text-muted-foreground">버그 제보 및 문의는 디스코드로 부탁드립니다.</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            © {currentYear} 모비스코어. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
