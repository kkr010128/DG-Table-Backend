require("dotenv").config();
const mysql = require("mysql2");

// 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATA,
});

connection.connect((err) => {
  if (err) {
    console.error("데이터베이스 연결 실패:", err);
    return;
  }
  console.log("데이터베이스에 연결되었습니다.");
});

// 사용자 데이터 삽입 함수
function insertUserData(userData, callback) {
  const query = "INSERT INTO user_info SET ?";
  connection.query(query, userData, (err, results) => {
    if (err) {
      console.error("데이터 삽입 실패:", err);
      return callback(err);
    }
    console.log("데이터 삽입 성공:", results);
    callback(null, results);
  });
}

// 시간표 데이터 삽입 함수
function insertTimetableData(timetableData, callback) {
  const query = "INSERT INTO timetable SET ?";
  connection.query(query, timetableData, (err, results) => {
    if (err) {
      console.error("시간표 데이터 삽입 실패:", err);
      return callback(err);
    }
    console.log("시간표 데이터 삽입 성공:", results);
    callback(null, results);
  });
}

module.exports = { insertUserData, insertTimetableData };