export enum KakeiType {
  Plus = 1,Minus = -1
}
export interface KakeiItem {
  amount: number;
  name: string;
  ktype: KakeiType;
  date: Date;
}
