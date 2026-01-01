"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "../../components/layout/Container";
import { Lock } from "lucide-react";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push("/admin");
            } else {
                const data = await res.json();
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="pt-32 pb-20 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-zinc-400">
                        <Lock size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Admin Access</h1>
                    <p className="text-zinc-500 text-sm mt-2">Please enter credentials to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-600 transition-colors"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm text-center bg-red-900/10 border border-red-900/20 rounded p-2">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-semibold rounded-lg py-3 hover:bg-zinc-200 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Verifying..." : "Enter CMS"}
                    </button>
                </form>
            </div>
        </Container>
    );
}
