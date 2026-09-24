import { useParams, Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

export default function RecipeDetail() {
  const { id } = useParams()
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  const { data, loading, error } = useFetch(url)

  if (loading) return <div className="text-center py-10 text-gray-500">กำลังโหลด...</div>
  if (error) return <div className="text-center py-10 text-red-500">เกิดข้อผิดพลาด: {error}</div>

  // Handle case where API returns HTTP 200 but { meals: null } for a non-existent ID
  if (data && data.meals === null) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">ไม่พบสูตรนี้</h2>
        <p className="text-gray-500 mb-6">รหัสสูตรอาหาร {id} ที่คุณพยายามเข้าถึงไม่มีอยู่ในระบบ</p>
        <Link to="/recipes" className="text-blue-600 hover:underline">
          &larr; กลับไปหน้ารวมสูตรอาหาร
        </Link>
      </div>
    )
  }

  // We have a meal
  if (data && data.meals && data.meals.length > 0) {
    const meal = data.meals[0]

    // Extract ingredients and measures (API returns up to 20 properties strIngredient1, strMeasure1...)
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`]
      const measure = meal[`strMeasure${i}`]
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({ ingredient, measure })
      }
    }

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="h-64 md:h-96 w-full relative">
          <img 
            src={meal.strMealThumb} 
            alt={meal.strMeal} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <h1 className="absolute bottom-6 left-6 text-3xl md:text-5xl font-bold text-white drop-shadow-md">
            {meal.strMeal}
          </h1>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {meal.strCategory && (
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {meal.strCategory}
              </span>
            )}
            {meal.strArea && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {meal.strArea}
              </span>
            )}
            {meal.strTags && meal.strTags.split(',').map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                #{tag.trim()}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">ส่วนผสม</h2>
              <ul className="space-y-2">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="font-medium text-gray-700">{item.ingredient}</span>
                    <span className="text-gray-500">{item.measure}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">วิธีทำ</h2>
              <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                {meal.strInstructions}
              </div>
              
              {meal.strYoutube && (
                <div className="mt-8">
                  <a 
                    href={meal.strYoutube} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    ดูวิดีโอวิธีทำบน YouTube
                  </a>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t text-center">
             <Link to="/recipes" className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
               &larr; กลับไปหน้ารวมสูตรอาหาร
             </Link>
          </div>
        </div>
      </div>
    )
  }

  return null
}
