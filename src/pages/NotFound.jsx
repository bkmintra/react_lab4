import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">ไม่พบหน้าที่คุณต้องการ</h2>
      <p className="text-gray-500 mb-8">หน้าที่คุณพยายามเข้าถึงไม่มีอยู่หรือถูกย้ายไปแล้ว</p>
      <Link 
        to="/" 
        className="inline-block bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
      >
        กลับไปหน้าแรก
      </Link>
    </div>
  )
}
