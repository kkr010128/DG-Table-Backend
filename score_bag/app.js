require("dotenv").config();
const express = require("express");
const app = express();
const { insertUserData, insertTimetableData } = require("./db_connection");

// POST 요청을 처리하기 위해 JSON 파싱 미들웨어 추가
app.use(express.json());

// 서버 시작
const server = app.listen(3000, () => {
  console.log("server started on port 3000");
});

// 사용자 데이터 삽입을 위한 API
app.post("/api/user/login", async (req, res) => {
  console.log("client connected to login API");

  // 사용자 데이터 생성 (Flutter 앱에서 받은 데이터를 사용)
  const userData = {
    user_id: req.body.user_id || "2020214597",
    user_name: req.body.user_name || "김광래",
    user_dept: req.body.user_dept || "컴퓨터공학전공",
    user_type: req.body.user_type || "0",
    user_qr: req.body.user_qr || "http://kkr010128.iptime.org",
  };

  // 데이터베이스에 삽입
  insertUserData(userData, (err, result) => {
    if (err) {
      res.status(500).send({ error: "데이터 삽입 실패" });
    } else {
      res.status(200).send({ message: "데이터 삽입 성공", result });
    }
  });
});

// 시간표 데이터 삽입을 위한 API
app.post("/api/timetable/add", async (req, res) => {
  console.log("client connected to timetable API");

  // 시간표 데이터 생성 (Flutter 앱에서 받은 데이터를 사용)
  const timetableData = {
    user_id: req.body.user_id,        // 학번
    table_id: req.body.table_id,      // 테이블 ID
    table_season: req.body.semester,  // 해당 학기
    table_data: JSON.stringify(req.body.timetable), // 시간표 데이터 (JSON 형태로 변환하여 저장)
  };

  // 데이터베이스에 삽입
  insertTimetableData(timetableData, (err, result) => {
    if (err) {
      res.status(500).send({ error: "시간표 데이터 삽입 실패" });
    } else {
      res.status(200).send({ message: "시간표 데이터 삽입 성공", result });
    }
  });
});