import { useState } from "react";
import { featuredProducts, useCart } from "../store";
import { formatPrice } from "../data";
import {
  IconArrowRight,
  IconCart,
  IconChevronDown,
  IconClock,
  IconGift,
  IconHome,
} from "../components/Icons";
import ShopPopup from "../components/ShopPopup";

export default function Home({
  onNavigate,
  onOpenProduct,
}: {
  onNavigate: (s: "shop" | "cart") => void;
  onOpenProduct: (id: string) => void;
}) {
  const { customerName, points, totalItems, tgUser, isFromTelegram, logout } = useCart();
  const [showShopPopup, setShowShopPopup] = useState(false);

  return (
    <div className="flex flex-col h-full">
      {showShopPopup && <ShopPopup onClose={() => setShowShopPopup(false)} />}
      {/* Hero banner */}
      <div className="relative hero-brush">
        {/* top bar */}
        <div className="flex items-center justify-end gap-2 px-4 pt-4 pb-2">
          <button
            onClick={() => setShowShopPopup(true)}
            className="bg-white rounded-full pl-3 pr-2 py-1 flex items-center gap-1 text-sm font-medium text-gray-700 shadow"
          >
            NT26 Coffee
            <IconChevronDown className="w-4 h-4" />
          </button>
          <a className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white text-xs font-bold">f</a>
          <a className="w-8 h-8 rounded-full bg-[#26A5E4] flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="m21.5 4.5-19 8 6 2 2 6 4-4 5 4z" /></svg>
          </a>
          <a className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M3 21 8 6l4 8 3-4 6 11Z" /></svg>
          </a>
        </div>

        {/* Khmer coffee illustration area */}
        <div className="relative h-56 flex items-center justify-center">
          <div className="absolute left-6 top-6 opacity-40">
            <svg width="80" height="120" viewBox="0 0 80 120" fill="none" stroke="#fff8dc" strokeWidth="2">
              <path d="M15 30h50l-6 80H21z" />
              <path d="M20 40h40" />
              <text x="40" y="70" textAnchor="middle" fill="#fff8dc" fontSize="10" opacity=".7">ប្រេស៊ូ</text>
            </svg>
          </div>
          <div className="absolute left-24 top-16 opacity-40">
            <svg width="60" height="80" viewBox="0 0 60 80" fill="none" stroke="#fff8dc" strokeWidth="2">
              <rect x="10" y="10" width="40" height="60" rx="2" />
              <text x="30" y="45" textAnchor="middle" fill="#fff8dc" fontSize="8">coffee</text>
            </svg>
          </div>
          <div className="absolute right-8 top-10 opacity-70">
            <div className="text-white/80 text-5xl font-bold leading-none" style={{ fontFamily: "Kantumruy Pro" }}>
              ប្រេស<span className="text-yellow-100">្សូ</span>
            </div>
            <div className="text-white/80 text-3xl mt-1" style={{ fontFamily: "Kantumruy Pro" }}>
              កាហ្វេ
            </div>
          </div>
          <div className="absolute right-6 top-4 opacity-40">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="#fff8dc" strokeWidth="2">
              <path d="M10 25c0-8 6-15 15-15s15 7 15 15" />
              <path d="M8 30h34l-4 12H12z" />
              <path d="M42 32c4 0 5 6 0 6" />
            </svg>
          </div>
        </div>

        {/* bottom contact bar */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-center pb-3 text-white text-xs">
          <div className="flex items-center gap-1 opacity-90">
            <div className="w-6 h-6 rounded-full bg-[#26A5E4] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="m21.5 4.5-19 8 6 2 2 6 4-4 5 4z" /></svg>
            </div>
            <span>012 723 236</span>
          </div>
          <div className="flex items-center gap-1 opacity-90">
            <div className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center text-[10px] font-bold">f</div>
            <span>ហាងកាហ្វេ</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 bg-[#f2f7f5]">
        {/* Profile card + gift card */}
        <div className="px-4 -mt-4 relative z-10 grid grid-cols-[1fr_130px] gap-3">
          <div className="bg-white rounded-2xl card-shadow p-3">
            <div className="flex items-center gap-3">
              {tgUser?.photo_url ? (
                <img
                  src={tgUser.photo_url}
                  alt={customerName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#148c78]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center text-2xl border-2 border-yellow-400">
                  👩
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-sm text-gray-600 font-medium flex items-center gap-1">
                  សូមស្វាគមន៍ 🙏
                  {isFromTelegram && (
                    <span className="inline-flex items-center gap-0.5 bg-[#26A5E4]/10 text-[#26A5E4] text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5">
                        <path d="m21.5 4.5-19 8 6 2 2 6 4-4 5 4z" />
                      </svg>
                      Telegram
                    </span>
                  )}
                </div>
                <div className="text-[15px] font-bold text-[#148c78] tracking-wide truncate">
                  {customerName}
                </div>
              </div>
              <button
                onClick={() => {
                  if (confirm("ចេញពីគណនី?")) logout();
                }}
                title="Logout"
                className="text-gray-400 hover:text-red-500 p-1"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <path d="m16 17 5-5-5-5" />
                  <path d="M21 12H9" />
                </svg>
              </button>
            </div>
            <div className="mt-3 relative bg-[#f2f7f5] rounded-full h-8 overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-1/3 bg-[#148c78] rounded-full flex items-center justify-end pr-3 text-white text-xs font-medium">
                ៛ {(0).toLocaleString()}
              </div>
              <div className="absolute inset-0 flex items-center justify-start pl-3 text-xs text-gray-600 font-medium">
                សរុបលុយសរុប
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl card-shadow p-3 flex flex-col items-center justify-center">
            <IconGift className="w-9 h-9 text-[#148c78]" />
            <div className="mt-2 text-sm font-semibold text-gray-700">
              {points} ពិន្ទុ
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="flex justify-end px-4 mt-2 opacity-40">
          <svg width="90" height="30" viewBox="0 0 90 30" fill="none" stroke="#148c78" strokeWidth="2">
            <path d="M2 15c5-8 10-8 15 0s10 8 15 0 10-8 15 0 10 8 15 0 10-8 15 0" />
            <path d="M2 22c5-8 10-8 15 0s10 8 15 0 10-8 15 0 10 8 15 0 10-8 15 0" opacity=".6" />
          </svg>
        </div>

        {/* Featured category */}
        <div className="px-4 mt-2 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">ប្រភេទមុខទំនិញ</h3>
          <button
            onClick={() => onNavigate("shop")}
            className="text-xs text-[#148c78] font-medium flex items-center gap-1"
          >
            មើលទាំងអស់ <IconArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="px-4 mt-2 grid grid-cols-3 gap-3">
          {featuredProducts.map((p, i) => {
            const titles = ["គេសជ្ជៈប្រភេទតែ", "គេសជ្ជៈក្តៅ", "គេសជ្ជៈក្រឡុក"];
            return (
              <div key={p.id} className="flex flex-col items-center">
                <div className="text-[11px] text-[#148c78] font-medium mb-1">{titles[i]}</div>
                <button
                  onClick={() => onOpenProduct(p.id)}
                  className="relative w-full aspect-square rounded-2xl overflow-hidden card-shadow bg-white"
                >
                  <img src={p.image} alt={p.nameKh} className="w-full h-full object-cover" />
                  <div className="absolute bottom-1 right-1 bg-[#148c78] text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                    {formatPrice(p.price)}
                  </div>
                </button>
                <div className="mt-1.5 text-xs text-gray-700 text-center line-clamp-1">{p.nameKh}</div>
              </div>
            );
          })}
        </div>

        {/* small padding */}
        <div className="h-6" />
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-6 py-3 bg-white/90 backdrop-blur-md border-t border-gray-100">
        <button className="w-12 h-12 rounded-full flex items-center justify-center text-[#148c78]">
          <IconHome className="w-6 h-6" />
        </button>
        <button
          onClick={() => onNavigate(totalItems > 0 ? "cart" : "shop")}
          className="w-14 h-14 -mt-6 rounded-full bg-black text-white flex items-center justify-center shadow-lg relative"
        >
          <IconCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
        <button className="w-12 h-12 rounded-full flex items-center justify-center text-[#148c78]">
          <IconClock className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
