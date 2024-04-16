import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from './materials.module';
import { DashboardComponent } from 'app/modules/admin/dashboard/dashboard.component';
import { ConvertPathPipe } from './convert-path.pipe';


@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule, 
        MaterialsModule
    ],
    exports: [
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule, 
        MaterialsModule
    ],
})
export class SharedModule {}
