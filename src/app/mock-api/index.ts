
import { ContactsMockApi } from 'app/mock-api/apps/contacts/api';
import { AuthMockApi } from 'app/mock-api/common/auth/api';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';
import { NotificationsMockApi } from 'app/mock-api/common/notifications/api';
import { SearchMockApi } from 'app/mock-api/common/search/api';
import { UserMockApi } from 'app/mock-api/common/user/api';
import { IconsMockApi } from './ui/icons/api';


export const mockApiServices = [

    AuthMockApi,
    ContactsMockApi,
    NavigationMockApi,
    NotificationsMockApi,
    SearchMockApi,
    IconsMockApi,
    UserMockApi,
];
