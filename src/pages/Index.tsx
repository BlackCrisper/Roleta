
import SpinWheel from "@/components/SpinWheel";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in">
            Roleta dos
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {" "}Desafios
            </span>
          </h1>
          <p className="text-xl text-gray-400 animate-fade-in">
            Para maiores de 18 anos • Beba com responsabilidade
          </p>
        </div>
        <SpinWheel />
      </div>
    </div>
  );
};

export default Index;
