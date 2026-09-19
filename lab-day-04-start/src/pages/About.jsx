export default function About() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">เกี่ยวกับพวกเรา</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <p className="text-gray-700 leading-relaxed mb-4">
          Recipe Browser เป็นโปรเจกต์มินิแอปพลิเคชันสำหรับเรียนรู้การใช้งาน React Router v6 
          และการดึงข้อมูลจาก API ภายนอก (TheMealDB)
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">เทคโนโลยีที่ใช้</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>React 19</li>
            <li>React Router v6</li>
            <li>Tailwind CSS v4</li>
            <li>Vite</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
