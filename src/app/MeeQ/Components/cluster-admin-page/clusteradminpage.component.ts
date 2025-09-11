import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaces
interface ConferenceRoom {
  id: number;
  BuildingName: string;
  Floor: string;
  ConferenceRoomType: string;
  ConferenceRoomName: string;
  Capacity: number;
  isAvailable: boolean;
  imageUrl?: string;
}

interface Building {
  buildingName: string;
  rooms: ConferenceRoom[];
}

interface ClusterData {
  Cluster_ID: string;
  Buildings: ConferenceRoom[];
}

interface User {
  id: number;
  email: string;
  tempPassword: string;
  role: 'admin' | 'user';
  status: 'active' | 'pending' | 'inactive';
  dateAdded: Date;
}

@Component({
  selector: 'clusteradminpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clusteradminpage.component.html',
  styleUrls: ['./clusteradminpage.component.css'],
})
export class ClusteradminpageComponent implements OnInit {
  clusterData: ClusterData | null = null;
  groupedBuildings: Building[] = [];
  hoveredRoom: ConferenceRoom | null = null;
  tooltipPosition = { x: 0, y: 0 };
  showRoomModal = false;
  showUserModal = false;
  activeTab: 'buildings' | 'users' = 'buildings';
  
  newRoom: ConferenceRoom = {
    id: 0,
    BuildingName: '',
    Floor: '',
    ConferenceRoomType: 'Meeting Room',
    ConferenceRoomName: '',
    Capacity: 6,
    isAvailable: true,
    imageUrl: ''
  };

  newUser: User = {
    id: 0,
    email: '',
    tempPassword: '',
    role: 'user',
    status: 'pending',
    dateAdded: new Date()
  };

  users: User[] = [
    {
      id: 1,
      email: 'john.doe@company.com',
      tempPassword: 'temp123',
      role: 'admin',
      status: 'active',
      dateAdded: new Date('2024-01-15')
    },
    {
      id: 2,
      email: 'jane.smith@company.com',
      tempPassword: 'temp456',
      role: 'user',
      status: 'pending',
      dateAdded: new Date('2024-02-01')
    }
  ];

  // Sample data - replace with your actual data service
  private sampleData: ClusterData = {
    "Cluster_ID": "EDV_123",
    "Buildings": [
      {
        "id": 4962,
        "BuildingName": "Edveon Main",
        "Floor": "2nd floor",
        "ConferenceRoomType": "Conference Room",
        "ConferenceRoomName": "Innovate Hub",
        "Capacity": 12,
        "isAvailable": true,
        "imageUrl": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400"
      },
      {
        "id": 281,
        "BuildingName": "Edveon Main",
        "Floor": "3rd floor",
        "ConferenceRoomType": "Meeting Room",
        "ConferenceRoomName": "Creative Space",
        "Capacity": 8,
        "isAvailable": false,
        "imageUrl": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400"
      },
      {
        "id": 4791,
        "BuildingName": "Edveon Main",
        "Floor": "2nd floor",
        "ConferenceRoomType": "Conference Room",
        "ConferenceRoomName": "Strategy Room",
        "Capacity": 16,
        "isAvailable": true,
        "imageUrl": "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=400"
      },
      {
        "id": 837,
        "BuildingName": "Edveon Annex",
        "Floor": "1st floor",
        "ConferenceRoomType": "Meeting Room",
        "ConferenceRoomName": "Collaboration Zone",
        "Capacity": 6,
        "isAvailable": true,
        "imageUrl": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400"
      },
      {
        "id": 2186,
        "BuildingName": "Edveon Annex",
        "Floor": "2nd floor",
        "ConferenceRoomType": "Board Room",
        "ConferenceRoomName": "Executive Suite",
        "Capacity": 20,
        "isAvailable": false,
        "imageUrl": "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400"
      }
    ]
  };

  ngOnInit(): void {
    this.loadClusterData();
  }

  private loadClusterData(): void {
    // In a real app, this would be a service call
    this.clusterData = this.sampleData;
    this.groupBuildingsByName();
  }

