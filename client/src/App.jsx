import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  
  // State mới để lưu dữ liệu người dùng nhập vào form
  const [formData, setFormData] = useState({
    mssv: '',
    name: '',
    email: ''
  })

  // Đường link Backend của bạn (Port 5000)
  const BACKEND_URL = "https://humble-doodle-qv9rp97r97463xw6q-5000.app.github.dev"

  // Hàm lấy danh sách sinh viên
  const fetchStudents = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/students`)
      const data = await response.json()
      setStudents(data)
    } catch (error) {
      console.error("Lỗi khi kết nối tới Backend:", error)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  // Hàm cập nhật state khi người dùng gõ vào ô input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Hàm xử lý sự kiện Gửi Form (Thêm sinh viên - Câu 49)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn trình duyệt tự động tải lại trang
    try {
      const response = await fetch(`${BACKEND_URL}/api/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Thêm sinh viên thành công!");
        setFormData({ mssv: '', name: '', email: '' }); // Xóa trắng form sau khi thêm
        fetchStudents(); // Lấy lại danh sách mới nhất để hiển thị
      } else {
        alert("Có lỗi xảy ra khi thêm sinh viên.");
      }
    } catch (error) {
      console.error("Lỗi:", error)
    }
  }

  return (
    <div className="container">
      <h1>Quản lý Sinh viên (MERN Stack)</h1>

      {/* Giao diện Form nhập (Câu 48) */}
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <h2>Thêm Sinh viên mới</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ padding: '5px' }}>
            <label>MSSV: </label>
            <input type="text" name="mssv" value={formData.mssv} onChange={handleChange} required />
          </div>
          <div style={{ padding: '5px' }}>
            <label>Họ tên: </label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div style={{ padding: '5px' }}>
            <label>Email: </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <button type="submit" style={{ marginTop: '10px' }}>Thêm Sinh viên</button>
        </form>
      </div>

      <div className="student-list">
        <h2>Danh sách sinh viên hiện tại:</h2>
        {students.length === 0 ? (
          <p>Chưa có sinh viên nào trong Database.</p>
        ) : (
          <ul>
            {students.map((student) => (
              <li key={student._id}>
                <strong>{student.mssv}</strong> - {student.name} ({student.email})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App