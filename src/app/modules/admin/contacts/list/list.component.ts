import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import {
    filter,
    fromEvent,
    Observable,
    Subject,
    switchMap,
    takeUntil,
} from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ContactsService } from '../contacts.service';
import { Contact, Country } from '../contacts.types';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'contacts-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsListComponent implements OnInit, OnDestroy {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

    contacts$: Observable<any>;

    requestsCount: number = 0;
    contactsTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
    countries: Country[];
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedContact: Contact;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    usersMap: Map<number, any> = new Map<number, any>();
    user: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _contactsService: ContactsService,
        private userService: UserService,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {}

   async ngOnInit() {
        // Get the contacts
        this.contacts$ = this._contactsService.contacts$;
        this._contactsService.contacts$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(async (contacts: any) => {
                console.log('my contacts', contacts);

                // Update the counts
                this.requestsCount = contacts.length;

           // Fetch and set user information for each contact
           for (const contact of contacts) {
            const userIdToRetrieve = contact.userId;
            console.log('userIdToRetrieve', userIdToRetrieve);
           this.userService.getUserById(userIdToRetrieve).subscribe({
            next:(res:any)=>{
                console.log(res);
                contact.user = res;
            },
            error:(err:any)=> {
                console.log(err,"dd"); 
            },
           });
        
              // Mark for check
              this._changeDetectorRef.markForCheck();
            } 
  
          console.log("Contacts with user information:", contacts);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the contact
        this._contactsService.contact$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((contact: any) => {
                // Update the selected contact
                this.selectedContact = contact;
                console.log("kmk", this.selectedContact)

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });



        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap((query) =>
                    // Search
                    this._contactsService.searchContacts(query)
                )
            )
            .subscribe();

        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                // Remove the selected contact when drawer closed
                this.selectedContact = null;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });

        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode if the given breakpoint is active
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                } else {
                    this.drawerMode = 'over';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        fromEvent(this._document, 'keydown')
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter<KeyboardEvent>(
                    (event) =>
                        (event.ctrlKey === true || event.metaKey) && // Ctrl or Cmd
                        event.key === '/' // '/'
                )
            )
            .subscribe(() => {
                this.createContact();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    onBackdropClicked(): void {
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });
        this._changeDetectorRef.markForCheck();
    }

    createContact(): void {
        this._contactsService.createContact().subscribe((newContact) => {
            this._router.navigate(['./', newContact.id], {
                relativeTo: this._activatedRoute,
            });

            this._changeDetectorRef.markForCheck();
        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
