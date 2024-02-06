import { Injectable, Inject } from '@nestjs/common';
import { Contact } from './contact.entity';
import { ContactDto } from './dto/contact.dto';
import { User } from '../users/user.entity';
import { CONTACT_REPOSITORY } from '../../core/constants';

@Injectable()
export class ContactsService {

    constructor(@Inject(CONTACT_REPOSITORY) private readonly contactRepository: typeof Contact) { }

    async create(contact: ContactDto, userId): Promise<Contact> {
        return await this.contactRepository.create<Contact>({ ...contact, userId });
    }

    async findAll(): Promise<Contact[]> {
        return await this.contactRepository.findAll<Contact>({
            include: [{ model: User, attributes: { exclude: ['password'] } }],
        });
    }

    async findOne(id): Promise<Contact> {
        return await this.contactRepository.findOne({
            where: { id },
            include: [{ model: User, attributes: { exclude: ['password'] } }],
        });
    }

    async findbyName(name): Promise<Contact> {
        console.log(typeof name)
        return await this.contactRepository.findOne({
            where: { name },
        });
    }

    async findbyContactnumber(phonenumber): Promise<Contact> {
        return await this.contactRepository.findOne({
            where: { phonenumber },
        });
    }

    async delete(id, userId) {
        return await this.contactRepository.destroy({ where: { id, userId } });
    }

    async update(id, data, userId) {
        const [numberOfAffectedRows, [updatedContact]] = await this.contactRepository.update({ ...data }, { where: { id, userId }, returning: true });

        return { numberOfAffectedRows, updatedContact };
    }
}
