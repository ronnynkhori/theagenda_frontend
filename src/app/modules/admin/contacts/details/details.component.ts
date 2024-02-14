import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ContactsService } from '../contacts.service';
import { Tag, Contact, Country } from '../contacts.types';
import { ContactsListComponent } from '../list/list.component';


@Component({
    selector       : 'contacts-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
})
export class ContactsDetailsComponent implements OnInit
{
  

    editMode: boolean = false;
    contact: any;
    contactForm: UntypedFormGroup;
    contactId: any;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _contactsListComponent: ContactsListComponent,
        private _contactsService: ContactsService,
        private _formBuilder: UntypedFormBuilder,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.contactId = this._activatedRoute.snapshot.paramMap.get('id');
        console.log(this.contactId,"contact id")
        // Open the drawer
        this._contactsListComponent.matDrawer.open();
        this.getContactById(this.contactId);

        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id          : [''],
            avatar      : [null],
            name        : ['', [Validators.required]],
            emails      : this._formBuilder.array([]),
            phoneNumbers: this._formBuilder.array([]),
            title       : [''],
            company     : [''],
            birthday    : [null],
            address     : [null],
            notes       : [null],
            tags        : [[]]
        });


 


    }
 

    getContactById(contactId: any) {
        this._contactsService.getContactById(this.contactId)
            .subscribe({
                next: (res: any) => {
                    this.contact = res;
                    this.contactForm.patchValue(this.contact);
                    // Additional logic to handle dynamic form arrays if needed
                },
                error: (error: any) => {
                    console.error(error);
                    // Handle user-friendly error messages
                }
            });
    }

 
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._contactsListComponent.matDrawer.close();
    }

    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void
    {
        if ( editMode === null )
        {
            this.editMode = !this.editMode;
        }
        else
        {
            this.editMode = editMode;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

 
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
