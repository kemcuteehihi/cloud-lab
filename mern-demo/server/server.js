require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Đã thêm thư viện CORS

const app = express();
const PORT = process.env.PORT || 5000;

// Cấp quyền CORS để Frontend (cổng 3000) có thể gửi dữ liệu sang Backend (cổng 5000)
app.use(cors());

// RẤT QUAN TRỌNG: Lệnh này giúp Server đọc được dữ liệu JSON gửi lên từ Client (cho hàm POST, PUT)
app.use(express.json()); 

// Lệnh kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Kết nối MongoDB Atlas thành công!'))
    .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// ---------------------------------------------------------
// Câu 35: Tạo Model Student
const studentSchema = new mongoose.Schema({
    mssv: String, // Sửa 'studentId' thành 'mssv' để đồng bộ với Form Frontend
    name: String,
    email: String
});
const Student = mongoose.model('Student', studentSchema);

// ---------------------------------------------------------
// Câu 36: Xây dựng API GET - Lấy danh sách sinh viên
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Lỗi máy chủ" });
    }
});

// Câu 37: Xây dựng API POST - Thêm sinh viên mới
app.post('/api/students', async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ error: "Không thể thêm sinh viên" });
    }
});

// Câu 38: Xây dựng API PUT - Cập nhật thông tin sinh viên
app.put('/api/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ error: "Không thể cập nhật" });
    }
});

// Câu 39: Xây dựng API DELETE - Xóa sinh viên
app.delete('/api/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Đã xóa sinh viên thành công" });
    } catch (error) {
        res.status(400).json({ error: "Không thể xóa" });
    }
});
// ---------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});