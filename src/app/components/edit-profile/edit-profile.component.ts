import { Component, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import * as authActions from '../../../store/actions/user.action';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  profileForm: FormGroup;
  userId: string | null = null;

  userData: any;
  currentPassword: string;
  formSubmitted = false;

  constructor(
    private dialogRef: MatDialogRef<EditProfileComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.userId = String(localStorage.getItem('userId'));
    this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.currentPassword = this.userData.password || '';
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      dateOfBirth: ['', [Validators.required]],
      password: [
        this.currentPassword,
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.profileForm.dirty && !this.formSubmitted) {
      $event.returnValue = true;
    }
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    console.log('User ID from localStorage:', this.userId);
    if (this.userId) {
      this.userService.getCurrentUser().subscribe(
        (user) => {
          console.log('Fetched User Data:', user);
          this.profileForm.patchValue(user);
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('User ID is missing in localStorage');
    }
  }

  canDeactivate(): boolean {
    return !this.profileForm.dirty || this.formSubmitted;
  }

  saveProfile() {
    if (this.profileForm.valid && this.userId) {
      this.formSubmitted = true;
      this.store.dispatch(
        authActions.editProfile({
          userId: this.userId,
          userData: this.profileForm.value,
        })
      );
      this.dialogRef.close();
    } else {
      console.log('Form is invalid or userId is missing');
    }
  }

  closeDialog() {
    this.dialogRef.close();
    console.log('Close attempted from within the component');
  }
}
