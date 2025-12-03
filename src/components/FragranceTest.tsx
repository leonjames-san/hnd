interface FragranceTestProps {
  fragranceName: string;
  color: string;
  onTry: () => void;
  onSkip: () => void;
}

export default function FragranceTest({
  fragranceName,
  color,
  onTry,
  onSkip,
}: FragranceTestProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Próximo Passo:</h2>
      <p className={`text-${color}-600 text-lg font-semibold mb-6`}>
        Experimente a fragrância {fragranceName}
      </p>

      <div className="flex gap-4">
        <button
          onClick={onTry}
          className={`flex-1 bg-${color}-600 hover:bg-${color}-700 text-white font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg`}
        >
          Experimentei
        </button>
        <button
          onClick={onSkip}
          className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-4 rounded-xl transition-all"
        >
          Não, obrigado
        </button>
      </div>
    </div>
  );
}
