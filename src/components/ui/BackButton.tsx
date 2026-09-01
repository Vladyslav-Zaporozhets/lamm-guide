"use client";
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ label }: { label: string }) {
  const router = useRouter();
  return (
    <button 
      onClick={() => router.back()} 
      className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      {label}
    </button>
  );
}
