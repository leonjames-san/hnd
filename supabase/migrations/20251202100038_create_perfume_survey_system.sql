/*
  # Sistema de Pesquisa de Perfumes

  1. Tabelas
    - `surveys`
      - `id` (uuid, primary key)
      - `interviewee_name` (text)
      - `whatsapp` (text)
      - `created_at` (timestamptz)
      - `completed_at` (timestamptz)
      
    - `survey_responses`
      - `id` (uuid, primary key)
      - `survey_id` (uuid, foreign key)
      - `question_type` (text)
      - `response_value` (text)
      - `created_at` (timestamptz)

  2. Segurança
    - RLS habilitado em todas as tabelas
    - Políticas para acesso público (sistema de pesquisa aberto)
*/

CREATE TABLE IF NOT EXISTS surveys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interviewee_name text NOT NULL,
  whatsapp text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id uuid NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  question_type text NOT NULL,
  response_value text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on surveys"
  ON surveys FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public select on surveys"
  ON surveys FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public update on surveys"
  ON surveys FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public insert on survey_responses"
  ON survey_responses FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public select on survey_responses"
  ON survey_responses FOR SELECT
  TO anon
  USING (true);
