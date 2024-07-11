import fs from 'fs/promises';
import path from 'path';
import { User, UserSleepMarker, UserAnalysis } from '../lib/definitions';

// Type guard for User
function isValidUser(obj: any): obj is User {
  return (
    typeof obj === 'object' &&
    typeof obj.UserName === 'string' &&
    (typeof obj.UserID === 'string' || obj.UserID === undefined) &&
    typeof obj.DeviceCompany === 'string'
  );
}

// Type guard for UserSleepMarker
function isValidUserSleepMarker(obj: any): obj is UserSleepMarker {
  return (
    typeof obj === 'object' &&
    typeof obj.HRVDate === 'string' &&
    typeof obj.SleepOnset === 'string' &&
    typeof obj.WakeUpTime === 'string' &&
    !isNaN(parseFloat(obj.Awake)) &&
    !isNaN(parseFloat(obj.Light)) &&
    !isNaN(parseFloat(obj.Deep))
  );
}

// Type guard for UserAnalysis
function isValidUserAnalysis(obj: any): obj is UserAnalysis {
  return (
    typeof obj === 'object' &&
    typeof obj.HRVDate === 'string' &&
    typeof obj.VitalzScore === 'string' &&
    typeof obj.ScoreType === 'string' &&
    typeof obj.StressorIndex === 'string'
  );
}

async function fetchWithFallback(url: string, fallbackFilePath: string, isValid: (obj: any) => boolean) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('API call failed');
    const data = await res.json();

    
    // console.log('Response data:', data);
    console.log('Response data ' + url);

    return data.filter(isValid); // Filter invalid data
  } catch (error) {
    try {
      const data = await fs.readFile(path.resolve(fallbackFilePath), 'utf-8');
      const parsedData = JSON.parse(data);

      // Debug log for fallback data
      // console.log('Fallback data:', parsedData);
      console.log('Fallback data ' + url);

      return parsedData.filter(isValid); // Filter invalid data
    } catch (fallbackError) {
      console.error(`Fallback file read failed: ${fallbackFilePath}`, fallbackError);
      throw new Error('Both API call and fallback file read failed');
    }
  }
}

export async function fetchUserList() {
  const url = "https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserList";
  const fallbackFilePath = './data/getUserList.json';
  return fetchWithFallback(url, fallbackFilePath, isValidUser);
}

export async function fetchUserAnalysis(userID: string) {
  const url = `https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserAnalysis?userID=${userID}`;
  const fallbackFilePath = `./data/getUserAnalysis/${encodeURIComponent(userID)}.json`;
  return fetchWithFallback(url, fallbackFilePath, isValidUserAnalysis);
}

export async function fetchUserSleepData(userID: string) {
  const url = `https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserSleepMarker?userID=${userID}`;
  const fallbackFilePath = `./data/getUserSleepMarker/${encodeURIComponent(userID)}.json`;
  return fetchWithFallback(url, fallbackFilePath, isValidUserSleepMarker);
}

export async function fetchUserById(userID: string): Promise<User | null> {
  const users: User[] = await fetchUserList();
  return users.find((user: User) => user.UserID === userID) || null;
}
