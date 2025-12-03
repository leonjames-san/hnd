import { Copy, MessageCircle } from 'lucide-react';
import { SurveyData } from '../types/survey';

interface SurveySummaryProps {
  surveyData: SurveyData;
  onCopy: () => void;
  onWhatsApp: () => void;
}

export default function SurveySummary({
  surveyData,
  onCopy,
  onWhatsApp,
}: SurveySummaryProps) {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const getPurchaseInterestLabel = (value: string | null) => {
    switch (value) {
      case 'installment':
        return 'Sim, com entrada (R$75 + R$75/30 dias)';
      case 'cash':
        return 'Sim, à vista (R$150,00)';
      case 'maybe':
        return 'Talvez, preciso pensar';
      case 'no':
        return 'Não, obrigado';
      default:
        return 'Não respondeu';
    }
  };

  const summaryText = `*Seu Perfil de Aroma Exclusivo*

👤 Pessoa: ${surveyData.intervieweeName}
📱 Contato: ${surveyData.whatsapp}
📅 Data/Hora: ${currentDate} ${currentTime}

--- Seu Resultado ---
📦 Q1. Embalagem (1-5): ${surveyData.packaging_rating || 'N/A'}
💧 Q2. Grace Midnight (1-5): ${surveyData.grace_midnight_rating || 'Não experimentou'}
💧 Q3. Empire Woman (1-5): ${surveyData.empire_woman_rating || 'Não experimentou'}
💰 Q4. Interesse de Compra: ${getPurchaseInterestLabel(surveyData.purchase_interest)}

*Obrigado por explorar nosso mundo de fragrâncias!*`;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Experiência Concluída!
      </h2>
      <p className="text-gray-600 mb-6">Obrigado por descobrir seus perfumes ideais com a gente</p>

      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
        <h3 className="text-green-800 font-bold text-lg mb-4">
          Seu Perfil Sensorial! Copie o resumo abaixo:
        </h3>
        <div className="bg-white rounded-lg p-4 border border-green-200">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
            {summaryText}
          </pre>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onCopy}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Copy className="h-5 w-5" />
          Copiar Resultado
        </button>
        <button
          onClick={onWhatsApp}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <MessageCircle className="h-5 w-5" />
          Abrir WhatsApp
        </button>
      </div>
    </div>
  );
}
