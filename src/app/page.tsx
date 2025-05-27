import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <section className="bg-card shadow-sm w-full">
        <div className="container py-16 px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">당신의 캐릭터는 몇점입니까?</h1>
          <p className="text-base md:text-lg text-muted-foreground">
            캐릭터의 스펙을 입력하여 스코어를 확인해보세요.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="flex-grow flex items-center justify-center py-12 px-4">
        <Link href="/measure" className="w-full max-w-xs">
          <Button size="lg" className="w-full py-6 text-lg">
            측정하러 가기
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
