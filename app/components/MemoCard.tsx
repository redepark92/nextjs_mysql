// app/components/MemoCard.tsx

// Props 타입 정의 - 컴포넌트가 받을 데이터의 형태를 정의합니다
interface MemoCardProps {
    memo: {
        pri_no: string;
        fw_date: string;
        memo_text: string;
        bg_color: string;
    };
  }
  
  // Props로 product를 받아서 표시하는 컴포넌트
  // { product }: ProductCardProps - 부모 컴포넌트로부터 product 데이터를 받습니다
  export default function ProductCard({ memo }: MemoCardProps) {
    return (
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '20px', 
        marginBottom: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          {/* 전달받은 product 데이터를 사용합니다 */}
          <h2 style={{ margin: 0, fontSize: '1.5em' }}>{memo.fw_date}</h2>
          <span style={{ 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.8em'
          }}>
            추적중
          </span>
        </div>
  
        <div style={{ marginTop: '10px' }}>
          <p style={{ 
            fontSize: '1.3em', 
            fontWeight: 'bold',
            color: '#2196F3',
            margin: '8px 0'
          }}>
            {memo.memo_text}
          </p>
          <p style={{ 
            fontSize: '0.9em',
            color: '#666',
            margin: '4px 0'
          }}>
            카테고리: {memo.bg_color}
          </p>
        </div>
  
        <div style={{ 
          marginTop: '15px',
          paddingTop: '15px',
          borderTop: '1px solid #eee'
        }}>
          <button style={{
            padding: '8px 16px',
            backgroundColor: 'white',
            color: '#2196F3',
            border: '1px solid #2196F3',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            상세 보기
          </button>
        </div>
      </div>
    );
  }