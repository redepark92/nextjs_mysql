import React from "react";
import '@/app/globals.css'
import Image from 'next/image';

export default function Home() {
    return (
      <html>
        <body>
        <Image 
        src="/next.svg" 
        alt="Next.js 로고" 
        width={120}
        height={24}
      />

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-6xl font-bold text-blue-200">
          Tailwind 적용 성공!
        </h1>
      </div>


         {/* 인라인 스타일 버전 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">인라인 스타일:</h3>
            <div style={{ 
              margin: '30px', 
              padding: '20px', 
              border: '3px solid #2196F3',
              backgroundColor: '#E3F2FD'
            }}>
              <p style={{ margin: 0 }}>
                margin: 30px, padding: 20px
              </p>
            </div>
          </div>
  
          {/* Tailwind 버전 */}
          <div>
            <h3 className="text-lg font-medium mb-2">Tailwind CSS:</h3>
            <div className="m-8 p-5 border-4 border-blue-500 bg-blue-50">
              <p className="m-0">
                m-8 (margin 32px), p-5 (padding 20px)
              </p>
            </div>
          </div>


        </body>
      </html>
    );
  }