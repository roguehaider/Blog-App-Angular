import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BlogDialogComponent } from '../blog-dialog/blog-dialog.component';
import { ThemeService } from '../../services/theme.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { EditPasswordComponent } from '../edit-password/edit-password.component';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import * as AuthActions from '../../../store/actions/user.action';

import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    private dialog: MatDialog,
    private themeService: ThemeService,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {}

  openCreateBlogDialog() {
    this.dialog.open(BlogDialogComponent, {
      width: '400px',
      data: { isEdit: false },
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
  editProfile() {
    const userId = localStorage.getItem('userId');
    const dialogRef: MatDialogRef<EditProfileComponent> = this.dialog.open(
      EditProfileComponent,
      {
        width: '400px',
        data: { userId: userId },
        disableClose: true,
      }
    );

    const componentInstance = dialogRef.componentInstance;

    dialogRef.backdropClick().subscribe(() => {
      this.handleDialogClose(componentInstance, dialogRef);
    });

    dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.handleDialogClose(componentInstance, dialogRef);
      }
    });

    const defaultClose = dialogRef.close;
    dialogRef.close = (dialogResult?: any) => {
      if (
        componentInstance.formSubmitted ||
        this.handleDialogClose(componentInstance, dialogRef)
      ) {
        defaultClose.call(dialogRef, dialogResult);
      }
    };
  }

  private handleDialogClose(
    componentInstance: EditProfileComponent,
    dialogRef: MatDialogRef<EditProfileComponent>
  ): boolean {
    if (!componentInstance.canDeactivate()) {
      const result = confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
      if (!result) {
        return false;
      }
    }
    return true;
  }

  changePassword() {
    this.dialog.open(EditPasswordComponent, {
      width: '400px',
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.snackBar.open('Logout Successful!', 'Close', {
      duration: 3000,
    });
  }
}
