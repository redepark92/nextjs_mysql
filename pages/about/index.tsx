// app/about/page.tsx

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function About() {

  return (
    <div>
      <Header />

      <main style={{ padding: '20px', minHeight: '60vh' }}>

      <h2>회사 소개</h2>

      <p>상품 가격을 추적하는 서비스를 제공합니다.</p>

      </main>

      <Footer />
    </div>
  );
}