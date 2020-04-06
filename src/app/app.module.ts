import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment.dev';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		// ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production && environment.serviceWorker }),
		CoreModule,
		MatProgressBarModule,
		// HTTP Interceptors in Core Module
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
