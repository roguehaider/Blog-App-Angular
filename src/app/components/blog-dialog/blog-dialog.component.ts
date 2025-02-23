import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { BlogService } from '../../services/blogs.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { StoreModule } from '@ngrx/store';
import { createBlog, updateBlog } from '../../../store/actions/blog.action';

@Component({
  selector: 'app-blog-dialog',
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
    StoreModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: './blog-dialog.component.html',
  styleUrl: './blog-dialog.component.scss',
})
export class BlogDialogComponent {
  blogForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  imageBase64: string | null = null;
  isEdit: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<BlogDialogComponent>,
    private blogService: BlogService,
    private fb: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.data = data || { isEdit: false, blog: null };
    this.isEdit = data.isEdit;
    this.blogForm = this.fb.group({
      id: [data.blog?.id || ''],
      title: [data.blog?.title || '', Validators.required],
      description: [data.blog?.description || '', Validators.required],
      category: [data.blog?.category || '', Validators.required],
      createdOn: [this.getDate(data.blog?.createdOn), Validators.required],
      createdBy: [data.blog?.createdBy || '', Validators.required],
      imageUrl: [data.blog?.imageUrl || ''],
    });

    if (this.isEdit && data.blog?.imageUrl) {
      this.imagePreview = data.blog.imageUrl;
      this.imageBase64 = data.blog.imageUrl;
    }
  }

  private getDate(dateString: string | undefined): Date {
    return dateString ? new Date(dateString) : new Date();
  }

  saveBlog(): void {
    if (this.blogForm.valid) {
      const blogData = this.blogForm.value;
      if (!this.isEdit) {
        delete blogData.id;
      }

      if (this.imageBase64) {
        blogData.imageUrl = this.imageBase64;
      }

      if (this.isEdit) {
        this.store.dispatch(updateBlog({ blog: blogData }));
        Swal.fire('Success', 'Blog updated successfully', 'success');
      } else {
        this.store.dispatch(createBlog({ blog: blogData }));
        Swal.fire('Success', 'Blog created successfully', 'success');
      }

      this.dialogRef.close(true);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.blogService
        .convertToBase64(file)
        .then((base64) => {
          this.imagePreview = base64;
          this.imageBase64 = base64;
          this.blogForm.patchValue({
            imageUrl: this.imageBase64,
          });
          console.log('Image Base64:', this.imageBase64);
        })
        .catch((error) => {
          console.error('Error converting image:', error);
        });
    }
  }

  removeImage(): void {
    this.imagePreview = null;
    this.imageBase64 = null;
    this.blogForm.patchValue({
      imageUrl: '',
    });
  }
}
