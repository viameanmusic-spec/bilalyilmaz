"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.token) {
          document.cookie = `token=${data.token}; path=/; max-age=86400; secure; samesite=strict`;
        }
        router.push("/admindashboard");
      } else {
        const data = await response.json().catch(() => null);
        setError(data?.message || "Giriş başarısız. Kullanıcı adı veya şifre hatalı.");
      }
    } catch (err) {
      setError("Sunucuya bağlanılamadı. Lütfen API'nin çalıştığından emin ol.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4">
      <div className="w-full max-w-md bg-[#0a0a0a] border border-stone-900 p-8 shadow-2xl">
        
        <div className="mb-8 text-center flex flex-col items-center">
<h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">
  Bilal Yılmaz
</h1>
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500">
            Stüdyo Yönetim Paneli
          </h2>
        </div>

        {error && (
          <div className="mb-6 border border-red-900/50 bg-red-950/20 p-3 text-center text-xs font-medium text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400" htmlFor="username">
              Kullanıcı Adı
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-[#050505] border border-stone-800 px-4 py-3 text-white text-sm focus:border-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-600 transition-colors"
              placeholder="Kullanıcı adınızı girin"
            />
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400" htmlFor="password">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#050505] border border-stone-800 px-4 py-3 text-white text-sm focus:border-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-600 transition-colors"
              placeholder="Şifrenizi girin"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-orange-600 px-4 py-4 text-[11px] font-bold tracking-[0.2em] uppercase text-white transition-colors hover:bg-orange-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-stone-900 disabled:text-stone-600"
          >
            {loading ? "GİRİŞ YAPILIYOR..." : "SİSTEME GİRİŞ"}
          </button>
        </form>
      </div>
    </div>
  );
}