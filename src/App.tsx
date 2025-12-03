import { useState } from 'react';
import { supabase } from './lib/supabase';
import { SurveyData } from './types/survey';
import WelcomeScreen from './components/WelcomeScreen';
import RatingQuestion from './components/RatingQuestion';
import FragranceTest from './components/FragranceTest';
import PurchaseInterest from './components/PurchaseInterest';
import ContactCollection from './components/ContactCollection';
import SurveySummary from './components/SurveySummary';

type Step =
  | 'welcome'
  | 'packaging'
  | 'grace-test'
  | 'grace-rating'
  | 'empire-test'
  | 'empire-rating'
  | 'purchase'
  | 'contact'
  | 'summary';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [surveyId, setSurveyId] = useState<string>('');
  const [surveyData, setSurveyData] = useState<SurveyData>({
    intervieweeName: '',
    packaging_rating: null,
    grace_midnight_tried: null,
    grace_midnight_rating: null,
    empire_woman_tried: null,
    empire_woman_rating: null,
    purchase_interest: null,
    whatsapp: '',
  });

  const startSurvey = async (name: string) => {
    const { data, error } = await supabase
      .from('surveys')
      .insert({ interviewee_name: name })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error creating survey:', error);
      return;
    }

    if (data) {
      setSurveyId(data.id);
      setSurveyData({ ...surveyData, intervieweeName: name });
      setCurrentStep('packaging');
    }
  };

  const saveResponse = async (questionType: string, responseValue: string) => {
    await supabase.from('survey_responses').insert({
      survey_id: surveyId,
      question_type: questionType,
      response_value: responseValue,
    });
  };

  const handlePackagingRating = (rating: number) => {
    setSurveyData({ ...surveyData, packaging_rating: rating });
    saveResponse('packaging_rating', rating.toString());
    setCurrentStep('grace-test');
  };

  const handleGraceTest = (tried: boolean) => {
    setSurveyData({ ...surveyData, grace_midnight_tried: tried });
    saveResponse('grace_midnight_tried', tried.toString());
    if (tried) {
      setCurrentStep('grace-rating');
    } else {
      setCurrentStep('empire-test');
    }
  };

  const handleGraceRating = (rating: number) => {
    setSurveyData({ ...surveyData, grace_midnight_rating: rating });
    saveResponse('grace_midnight_rating', rating.toString());
    setCurrentStep('empire-test');
  };

  const handleEmpireTest = (tried: boolean) => {
    setSurveyData({ ...surveyData, empire_woman_tried: tried });
    saveResponse('empire_woman_tried', tried.toString());
    if (tried) {
      setCurrentStep('empire-rating');
    } else {
      setCurrentStep('purchase');
    }
  };

  const handleEmpireRating = (rating: number) => {
    setSurveyData({ ...surveyData, empire_woman_rating: rating });
    saveResponse('empire_woman_rating', rating.toString());
    setCurrentStep('purchase');
  };

  const handlePurchaseInterest = (option: string) => {
    setSurveyData({ ...surveyData, purchase_interest: option });
    saveResponse('purchase_interest', option);
    setCurrentStep('contact');
  };

  const handleContactSubmit = async (whatsapp: string) => {
    setSurveyData({ ...surveyData, whatsapp });
    await supabase
      .from('surveys')
      .update({ whatsapp, completed_at: new Date().toISOString() })
      .eq('id', surveyId);
    setCurrentStep('summary');
  };

  const handleCopy = () => {
    const summaryText = `*Relatório de Entrevista de Produto*

👤 Entrevistado: ${surveyData.intervieweeName}
📱 WhatsApp: ${surveyData.whatsapp}
📅 Data/Hora: ${new Date().toLocaleString('pt-BR')}

--- Resultados ---
📦 Q1. Embalagem (1-5): ${surveyData.packaging_rating || 'N/A'}
💧 Q2. Grace Midnight (1-5): ${surveyData.grace_midnight_rating || 'Não experimentou'}
💧 Q3. Empire Woman (1-5): ${surveyData.empire_woman_rating || 'Não experimentou'}
💰 Q4. Interesse de Compra: ${surveyData.purchase_interest || 'N/A'}

*Fim do Relatório.*`;

    navigator.clipboard.writeText(summaryText);
    alert('Resumo copiado para a área de transferência!');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá ${surveyData.intervieweeName}! Obrigado por participar da nossa pesquisa de perfumes.`
    );
    window.open(`https://wa.me/${surveyData.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (currentStep === 'welcome') {
    return <WelcomeScreen onStart={startSurvey} />;
  }

  if (currentStep === 'summary') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-blue-600">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
                Descobrindo sua melhor essência
              </h1>
              <p className="text-gray-500 text-center text-sm mb-4">
                Data: {currentDate} | Hora: {currentTime}
              </p>
              <p className="text-gray-700 text-center font-semibold mb-8">
                Entrevistado: {surveyData.intervieweeName}
              </p>

              <SurveySummary
                surveyData={surveyData}
                onCopy={handleCopy}
                onWhatsApp={handleWhatsApp}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-blue-600">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
              Descobrindo sua melhor essência
            </h1>
            <p className="text-gray-500 text-center text-sm mb-4">
              Data: {currentDate} | Hora: {currentTime}
            </p>
            <p className="text-gray-700 text-center font-semibold mb-8">
              Entrevistado: {surveyData.intervieweeName}
            </p>

            {currentStep === 'packaging' && (
              <RatingQuestion
                question="Pergunta 1: O que você achou da apresentação do produto, ou seja, da embalagem?"
                productName="Kit de Perfumes"
                rating={surveyData.packaging_rating}
                onRate={handlePackagingRating}
                productColor="bg-blue-600"
              />
            )}

            {currentStep === 'grace-test' && (
              <FragranceTest
                fragranceName="Grace Midnight"
                color="pink"
                onTry={() => handleGraceTest(true)}
                onSkip={() => handleGraceTest(false)}
              />
            )}

            {currentStep === 'grace-rating' && (
              <RatingQuestion
                question="Pergunta 2: Que nota você dá para o perfume Grace Midnight?"
                rating={surveyData.grace_midnight_rating}
                onRate={handleGraceRating}
                productColor="bg-pink-600"
              />
            )}

            {currentStep === 'empire-test' && (
              <FragranceTest
                fragranceName="Empire Woman"
                color="orange"
                onTry={() => handleEmpireTest(true)}
                onSkip={() => handleEmpireTest(false)}
              />
            )}

            {currentStep === 'empire-rating' && (
              <RatingQuestion
                question="Pergunta 3: Que nota você dá para o perfume Empire Woman?"
                rating={surveyData.empire_woman_rating}
                onRate={handleEmpireRating}
                productColor="bg-orange-600"
              />
            )}

            {currentStep === 'purchase' && (
              <PurchaseInterest onSelect={handlePurchaseInterest} />
            )}

            {currentStep === 'contact' && (
              <ContactCollection onSubmit={handleContactSubmit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
