import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

export default function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchInput, setSearchInput] = useState(query)

  // Sync input with URL search param when URL changes (e.g. back button)
  useEffect(() => {
    setSearchInput(query)
  }, [query])

  const url = query 
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    : 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert'

  const { data, loading, error } = useFetch(url)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput })
    } else {
      setSearchParams({})
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">สูตรอาหาร</h1>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input 
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="ค้นหาสูตรอาหาร..."
            className="border border-gray-300 rounded-lg px-4 py-2 flex-grow focus:outline-none focus:border-blue-500"
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ค้นหา
          </button>
        </form>
      </div>

      {loading && <div className="text-center py-10 text-gray-500">กำลังโหลด...</div>}
      
      {error && <div className="text-center py-10 text-red-500">เกิดข้อผิดพลาด: {error}</div>}

      {!loading && !error && data && data.meals === null && (
        <div className="text-center py-10 text-gray-500">ไม่พบสูตรอาหารที่ค้นหา</div>
      )}

      {!loading && !error && data && data.meals && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.meals.map(meal => (
            <Link 
              to={`/recipes/${meal.idMeal}`} 
              key={meal.idMeal}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg truncate">{meal.strMeal}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
