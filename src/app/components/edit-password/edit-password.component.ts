import { Component } from '@angular/core';
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
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/actions/user.action';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'app-edit-password',
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
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.scss',
})
export class EditPasswordComponent {
  passwordForm: FormGroup;
  userId: string;
  currentUser: any;

  constructor(
    private dialogRef: MatDialogRef<EditPasswordComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.userId = localStorage.getItem('userId') || '';
    this.passwordForm = this.fb.group({
      currentPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$'
          ),
        ],
      ],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$'
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      console.log('Current User:', this.currentUser);
    } else {
      console.error('No user found in localStorage');
    }
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } =
        this.passwordForm.value;

      if (currentPassword !== this.currentUser.password) {
        Swal.fire('Error', 'Current password is incorrect', 'error');
        return;
      }
      if (newPassword !== confirmPassword) {
        Swal.fire(
          'Warning',
          'New password and confirm password do not match',
          'warning'
        );
        return;
      }

      const updatedUserData = {
        ...this.currentUser,
        password: newPassword,
      };

      this.store.dispatch(
        AuthActions.updatePassword({ userId: this.userId, updatedUserData })
      );
      this.dialogRef.close();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
