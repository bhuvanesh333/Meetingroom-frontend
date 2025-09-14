import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Building, ClusterData, ConferenceRoom, User } from '../../Module/clusterAdminPageModule';
import { ClusterAdminPageService } from '../../Services/ClusterAdminService/clusterAdminPageService';

@Component({
  selector: 'clusteradminpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clusteradminpage.component.html',
  styleUrls: ['./clusteradminpage.component.css'],
})
export class ClusteradminpageComponent implements OnInit {
  ClusterId: string = '';
  clusterData: ClusterData | null = null;
  groupedBuildings: Building[] = [];
  filteredBuildings: Building[] = [];
  hoveredRoom: ConferenceRoom | null = null;
  tooltipPosition = { x: 0, y: 0 };
  showRoomModal = false;
  showUserModal = false;
  activeTab: 'buildings' | 'users' = 'buildings';
  editRoomModal: boolean = false;
  
  // Filter properties
  roomNameFilter: string = '';
  buildingFilter: string = '';
  floorFilter: string = '';
  roomTypeFilter: string = '';
  availabilityFilter: string = 'all'; // 'all', 'available', 'unavailable'
  capacityFilter: string = 'all'; // 'all', 'small', 'medium', 'large'

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

  constructor(private clusterAdminPageService: ClusterAdminPageService) { }

  ngOnInit(): void {
    this.loadClusterData();
  }

  private loadClusterData(): void {
    this.ClusterId = localStorage.getItem("ClusterId") || '';
    this.get_render_buildings();
  }

