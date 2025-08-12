
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChallengeDisplayProps {
  challenge: string;
  onBack: () => void;
}

const ChallengeDisplay = ({ challenge, onBack }: ChallengeDisplayProps) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] animate-scale-in">
      <Card className="w-full max-w-2xl mx-4 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl border border-gray-700">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl md:text-4xl font-bold text-white">
            🍻 Seu Desafio!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 rounded-lg shadow-lg border border-amber-500">
            <p className="text-white text-xl md:text-2xl font-medium text-center leading-relaxed">
              {challenge}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onBack}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-3 px-6 text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-amber-500"
            >
              🎯 Novo Desafio
            </Button>
            
            <Button
              variant="outline"
              className="border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-gray-900 font-bold py-3 px-6 text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 bg-transparent"
              onClick={() => {
                // Aqui você pode adicionar funcionalidade para compartilhar
                if (navigator.share) {
                  navigator.share({
                    title: 'Roleta dos Desafios',
                    text: `Meu desafio: ${challenge}`,
                  });
                }
              }}
            >
              📱 Compartilhar
            </Button>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Aceite o desafio e divirta-se com responsabilidade! 🥃
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengeDisplay;
