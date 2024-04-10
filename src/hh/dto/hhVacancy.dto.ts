export interface HHVacancyDTO {
  id: string;
  premium: boolean;
  name: string;
  has_test: boolean;
  response_letter_required: boolean;
  area: { id: string; name: string; url: string };
  salary: {
    from: number;
    to: number;
    currency: 'USD' | 'RUB' | 'EUR';
    gross: boolean;
  };
  address: {
    city: string;
    street: string;
    building: string;
    lat: number;
    lng: number;
    description: string;
    raw: string;
    metro: string;
    metro_stations: string[];
    id: string;
  };
  response_url: string;
  sort_point_distance: string;
  published_at: Date;
  created_at: Date;
  archived: boolean;
  apply_alternate_url: string;
  show_logo_in_search: boolean;
  insider_interview: string;
  url: string;
  alternate_url: string;
  relations: string[];
  employer: {
    id: string;
    name: string;
    url: string;
    alternate_url: string;
    logo_urls: {
      '90': string;
      '240': string;
      original: string;
    };
    vacancies_url: string;
    accredited_it_employer: boolean;
    trusted: boolean;
  };
  snippet: {
    requirement: string;
    responsibility: string;
  };
  contacts: string;
  schedule: { id: string; name: string };
  working_days: string[];
  working_time_intervals: string[];
  working_time_modes: string[];
  accept_temporary: boolean;
  professional_roles: Array<{ id: string; name: string }>;
  accept_incomplete_resumes: boolean;
  experience: { id: string; name: string };
  employment: { id: string; name: string };
  adv_response_url: string;
  is_adv_vacancy: boolean;
  adv_context: string;
}
