export interface Survey {
  id: string;
  interviewee_name: string;
  whatsapp: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface SurveyResponse {
  id: string;
  survey_id: string;
  question_type: string;
  response_value: string;
  created_at: string;
}

export interface SurveyData {
  intervieweeName: string;
  packaging_rating: number | null;
  grace_midnight_tried: boolean | null;
  grace_midnight_rating: number | null;
  empire_woman_tried: boolean | null;
  empire_woman_rating: number | null;
  purchase_interest: string | null;
  whatsapp: string;
}