  private groupBuildingsByName(): void {
    if (!this.clusterData?.Buildings) return;

    const buildingMap = new Map<string, ConferenceRoom[]>();
    
    this.clusterData.Buildings.forEach(room => {
      const buildingName = room.BuildingName;
      if (!buildingMap.has(buildingName)) {
        buildingMap.set(buildingName, []);
      }
      buildingMap.get(buildingName)!.push(room);
    });

    this.groupedBuildings = Array.from(buildingMap.entries()).map(([buildingName, rooms]) => ({
      buildingName,
      rooms: rooms.sort((a, b) => a.Floor.localeCompare(b.Floor))
    }));
  }

  // Statistics methods
  getTotalBuildings(): number {
    return this.groupedBuildings.length;
  }

  getTotalRooms(): number {
    return this.clusterData?.Buildings.length || 0;
  }

  // Room methods
  showRoomDetails(room: ConferenceRoom, event: MouseEvent): void {
    this.hoveredRoom = room;
    this.tooltipPosition = {
      x: event.clientX + 15,
      y: event.clientY - 10
    };
  }

  hideRoomDetails(): void {
    this.hoveredRoom = null;
  }

  editRoom(room: ConferenceRoom): void {
    console.log('Editing room:', room);
    // Implement edit functionality
  }

  toggleAvailability(room: ConferenceRoom): void {
    room.isAvailable = !room.isAvailable;
    console.log('Room availability toggled:', room);
    // In a real app, save to backend
  }

  showAddRoomModal(): void {
    this.showRoomModal = true;
    this.resetNewRoom();
  }

  hideAddRoomModal(): void {
    this.showRoomModal = false;
  }

  addNewRoom(): void {
    if (!this.clusterData) return;

    // Generate a unique ID
    this.newRoom.id = Math.floor(Math.random() * 10000);
    
    // Add to cluster data
    this.clusterData.Buildings.push({ ...this.newRoom });
    
    // Regroup buildings
    this.groupBuildingsByName();
    
    // Hide modal and reset form
    this.hideAddRoomModal();
    
    console.log('New room added:', this.newRoom);
  }

  private resetNewRoom(): void {
    this.newRoom = {
      id: 0,
      BuildingName: '',
      Floor: '',
      ConferenceRoomType: 'Meeting Room',
      ConferenceRoomName: '',
      Capacity: 6,
      isAvailable: true,
      imageUrl: ''
    };
  }

  getDefaultRoomImage(roomType: string): string {
    const imageMap: { [key: string]: string } = {
      'Conference Room': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
      'Meeting Room': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400',
      'Board Room': 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400'
    };
    return imageMap[roomType] || imageMap['Meeting Room'];
  }

  // User management methods
  showAddUserModal(): void {
    this.showUserModal = true;
    this.resetNewUser();
  }

  hideAddUserModal(): void {
    this.showUserModal = false;
  }

  addNewUser(): void {
    // Generate a unique ID
    this.newUser.id = Math.floor(Math.random() * 10000);
    this.newUser.dateAdded = new Date();
    
    // Add to users array
    this.users.push({ ...this.newUser });
    
    // Hide modal and reset form
    this.hideAddUserModal();
    
    console.log('New user added:', this.newUser);
    
    // In a real app, you would:
    // 1. Send invitation email
    // 2. Save to backend
    // 3. Handle API responses
  }

  private resetNewUser(): void {
    this.newUser = {
      id: 0,
      email: '',
      tempPassword: '',
      role: 'user',
      status: 'pending',
      dateAdded: new Date()
    };
  }

  generateTempPassword(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.newUser.tempPassword = password;
  }

  editUser(user: User): void {
    console.log('Editing user:', user);
    // Implement edit functionality
    // You could open a modal similar to add user but pre-filled with user data
  }

  removeUser(user: User): void {
    if (confirm(`Are you sure you want to remove ${user.email} from the cluster?`)) {
      const index = this.users.findIndex(u => u.id === user.id);
      if (index > -1) {
        this.users.splice(index, 1);
        console.log('User removed:', user);
        // In a real app, save to backend
      }
    }
  }

  resendInvite(user: User): void {
    console.log('Resending invite to:', user.email);
    // In a real app, trigger email service
    alert(`Invitation resent to ${user.email}`);
  }
}