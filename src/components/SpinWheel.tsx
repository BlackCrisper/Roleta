
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ChallengeDisplay from "./ChallengeDisplay";
import { challenges } from "@/utils/challenges";

const SpinWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showChallenge, setShowChallenge] = useState(false);

  const segmentAngle = 360 / challenges.length;

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowChallenge(false);
    setSelectedChallenge(null);

    // Gera rotação aleatória (mínimo 5 voltas completas + posição aleatória)
    const minSpins = 5;
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + (minSpins * 360) + randomAngle;
    
    setRotation(totalRotation);

    // Calcula qual desafio foi selecionado
    const normalizedAngle = (360 - (totalRotation % 360)) % 360;
    const selectedIndex = Math.floor(normalizedAngle / segmentAngle);
    const challenge = challenges[selectedIndex];

    // Para a animação e mostra o resultado após 3 segundos
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedChallenge(challenge);
      setTimeout(() => {
        setShowChallenge(true);
      }, 500);
    }, 3000);
  };

  const resetWheel = () => {
    setShowChallenge(false);
    setSelectedChallenge(null);
  };

  if (showChallenge && selectedChallenge) {
    return (
      <ChallengeDisplay 
        challenge={selectedChallenge} 
        onBack={resetWheel}
      />
    );
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      <Card className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden bg-gray-900 shadow-2xl border border-gray-700">
        {/* Ponteiro */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-amber-500 drop-shadow-lg"></div>
        </div>

        {/* Roleta */}
        <div 
          className={`w-full h-full relative transition-transform duration-3000 ease-out ${
            isSpinning ? 'animate-pulse' : ''
          }`}
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transitionDuration: isSpinning ? '3s' : '0.5s'
          }}
        >
          {challenges.map((challenge, index) => {
            const startAngle = index * segmentAngle;
            const colors = [
              'bg-gray-800', 'bg-gray-700', 'bg-slate-800', 'bg-slate-700',
              'bg-zinc-800', 'bg-zinc-700', 'bg-neutral-800', 'bg-neutral-700'
            ];
            
            return (
              <div
                key={index}
                className={`absolute w-full h-full ${colors[index % colors.length]} hover:brightness-125 transition-all duration-200 border-gray-600`}
                style={{
                  clipPath: `polygon(50% 50%, ${
                    50 + 45 * Math.cos((startAngle - 90) * Math.PI / 180)
                  }% ${
                    50 + 45 * Math.sin((startAngle - 90) * Math.PI / 180)
                  }%, ${
                    50 + 45 * Math.cos((startAngle + segmentAngle - 90) * Math.PI / 180)
                  }% ${
                    50 + 45 * Math.sin((startAngle + segmentAngle - 90) * Math.PI / 180)
                  }%)`,
                  borderWidth: '1px'
                }}
              >
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `rotate(${startAngle + segmentAngle/2}deg)`,
                    transformOrigin: '50% 50%'
                  }}
                >
                  <span 
                    className="text-white font-semibold text-xs md:text-sm text-center px-2 transform -rotate-90"
                    style={{ 
                      transform: `translateY(-60px) rotate(-${startAngle + segmentAngle/2}deg)`,
                      maxWidth: '80px',
                      lineHeight: '1.2'
                    }}
                  >
                    {challenge.length > 20 ? challenge.substring(0, 20) + '...' : challenge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centro da roleta */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-amber-500 rounded-full border-4 border-gray-800 shadow-lg z-10 flex items-center justify-center">
          <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
        </div>
      </Card>

      <Button
        onClick={spinWheel}
        disabled={isSpinning}
        className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-4 px-8 text-xl rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-amber-500"
      >
        {isSpinning ? (
          <span className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Girando...</span>
          </span>
        ) : (
          "🍻 GIRAR ROLETA"
        )}
      </Button>

      {selectedChallenge && !showChallenge && (
        <div className="text-center animate-fade-in">
          <p className="text-gray-400 text-lg">Desafio selecionado:</p>
          <p className="text-amber-400 font-bold text-xl">{selectedChallenge}</p>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
