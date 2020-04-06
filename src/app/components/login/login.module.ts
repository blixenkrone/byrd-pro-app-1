import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
	imports: [
		CommonModule,
		LoginRoutingModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
		MatIconModule,
		MatSnackBarModule,
	],
	declarations: [LoginComponent],
	exports: [LoginComponent]
})
export class LoginModule { }
