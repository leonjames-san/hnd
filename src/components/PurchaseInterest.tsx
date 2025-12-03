interface PurchaseInterestProps {
  onSelect: (option: string) => void;
}

export default function PurchaseInterest({ onSelect }: PurchaseInterestProps) {
  const options = [
    {
      id: 'installment',
      label: 'Sim, com a condição de entrada (R$75 + R$75/30 dias)',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      id: 'cash',
      label: 'Sim, à vista (R$150,00)',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      id: 'maybe',
      label: 'Talvez, preciso pensar.',
      color: 'bg-yellow-500 hover:bg-yellow-600',
    },
    {
      id: 'no',
      label: 'Não, obrigado.',
      color: 'bg-red-500 hover:bg-red-600',
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Pergunta 4: Interesse de Compra
      </h2>
      <p className="text-gray-700 mb-6">
        O kit de perfumes custa R$ 150,00. Qual opção melhor se encaixa no seu
        interesse hoje?
      </p>

      <div className="bg-blue-50 rounded-xl p-6 mb-6">
        <h3 className="text-blue-900 font-bold text-lg mb-2">
          Kit Grace Midnight + Empire Woman (R$ 150,00)
        </h3>
        <p className="text-blue-700">Sua melhor opção de pagamento:</p>
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full ${option.color} text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg text-left`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
