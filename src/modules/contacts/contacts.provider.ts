import { Contact } from './contact.entity';
import { CONTACT_REPOSITORY } from '../../core/constants';

export const contactsProviders = [{
    provide: CONTACT_REPOSITORY,
    useValue: Contact,
}];