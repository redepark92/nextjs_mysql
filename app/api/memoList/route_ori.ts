import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        // user 테이블의 모든 데이터를 조회
        console.log("Memo_query, Start");
        const [rows] = await pool.query("select pri_no, fw_date from ahn_memo limit 10");
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}