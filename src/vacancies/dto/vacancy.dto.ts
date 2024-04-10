export interface CreateVacancyDTO {
  id: number;

  title: string;

  description: string;

  url: string;

  status: string;

  comment: string;

  workLocation: string;

  testType: string;

  isActive: 'on' | 'off';

  isFavorite: 'on' | 'off';

  company: string;
}
