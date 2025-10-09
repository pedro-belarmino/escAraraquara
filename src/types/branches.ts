export type Branch = 'Filhote' | 'Lobinho' | 'Escoteiro' | 'Sênior' | 'Pioneiro';

export type Section =
  | 'Ramo Filhote'
  | 'Alcateia Mogli'
  | 'Alcateia Hati'
  | 'Tropa Caiapós'
  | 'Tropa Xavantes'
  | 'Tropa Guarani'
  | 'Tropa Sênior'
  | 'Clã Guardiões do Sol';

export const branchesAndSections = {
  Filhote: {
    ageRange: '5-6',
    sections: ['Ramo Filhote'],
    period: 'Afternoon',
  },
  Lobinho: {
    ageRange: '7-9',
    sections: ['Alcateia Mogli', 'Alcateia Hati'],
    period: 'Morning, Afternoon',
  },
  Escoteiro: {
    ageRange: '10-13',
    sections: ['Tropa Caiapós', 'Tropa Xavantes', 'Tropa Guarani'],
    period: 'Morning, Afternoon',
  },
  Sênior: {
    ageRange: '14-17',
    sections: ['Tropa Sênior'],
    period: 'Afternoon',
  },
  Pioneiro: {
    ageRange: '18-22 (incomplete)',
    sections: ['Clã Guardiões do Sol'],
    period: 'Afternoon',
  },
};