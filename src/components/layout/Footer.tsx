import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-8 px-4">
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
            <h4 className="text-sm font-medium mb-4">문의하기</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://discord.gg/mabinogi01" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  Discord 문의
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4">소셜 미디어</h4>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" asChild>
                <a href="https://discord.gg/mabinogi01" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
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
