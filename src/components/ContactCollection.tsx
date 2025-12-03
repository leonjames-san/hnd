import { useState } from 'react';
import { Phone } from 'lucide-react';

interface ContactCollectionProps {
  onSubmit: (whatsapp: string) => void;
}

export default function ContactCollection({ onSubmit }: ContactCollectionProps) {
  const [whatsapp, setWhatsapp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(whatsapp);
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Coleta de Contato</h2>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Quase Terminando!
      </h3>
      <p className="text-gray-600 mb-6">
        Por favor, insira o WhatsApp do entrevistado para contato futuro:
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3">
            WhatsApp do Entrevistado:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
              placeholder="(91) 99999-9999"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Finalizar e Ver Resumo
        </button>
      </form>
    </div>
  );
}
