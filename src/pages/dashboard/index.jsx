import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import useCheckuser from "../../hooks/useToken";
import useLogout from "../../hooks/useLogout";

function Dashboard() {
  const [cookies, removeCookie] = useCookies(["account"]);

  const handleLogout = useLogout();

  const result = useCheckuser();
  console.log(result);
  return (
    <main className="bg-cyan-800 min-h-screen w-full flex">
      <nav className="flex flex-col h-screen gap-5 p-5 overflow-y-auto">
        <p className="font-extrabold text-xl text-white/50">LA LIFESTYLE</p>
        <NavLink to={'/'} className={`font-bold text-white/20`}>Overview</NavLink>
        <div className="flex flex-col gap-2">
          <p className="text-white/15 border-gray-400/30 text-xs border-b">
            Transactions
          </p>
          <NavLink to={'/delivery'} className={`font-bold text-white/20`}>Delivery</NavLink>
          <NavLink className={`font-bold text-white/20`}>Received</NavLink>
          <NavLink className={`font-bold text-white/20`}>Pull-out</NavLink>
          <NavLink className={`font-bold text-white/20`}>Transfer</NavLink>
          <NavLink to={'/createtransaction'} className={`font-bold text-white/20`}>
            Create Transaction
          </NavLink>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-white/15 border-gray-400/30 text-xs border-b">
            Inventory
          </p>
          <NavLink className={`font-bold text-white/20`}>Stocks</NavLink>
          <NavLink className={`font-bold text-white/20`}>Reworks</NavLink>
          <NavLink className={`font-bold text-white/20`}>Disposal</NavLink>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-white/15 border-gray-400/30 text-xs border-b">
            Others
          </p>
          <NavLink to={'/products'} className={`font-bold text-white/20`}>Products</NavLink>
          <NavLink className={`font-bold text-white/20`}>Stores</NavLink>
          <NavLink className={`font-bold text-white/20`}>Brands</NavLink>
        </div>
        <div className="flex flex-col gap-2 mt-auto">
          <p className="text-white/15 border-gray-400/30 text-xs border-b">
            user
          </p>
          <p className={`font-bold text-white/30 text-sm`}>Admin</p>
          <button
            className={`font-bold text-white/20 text-xs`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
      <section className="flex-1 border-gray-400/30 border-l p-5 overflow-y-auto flex flex-col">
        <Outlet />
      </section>
    </main>
  );
}

export default Dashboard;
