import { NavLink } from 'react-router-dom'

export default function Nav() {
  const getNavLinkClass = ({ isActive }) => {
    return isActive 
      ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
      : "text-gray-600 hover:text-blue-500 pb-1"
  }

  return (
    <nav className="flex gap-6 mb-8 border-b pb-2">
      <NavLink to="/" end className={getNavLinkClass}>หน้าแรก</NavLink>
      <NavLink to="/recipes" className={getNavLinkClass}>สูตรอาหาร</NavLink>
      <NavLink to="/about" className={getNavLinkClass}>เกี่ยวกับ</NavLink>
    </nav>
  )
}
