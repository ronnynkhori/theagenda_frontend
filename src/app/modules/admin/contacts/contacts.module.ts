import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAT_DATE_FORMATS, MatCommonModule, MatRippleModule } from '@angular/material/core';
import { SharedModule } from 'app/shared/shared.module';
import { ContactsComponent } from './contacts.component';
import { contactsRoutes } from './contacts.routing';
import { ContactsDetailsComponent } from './details/details.component';
import { ContactsListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ContactsComponent,
        ContactsListComponent,
        ContactsDetailsComponent
    ],
    imports     : [
        RouterModule.forChild(contactsRoutes),
       CommonModule,
       FormsModule,
        SharedModule
    ],
    providers   : [
        {
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: 'D'
                },
                display: {
                    dateInput         : 'DDD',
                    monthYearLabel    : 'LLL yyyy',
                    dateA11yLabel     : 'DD',
                    monthYearA11yLabel: 'LLLL yyyy'
                }
            }
        }
    ]
})
export class ContactsModule
{
}
