
import React from 'react';

export const Background: React.FC = () => {
  return (
    <>
      <div className="absolute inset-0 -z-20 h-full w-full bg-gray-950 overflow-hidden">
          <div className="blob-1 absolute -top-1/4 left-0 w-1/2 h-1/2 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
          <div className="blob-2 absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          <div className="blob-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 h-2/5 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>
      <style>{`
        .blob-1 {
          background: radial-gradient(circle at 30% 40%, #FCA5A5, #EF4444, #9F1239, #7F1D1D, transparent 70%);
        }
        .blob-2 {
          background: radial-gradient(circle at 70% 60%, #FCA5A5, #DC2626, #9F1239, #7F1D1D, transparent 70%);
        }
        .blob-3 {
          background: radial-gradient(circle at 50% 50%, #F87171, #B91C1C, #991B1B, transparent 80%);
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.2); }
          66% { transform: translate(-30px, 30px) scale(0.8); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 20s infinite ease-in-out;
        }
        .animation-delay-2000 { animation-delay: -10s; }
        .animation-delay-4000 { animation-delay: -5s; }
      `}</style>
    </>
  );
};