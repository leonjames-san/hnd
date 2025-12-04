import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface FragranceInfoProps {
  fragranceName: string;
  onNext: () => void;
}

export default function FragranceInfo({ fragranceName, onNext }: FragranceInfoProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div
              onClick={() => setSelectedImage('https://crescersempremais.com.br/wp-content/uploads/2025/12/La-vie-est-belle.webp')}
              className="cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-2 shadow-sm hover:shadow-md transition-all">
                <img
                  src="https://crescersempremais.com.br/wp-content/uploads/2025/12/La-vie-est-belle.webp"
                  alt="La Vie Est Belle"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="font-semibold text-gray-900 text-sm">La Vie Est Belle</p>
              <p className="text-gray-700 text-xs">Lancôme (100ml)</p>
              <p className="text-gray-600 text-xs mt-1">R$ 535 a R$ 950</p>
            </div>

            <div
              onClick={() => setSelectedImage('https://crescersempremais.com.br/wp-content/uploads/2025/12/Black-opium.jpg')}
              className="cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-2 shadow-sm hover:shadow-md transition-all">
                <img
                  src="https://crescersempremais.com.br/wp-content/uploads/2025/12/Black-opium.jpg"
                  alt="Black Opium"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="font-semibold text-gray-900 text-sm">Black Opium</p>
              <p className="text-gray-700 text-xs">Yves Saint Laurent (90ml)</p>
              <p className="text-gray-600 text-xs mt-1">R$ 760 a R$ 1.090</p>
            </div>

            <div
              onClick={() => setSelectedImage('https://crescersempremais.com.br/wp-content/uploads/2025/12/Googd-Girl-Carolina-Herrera.jpg')}
              className="cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-2 shadow-sm hover:shadow-md transition-all">
                <img
                  src="https://crescersempremais.com.br/wp-content/uploads/2025/12/Googd-Girl-Carolina-Herrera.jpg"
                  alt="Good Girl"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="font-semibold text-gray-900 text-sm">Good Girl</p>
              <p className="text-gray-700 text-xs">Carolina Herrera (30ml)</p>
              <p className="text-gray-600 text-xs mt-1">R$ 415</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">Clique nas imagens para visualizar em tamanho maior</p>
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

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={28} />
            </button>
            <img
              src={selectedImage}
              alt="Visualização completa"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