  private get_render_buildings(): void {
    this.clusterAdminPageService.ClusterGetConferenceRoom(this.ClusterId).subscribe({
      next: (response) => {
        if (response.ok) {
          this.clusterData = response.body?.data as ClusterData;
          console.log(this.clusterData);
          this.groupBuildingsByName();
          this.applyFilters();
        }
      },
      error: (error) => {
        console.error('Error loading buildings:', error);
        if (error.status == 401) {
          alert('Internal Server Error');
        }
      }
    });
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

  // Filter methods
  applyFilters(): void {
    if (!this.groupedBuildings.length) {
      this.filteredBuildings = [];
      return;
    }

    this.filteredBuildings = this.groupedBuildings.map(building => {
      const filteredRooms = building.rooms.filter(room => {
        // Room name filter
        if (this.roomNameFilter && !room.ConferenceRoomName.toLowerCase().includes(this.roomNameFilter.toLowerCase())) {
          return false;
        }

        // Building filter
        if (this.buildingFilter && !room.BuildingName.toLowerCase().includes(this.buildingFilter.toLowerCase())) {
          return false;
        }

        // Floor filter
        if (this.floorFilter && !room.Floor.toLowerCase().includes(this.floorFilter.toLowerCase())) {
          return false;
        }

        // Room type filter
        if (this.roomTypeFilter && room.ConferenceRoomType !== this.roomTypeFilter) {
          return false;
        }

        // Availability filter
        if (this.availabilityFilter !== 'all') {
          if (this.availabilityFilter === 'available' && !room.isAvailable) return false;
          if (this.availabilityFilter === 'unavailable' && room.isAvailable) return false;
        }

        // Capacity filter
        if (this.capacityFilter !== 'all') {
          if (this.capacityFilter === 'small' && room.Capacity > 8) return false;
          if (this.capacityFilter === 'medium' && (room.Capacity <= 8 || room.Capacity > 15)) return false;
          if (this.capacityFilter === 'large' && room.Capacity <= 15) return false;
        }

        return true;
      });

      return {
        buildingName: building.buildingName,
        rooms: filteredRooms
      };
    }).filter(building => building.rooms.length > 0);
  }

  clearFilters(): void {
    this.roomNameFilter = '';
    this.buildingFilter = '';
    this.floorFilter = '';
    this.roomTypeFilter = '';
    this.availabilityFilter = 'all';
    this.capacityFilter = 'all';
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  getUniqueBuildings(): string[] {
    if (!this.clusterData?.Buildings) return [];
    return [...new Set(this.clusterData.Buildings.map(room => room.BuildingName))];
  }

  getUniqueFloors(): string[] {
    if (!this.clusterData?.Buildings) return [];
    return [...new Set(this.clusterData.Buildings.map(room => room.Floor))].sort();
  }

  getUniqueRoomTypes(): string[] {
    if (!this.clusterData?.Buildings) return [];
    return [...new Set(this.clusterData.Buildings.map(room => room.ConferenceRoomType))];
  }

  // Statistics methods
  getTotalBuildings(): number {
    return this.groupedBuildings.length;
  }

  getTotalRooms(): number {
    return this.clusterData?.Buildings.length || 0;
  }

  getFilteredRoomsCount(): number {
    return this.filteredBuildings.reduce((total, building) => total + building.rooms.length, 0);
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
    this.showRoomModal = true;
    this.editRoomModal = true;
    this.setRoom(room);
    console.log('Editing room:', room);
  }

  deleteRoom(room: ConferenceRoom): void {
    const confirmMessage = `Are you sure you want to delete "${room.ConferenceRoomName}"?\n\nThis action cannot be undone and will permanently remove the room from ${room.BuildingName}.`;

    if (confirm(confirmMessage)) {
      console.log('Deleting room:', room);

      if (!room.id) return;

      this.clusterAdminPageService.ClusterDeleteConferenceRoom(room.id, this.ClusterId).subscribe({
        next: (response) => {
          if (response.ok) {
            console.log('Room deleted successfully:', room.ConferenceRoomName);
            this.removeLocalRoomData(room.id||0);
          } else {
            console.error('Failed to delete room:', response);
            alert('Failed to delete room. Please try again.');
          }
        },
        error: (error) => {
          console.error('Error deleting room:', error);
          if (error.status === 401) {
            alert('Unauthorized: You do not have permission to delete rooms.');
          } else if (error.status === 404) {
            alert('Room not found. It may have already been deleted.');
          } else if (error.status === 500) {
            alert('Server error occurred while deleting the room. Please try again later.');
          } else {
            alert('An error occurred while deleting the room. Please try again.');
          }
        }
      });
    }
  }

  toggleAvailability(room: ConferenceRoom): void {
    const previousState = room.isAvailable;
    room.isAvailable = !room.isAvailable;

    console.log(`Room availability toggled: ${room.ConferenceRoomName} is now ${room.isAvailable ? 'available' : 'unavailable'}`);
    if (!room.id) {
      alert('Error updating room availability : room.id');
      return;
    }

    this.clusterAdminPageService.UpdateRoomAvailability(room.id, room.isAvailable, this.ClusterId).subscribe({
      next: (response) => {
        if (!response.ok) {
          room.isAvailable = previousState; // Revert on failure
          alert('Failed to update room availability');
        }
        // No need to refetch data, the local change is already visible
      },
      error: (error) => {
        room.isAvailable = previousState; // Revert on error
        console.error('Error updating availability:', error);
        alert('Error updating room availability');
      }
    });
  }

  showAddRoomModal(): void {
    this.showRoomModal = true;
    this.editRoomModal = false;
    this.resetNewRoom();
  }

  hideAddRoomModal(): void {
    this.showRoomModal = false;
  }

  updateRoom(): void {
    this.clusterAdminPageService.ClusterupdateConferenceRoom(this.newRoom, this.ClusterId).subscribe({
      next: (response) => {
        if (response.ok) {
          // Update local data immediately instead of refetching
          this.updateLocalRoomData(this.newRoom);
          this.hideAddRoomModal();
        } else {
          console.error('Failed to update room:', response);
          alert('Failed to update room. Please try again.');
        }
      },
      error: (error) => {
        console.error('Error updating room:', error);
        if (error.status === 401) {
          alert('Unauthorized: You do not have permission to update rooms.');
        } else if (error.status === 400) {
          alert('Invalid room data. Please check your inputs and try again.');
        } else if (error.status === 409) {
          alert('A room with this name already exists in this building and floor.');
        } 
      }
    });
  }

  addNewRoom(): void {
    if (!this.clusterData) return;

    // Validate required fields
    if (!this.newRoom.BuildingName.trim() ||
      !this.newRoom.ConferenceRoomName.trim() ||
      !this.newRoom.Floor.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    if (this.editRoomModal) { 
      this.updateRoom(); 
      return; 
    }

    this.clusterAdminPageService.ClusterAddConferenceRoom(this.newRoom, this.ClusterId).subscribe({
      next: (response) => {
        if (response.ok) {
          console.log('Room added successfully:', this.newRoom.ConferenceRoomName);
          
          // Get the new room ID from response if available
          if (response.body?.data?.id) {
            this.newRoom.id = response.body.data.id;
          } else {
            // Generate temporary ID if not provided
            this.newRoom.id = Math.floor(Math.random() * 10000);
          }
          
          // Update local data immediately instead of refetching
          this.addLocalRoomData(this.newRoom);
          this.hideAddRoomModal();
        } else {
          console.error('Failed to add room:', response);
          alert('Failed to add room. Please try again.');
        }
      },
      error: (error) => {
        console.error('Error adding room:', error);
        if (error.status === 401) {
          alert('Unauthorized: You do not have permission to add rooms.');
        } else if (error.status === 400) {
          alert('Invalid room data. Please check your inputs and try again.');
        } else if (error.status === 409) {
          alert('A room with this name already exists in this building and floor.');
        } else {
          alert('An error occurred while adding the room. Please try again.');
        }
      }
    });
  }

  // Local data update methods
  private updateLocalRoomData(updatedRoom: ConferenceRoom): void {
    if (!this.clusterData?.Buildings) return;

    // Update in clusterData.Buildings
    const roomIndex = this.clusterData.Buildings.findIndex(room => room.id === updatedRoom.id);
    if (roomIndex > -1) {
      this.clusterData.Buildings[roomIndex] = { ...updatedRoom };
    }

    // Update in groupedBuildings
    this.groupedBuildings.forEach(building => {
      const roomIndex = building.rooms.findIndex(room => room.id === updatedRoom.id);
      if (roomIndex > -1) {
        building.rooms[roomIndex] = { ...updatedRoom };
        
        // If building name changed, we need to regroup
        if (building.buildingName !== updatedRoom.BuildingName) {
          // Remove from current building
          building.rooms.splice(roomIndex, 1);
          
          // Add to correct building or create new one
          let targetBuilding = this.groupedBuildings.find(b => b.buildingName === updatedRoom.BuildingName);
          if (!targetBuilding) {
            targetBuilding = {
              buildingName: updatedRoom.BuildingName,
              rooms: []
            };
            this.groupedBuildings.push(targetBuilding);
          }
          targetBuilding.rooms.push({ ...updatedRoom });
          targetBuilding.rooms.sort((a, b) => a.Floor.localeCompare(b.Floor));
        }
      }
    });

    // Remove empty buildings
    this.groupedBuildings = this.groupedBuildings.filter(building => building.rooms.length > 0);

    // Reapply filters to update filteredBuildings
    this.applyFilters();
  }

  private addLocalRoomData(newRoom: ConferenceRoom): void {
    if (!this.clusterData?.Buildings) return;

    // Add to clusterData.Buildings
    this.clusterData.Buildings.push({ ...newRoom });

    // Find or create building group
    let buildingGroup = this.groupedBuildings.find(b => b.buildingName === newRoom.BuildingName);
    if (!buildingGroup) {
      buildingGroup = {
        buildingName: newRoom.BuildingName,
        rooms: []
      };
      this.groupedBuildings.push(buildingGroup);
    }
    
    // Add room and sort by floor
    buildingGroup.rooms.push({ ...newRoom });
    buildingGroup.rooms.sort((a, b) => a.Floor.localeCompare(b.Floor));

    // Reapply filters
    this.applyFilters();
  }

  private removeLocalRoomData(roomId: number): void {
    if (!this.clusterData?.Buildings) return;

    // Remove from clusterData.Buildings
    this.clusterData.Buildings = this.clusterData.Buildings.filter(room => room.id !== roomId);

    // Remove from groupedBuildings and clean up empty buildings
    this.groupedBuildings = this.groupedBuildings.map(building => ({
      ...building,
      rooms: building.rooms.filter(room => room.id !== roomId)
    })).filter(building => building.rooms.length > 0);

    // Reapply filters
    this.applyFilters();
  }

  private setRoom(room: ConferenceRoom): void {
    this.newRoom = { ...room }; // Create a copy to avoid direct reference
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
    // Validate email
    if (!this.newUser.email.trim() || !this.isValidEmail(this.newUser.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Check for duplicate email
    if (this.users.some(user => user.email.toLowerCase() === this.newUser.email.toLowerCase())) {
      alert('A user with this email already exists.');
      return;
    }

    // Validate password
    if (!this.newUser.tempPassword || this.newUser.tempPassword.length < 6) {
      alert('Temporary password must be at least 6 characters long.');
      return;
    }

    // Generate a unique ID
    this.newUser.id = Math.floor(Math.random() * 10000);
    this.newUser.dateAdded = new Date();

    // Add to users array
    this.users.push({ ...this.newUser });

    // Hide modal and reset form
    this.hideAddUserModal();

    console.log('New user added:', this.newUser.email);

    // In a real app, you would:
    // 1. Call API to add user
    // 2. Send invitation email
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

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  generateTempPassword(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';

    // Ensure at least one uppercase, one lowercase, one number
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';

    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));

    // Fill the rest randomly
    for (let i = 3; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Shuffle the password
    this.newUser.tempPassword = password.split('').sort(() => 0.5 - Math.random()).join('');
  }

  editUser(user: User): void {
    console.log('Editing user:', user);
    // Implement edit functionality
    // You could open a modal similar to add user but pre-filled with user data
  }

  removeUser(user: User): void {
    const confirmMessage = `Are you sure you want to remove ${user.email} from the cluster?\n\nThis will revoke their access immediately.`;

    if (confirm(confirmMessage)) {
      const index = this.users.findIndex(u => u.id === user.id);
      if (index > -1) {
        this.users.splice(index, 1);
        console.log('User removed:', user.email);

        // In a real app, you would call an API to remove the user
        // and handle the response appropriately
      }
    }
  }

  resendInvite(user: User): void {
    console.log('Resending invite to:', user.email);

    // In a real app, trigger email service
    // Show loading state, call API, handle response

    // Simulated success for now
    alert(`Invitation resent to ${user.email}`);

    // Optional: Update user status or timestamp
    // user.inviteResent = new Date();
  }
}