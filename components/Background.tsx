
import React from 'react';

export const Background: React.FC = () => {
  // Configuration for the slow, drifting streams
  const streams = [
    { animation: 'drift1', size: '40vw', top: '5vh', left: '-10vw', duration: '60s', delay: '0s' },
    { animation: 'drift2', size: '30vw', top: '60vh', left: '80vw', duration: '75s', delay: '-15s' },
    { animation: 'drift3', size: '50vw', top: '-20vh', left: '30vw', duration: '90s', delay: '-30s' },
    { animation: 'drift1', size: '25vw', top: '80vh', left: '10vw', duration: '80s', delay: '-45s' },
    { animation: 'drift2', size: '35vw', top: '20vh', left: '-5vw', duration: '70s', delay: '-60s' },
  ];

  return (
    <>
      <div className="absolute inset-0 -z-20 h-full w-full bg-gray-950 overflow-hidden">
          {/* New: Slow Drifting Blood Streams Animation */}
          <div className="absolute inset-0 z-[1] pointer-events-none">
            {streams.map((stream, i) => {
              const style: React.CSSProperties = {
                position: 'absolute',
                width: stream.size,
                height: stream.size,
                top: stream.top,
                left: stream.left,
                animationName: stream.animation,
                animationDuration: stream.duration,
                animationDelay: stream.delay,
              };
              return <div key={i} className="blood-stream" style={style}></div>;
            })}
          </div>

          {/* Existing Animated Blobs */}
          <div className="blob-1 absolute -top-1/4 left-0 w-1/2 h-1/2 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
          <div className="blob-2 absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          <div className="blob-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 h-2/5 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>
      <style>{`
        /* Slow, modern, transparent blood stream effect */
        .blood-stream {
          border-radius: 50%;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.15), transparent 60%);
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          filter: blur(20px);
          opacity: 0.6;
        }

        @keyframes drift1 {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20vw, 30vh) scale(1.1); }
          50% { transform: translate(5vw, 60vh) scale(0.9); }
          75% { transform: translate(-15vw, 30vh) scale(1.2); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @keyframes drift2 {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-25vw, 20vh) scale(0.8); }
          50% { transform: translate(-5vw, 70vh) scale(1.2); }
          75% { transform: translate(15vw, 40vh) scale(1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes drift3 {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(10vw, 40vh) scale(1.2); }
          50% { transform: translate(-10vw, 80vh) scale(0.8); }
          75% { transform: translate(5vw, 40vh) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }

        /* Original Blob Styling */
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
