// lib\definitions.ts
export interface User {
  UserName: string;
  UserID: string;
  DeviceCompany: string;
}

export interface UserSleepMarker {
  HRVDate: string;
  SleepOnset: string;
  WakeUpTime: string;
  Awake: string;
  Light: string;
  Deep: string;
}

export interface UserAnalysis {
  HRVDate: string;
  VitalzScore: string;
  ScoreType: string;
  StressorIndex: string;
}
