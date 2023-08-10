import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { ProfileComponent } from './profile.component';
import { profileRoutes } from './profile.routing';



@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports     : [
        RouterModule.forChild(profileRoutes),
        CommonModule,
        FormsModule,
        SharedModule
    ]
})
export class ProfileModule
{
}
