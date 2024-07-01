import { Feedback } from '@/lib/hooks';
import { clsx, type ClassValue } from 'clsx';
import {
  CalendarSearch,
  CircleUserRound,
  Library,
  LucideProps,
  SignalHigh,
  Text,
  Type,
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type RelationPair = {
  includes: string;
  excludes: string;
};
type FeedbackDisplay = {
  display: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  triggerDialog?: boolean;
  subfilters?: string[];
  relations: RelationPair;
};

export type FilterConfig = Record<keyof Feedback, FeedbackDisplay>;
export const filterConfig: FilterConfig = {
  name: {
    display: 'Name',
    icon: Type,
    triggerDialog: true,
    relations: {
      includes: 'contains',
      excludes: 'does not contain',
    },
  },
  description: {
    display: 'Description',
    icon: Text,
    triggerDialog: true,
    relations: {
      includes: 'contains',
      excludes: 'does not contain',
    },
  },
  importance: {
    display: 'Importance',
    icon: SignalHigh,
    subfilters: ['High', 'Medium', 'Low'],
    relations: {
      includes: 'includes',
      excludes: 'does not include',
    },
  },
  type: {
    display: 'Type',
    icon: Library,
    subfilters: ['Sales', 'Customer', 'Research'],
    relations: {
      includes: 'includes',
      excludes: 'does not include',
    },
  },
  customer: {
    display: 'Customer',
    icon: CircleUserRound,
    subfilters: ['Loom', 'Ramp', 'Brex', 'Vanta', 'Notion', 'Linear', 'OpenAI'],
    relations: {
      includes: 'includes',
      excludes: 'does not include',
    },
  },
  date: {
    display: 'Date',
    icon: CalendarSearch,
    relations: {
      includes: 'on',
      excludes: 'not on',
    },
  },
};
