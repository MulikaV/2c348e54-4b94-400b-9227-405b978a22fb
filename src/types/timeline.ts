import { LucideIcon } from 'lucide-react';

export interface TimelineItem {
  title: string;
  description: string;
  video?: string;
  image?: string;
  mobileImage?: string;
}

export interface StackTimelineItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ProcessTimelineListItem {
  icon: LucideIcon;
  text: string;
}

export interface ProcessTimelineItem {
  id: string;
  title: string;
  description: string;
  image: string;
  items: ProcessTimelineListItem[];
  reverse: boolean;
}

export interface ProcessTimelineProps {
  items: ProcessTimelineItem[];
  className?: string;
}