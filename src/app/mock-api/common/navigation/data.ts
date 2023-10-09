/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'dshboard',
        title: 'Dashboard',
        type : 'basic',
        icon : 'heroicons_outline:squares-2x2',
        link : '/dashboard'
    },
    {
        id   : 'contacts',
        title: 'Requests',
        type : 'basic',
        icon : 'heroicons_outline:user-group',
        link : '/contacts'
    },
    
    {
        id   : 'users',
        title: 'Users',
        type : 'basic',
        icon : 'heroicons_outline:users',
        link : '/users'
    },
 
    {
        id   : 'settings',
        title: 'Settings',
        type : 'basic',
        icon : 'heroicons_outline:cog',
        link : '/settings'
    }
];


export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    },
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
    ,   {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
