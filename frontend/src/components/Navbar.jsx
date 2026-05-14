import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <div className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-4 text-slate-800 transition-all">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          CareerCraft<span className="text-[#8e51ff]"> - AI Resume Builder</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden text-slate-500">Hi, {user?.name}</p>
          <button
            onClick={logoutUser}
            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-[#8e51ff] text-white px-5 py-2 rounded-lg active:scale-95 transition-all"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
