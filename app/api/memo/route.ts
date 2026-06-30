import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const start = parseInt(searchParams.get('start') || '0');
        const scale = parseInt(searchParams.get('scale') || '10');

        // user 테이블의 모든 데이터를 조회 
        console.log("Memo_query, Start");
        console.log("Memo_query, Start : ", start); 
        console.log("Memo_query, scale : ", scale); 

        // 여기서 Total을 구한다. 
        const totalQuery = `select count(*) AS total from ahn_memo `;
        const [total] = await pool.query(totalQuery);
        // total[0] 만 하면, total 아래에 total : 값 형식으로 저장된다. 그래서. total[0].total 로 처리하여야 한다. 
        const TotalNum = total[0].total;
        

        // 여기서 목록을 구한다. 
        const query = `
        select pri_no, bg_color, fw_date, left(memo, 100) AS memo_text from ahn_memo 
        order by fw_date desc 
        limit ${start}, ${scale}
        `;
        const [rows] = await pool.query(query);

        // 리턴에, 현재 쿼리의 갯수를 넘기려고 하는데, rows.lenght 에서 오류가 발생해서, 다음처럼 처리하였음. 
        // 나중에 다르게 처리할 수 있는지확인 필요. 
        let tempResult: any = rows;
        //console.log("rows.length : ", tempResult.length);

        //return NextResponse.json(rows);
        return NextResponse.json({
            total: TotalNum,
            count: tempResult.length,
            scale: scale,
            start: start,
            data: rows
        }); 
        
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}