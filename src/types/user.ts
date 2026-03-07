export type ThemeColor = 'emerald' | 'ocean' | 'sunset' | 'royal' | 'slate';

export interface UserProfile {
  name: string;
  theme: ThemeColor;
  isRegistered: boolean;
}