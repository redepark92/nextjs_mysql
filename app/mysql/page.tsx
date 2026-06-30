import { getAllNews } from '@/lib/db-mysql';


export default async function ProductsSimplePage() {
    const products = await getAllNews();

  
    return (
      <div style={{ padding: '20px' }}>
        <h1>상품 목록</h1> 
        <div>
          {products.map(product => (
            <div key={product.pri_no}>
              <div>상품명: {product.bg_color}</div>
              <div>가격: {product.state_info}원</div>
              <div>카테고리: {product.fw_date}</div>
              <div>---</div>
            </div>
          ))}
        </div>
      </div>
    );
  }