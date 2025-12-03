interface RatingQuestionProps {
  question: string;
  productName?: string;
  rating: number | null;
  onRate: (rating: number) => void;
  productColor?: string;
  imageUrl?: string;
}

export default function RatingQuestion({
  question,
  productName,
  rating,
  onRate,
  productColor = 'bg-blue-600',
  imageUrl,
}: RatingQuestionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{question}</h2>
      <p className="text-gray-600 text-sm mb-6">
        Nota de 1 (Não gostei) a 5 (Gostei muito).
      </p>

      {imageUrl ? (
        <div className="mb-6 flex justify-center">
          <img
            src={imageUrl}
            alt={productName || 'Produto'}
            className="h-48 object-contain rounded-lg shadow-lg"
          />
        </div>
      ) : productName ? (
        <div
          className={`${productColor} text-white rounded-2xl p-12 mb-6 text-center shadow-lg`}
        >
          <h3 className="text-3xl font-bold">{productName}</h3>
        </div>
      ) : null}

      <div className="flex gap-3 justify-center">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => onRate(value)}
            className={`w-16 h-16 rounded-xl font-bold text-lg transition-all ${
              rating === value
                ? 'bg-blue-600 text-white shadow-lg scale-110'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
