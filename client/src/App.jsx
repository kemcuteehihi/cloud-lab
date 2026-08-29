import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({
    mssv: '',
    name: '',
    email: ''
  })
  const [editingId, setEditingId] = useState(null) // Quản lý trạng thái khi đang sửa sinh viên

  const BACKEND_URL = "http://localhost:5000"

  // Hàm lấy danh sách sinh viên (GET)
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Hàm xử lý Thêm (POST) hoặc Cập nhật (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingId) {
        // Gọi API Cập nhật (PUT) - Câu 38/77
        response = await fetch(`${BACKEND_URL}/api/students/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // Gọi API Thêm mới (POST) - Câu 37/75
        response = await fetch(`${BACKEND_URL}/api/students`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        alert(editingId ? "Cập nhật thành công!" : "Thêm sinh viên thành công!");
        setFormData({ mssv: '', name: '', email: '' });
        setEditingId(null);
        fetchStudents();
      } else {
        alert("Có lỗi xảy ra.");
      }
    } catch (error) {
      console.error("Lỗi:", error)
    }
  }

  // Đưa dữ liệu sinh viên cần sửa lên form
  const handleEdit = (student) => {
    setEditingId(student._id);
    setFormData({
      mssv: student.mssv,
      name: student.name,
      email: student.email
    });
  }

  // Hàm Xóa sinh viên (DELETE) - Câu 39/78
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên này không?")) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/students/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert("Xóa thành công!");
          fetchStudents();
        } else {
          alert("Lỗi khi xóa sinh viên.");
        }
      } catch (error) {
        console.error("Lỗi:", error);
      }
    }
  }

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
     <h1 style={{ lineHeight: '1.5', textAlign: 'center', marginBottom: '20px' }}>
  Quản lý Sinh viên <br /> 
  <span style={{ fontSize: '0.8em', color: '#555' }}>Phiên bản 2.0</span>
</h1>

      {/* Form Nhập liệu (Thêm / Sửa) */}
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <h2>{editingId ? "Cập nhật thông tin Sinh viên" : "Thêm Sinh viên mới"}</h2>
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
          <button type="submit" style={{ marginTop: '10px', marginRight: '10px' }}>
            {editingId ? "Lưu thay đổi" : "Thêm Sinh viên"}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setFormData({ mssv: '', name: '', email: '' }); }}>
              Hủy
            </button>
          )}
        </form>
      </div>

      {/* Danh sách sinh viên kèm nút Sửa và Xóa */}
      <div className="student-list">
        <h2>Danh sách sinh viên hiện tại:</h2>
        {students.length === 0 ? (
          <p>Chưa có sinh viên nào trong Database.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {students.map((student) => (
              <li key={student._id} style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span><strong>{student.mssv}</strong> - {student.name} ({student.email})</span>
                <div>
                  <button onClick={() => handleEdit(student)} style={{ marginRight: '5px', backgroundColor: '#f0ad4e', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Sửa</button>
                  <button onClick={() => handleDelete(student._id)} style={{ backgroundColor: '#d9534f', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Xóa</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App