import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProAuthGuard } from 'src/app/core/guards/pro-auth.guard';
import { StoryTipperComponent } from './story-tipper.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

const routes: Routes = [
	{ path: '', redirectTo: '/tip/media', pathMatch: 'full' },
	{
		path: '', canActivate: [ProAuthGuard], children: [
			{ path: 'media', component: StoryTipperComponent },
			{ path: 'admin', component: StoryTipperComponent, canActivate: [AdminGuard] }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class StoryTipperRoutingModule { }
