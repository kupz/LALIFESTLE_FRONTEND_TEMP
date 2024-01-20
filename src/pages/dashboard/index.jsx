import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import useCheckuser from "../../hooks/useToken";
import useLogout from "../../hooks/useLogout";
import TransactionDetailModal from "../../components/TransactionDetailModal";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

export const TransactionDetailViewModal = signal(false);

function Dashboard() {
  useSignals();
  // const [cookies, removeCookie] = useCookies(["account"]);

  const handleLogout = useLogout();

  const result = useCheckuser();
  // console.log(result);
  return (
    <main className="bg-cyan-800 min-h-screen w-full flex">
      <nav className="flex flex-col h-screen gap-5 p-5 overflow-y-auto">
        <p className="font-extrabold text-xl text-white/50">LA LIFESTYLE</p>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? `font-bold text-white/80` : `font-bold text-white/20`
          }
        >
          Overview
        </NavLink>
        <div className="flex flex-col gap-2">
          <p className="text-white/15 border-gray-400/30 text-xs border-b">
            Transactions
          </p>
          <NavLink
            to={"/delivery"}
            className={({ isActive }) =>
              isActive ? `font-bold text-white/80` : `font-bold text-white/20`
            }
          >
            Delivery
          </NavLink>
          <NavLink
            to={"/received"}
            className={({ isActive }) =>
              isActive ? `font-bold text-white/80` : `font-bold text-white/20`
            }
          >
            Received
          </NavLink>
          <NavLink
            to={"/pullout"}
            className={({ isActive }) =>
              isActive ? `font-bold text-white/80` : `font-bold text-white/20`
            }
          >
            Pull-out
          </NavLink>
          <NavLink
            to={"transfer"}
            className={({ isActive }) =>
              isActive ? `font-bold text-white/80` : `font-bold text-white/20`
            }
          >
            Transfer
          </NavLink>
          <NavLink
            to={"/createtransaction"}
            className={({ isActive }) =>
              isActive ? `font-bold text-white/80` : `font-bold text-white/20`
            }
          >
            Create Transaction
          </NavLink>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-white/15 border-gray-400/30 text-xs border-b">
            Inventory
          </p>
          <NavLink
            to={"/stocks"}
            className={({ isActive }) =>
              isActive ? `font-bold text-white/80` : `font-bold text-white/20`
            }
          >
            Stocks
          </NavLink>
          <NavLink
            to={"reworks"}
            className={({ isActive }) =>
              isActive ? `font-bold text-white/80` : `font-bold text-white/20`
            }
          >
            Reworks
          </NavLink>
          <NavLink
            to={"disposals"}
            className={({ isActive }) =>
              isActive ? `font-bold text-white/80` : `font-bold text-white/20`
            }
          >
            Disposal
          </NavLink>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-white/15 border-gray-400/30 text-xs border-b">
            Others
          </p>
          <NavLink
            to={"/products"}
            className={({ isActive }) =>
              isActive ? `font-bold text-white/80` : `font-bold text-white/20`
            }
          >
            Products
          </NavLink>
          <NavLink
            to={"/stores"}
            className={({ isActive }) =>
              isActive ? `font-bold text-white/80` : `font-bold text-white/20`
            }
          >
            Stores
          </NavLink>
          <NavLink
            to={"/brands"}
            className={({ isActive }) =>
              isActive ? `font-bold text-white/80` : `font-bold text-white/20`
            }
          >
            Brands
          </NavLink>
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
      {TransactionDetailViewModal.value && <TransactionDetailModal />}
    </main>
  );
}

export default Dashboard;
