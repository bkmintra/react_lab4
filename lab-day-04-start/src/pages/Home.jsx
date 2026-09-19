import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">ยินดีต้อนรับสู่ Recipe Browser</h1>
      <p className="text-xl text-gray-600 mb-8">ค้นหาสูตรอาหารที่คุณชื่นชอบได้ที่นี่</p>
      <Link 
        to="/recipes" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        ดูสูตรอาหารทั้งหมด
      </Link>
    </div>
  )
}
