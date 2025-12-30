export enum TabId {
  CONCEPT = 'concept',
  MECHANICS = 'mechanics',
  COMPONENTS = 'components',
  TRADE_OFFS = 'trade_offs',
  USE_CASES = 'use_cases',
  PROVIDERS = 'providers'
}

export interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ComponentType<any>;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}