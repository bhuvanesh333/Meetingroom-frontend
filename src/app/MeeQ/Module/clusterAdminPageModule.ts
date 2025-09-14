// Interfaces
export interface ConferenceRoom {
  id?: number;
  BuildingName: string;
  Floor: string;
  ConferenceRoomType: string;
  ConferenceRoomName: string;
  Capacity: number;
  isAvailable: boolean;
  imageUrl: string;
}

export interface Building {
  buildingName: string;
  rooms: ConferenceRoom[];
}

export interface ClusterData {
  Buildings: ConferenceRoom[];
}

export interface User {
  id: number;
  email: string;
  tempPassword: string;
  role: 'admin' | 'user';
  status: 'active' | 'pending' | 'inactive';
  dateAdded: Date;
}