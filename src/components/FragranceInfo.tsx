import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FragranceInfoProps {
  fragranceName: string;
  onNext: () => void;
}

export default function FragranceInfo({ fragranceName, onNext }: FragranceInfoProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  const sections = [
    {
      id: 'notes',
      title: '1 - Notas Olfativas',
      content: (
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-gray-900 mb-2">Notas de topo:</p>
            <p className="text-gray-700">Tangerina, maçã e framboesa, trazendo frescor e doçura inicial.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">Notas de coração:</p>
            <p className="text-gray-700">Rosa, jasmim e lírio-do-vale (muguet), que fornecem um bouquet floral delicado e elegante.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">Notas de fundo:</p>
            <p className="text-gray-700">Sândalo, baunilha e almíscar (musk), conferindo um acabamento quente, amadeirado e sedutor.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'profile',
      title: '2 - Perfil e Indicação',
      content: (
        <p className="text-gray-700">
          Grace Midnight exala a exuberância do universo feminino com uma fragrância intensa e doce, indicada para mulheres que querem destacar sua presença com sofisticação. É muito apreciada para festas, encontros e eventos noturnos, com boa fixação na pele.
        </p>
      ),
    },
    {
      id: 'recognition',
      title: '3 - Reconhecimentos e Produção',
      content: (
        <p className="text-gray-700">
          Criada pela perfumista Elisabeth Meier, esta fragrância foi vencedora do prêmio "Criação Perfumista Latino-Americana Feminina" no Prêmio Atualidade Cosmética 2016. A linha Hinode é conhecida pela alta qualidade e embalagens elegantes, buscando constante aprimoramento em suas técnicas de produção.
        </p>
      ),
    },
    {
      id: 'similar',
      title: '4 - Semelhança Olfativa',
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-gray-900">La Vie Est Belle Lancôme (100ml)</p>
            <p className="text-gray-700">R$ 535 a R$ 950</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Black Opium Yves Saint Laurent (90ml)</p>
            <p className="text-gray-700">R$ 760 a R$ 1.090</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Good Girl Carolina Herrera (30ml)</p>
            <p className="text-gray-700">Preço médio R$ 415</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Informações sobre {fragranceName}
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        A fragrância Grace Midnight da Hinode é uma colônia feminina doce e envolvente, criada para mulheres sensuais e marcantes. Ela combina notas frutadas e florais com um toque sofisticado e amadeirado, ideal para uso noturno e ocasiões especiais.
      </p>

      <div className="space-y-3 mb-8">
        {sections.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-gray-900 text-left">{section.title}</span>
              <ChevronDown
                size={20}
                className={`text-gray-500 transition-transform ${
                  expanded === section.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expanded === section.id && (
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
      >
        Continuar
      </button>
    </div>
  );
}
