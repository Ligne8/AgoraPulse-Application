import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://app.ligne8.live';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlLWRlbW8iLCJpYXQiOjE2NDE3NjkyMDAsImV4cCI6MTc5OTUzNTYwMH0.nw1CI_l_2GirWV0TVAjKyn8OC4TS8Bw2o3f9imIg_6M';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
