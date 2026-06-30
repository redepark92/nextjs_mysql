import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '202.30.131.92',
  user: 'itpost',
  password: 'parkky!23',
  database: 'itpost'
});

export async function getAllNews() {
  const [rows] = await pool.query('select pri_no, bg_color, state_info, w_tool, w_ip, fw_date from ahn_memo limit 10');
  return rows;
}
