import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContactsService } from './contacts.service';
import { Contact as ContactEntity } from './contact.entity';
import { ContactDto } from './dto/contact.dto';

@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactService: ContactsService) { }

    @Get()
    async findAll() {

        return await this.contactService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ContactEntity> {

        const contact = await this.contactService.findOne(id);

        if (!contact) {
            throw new NotFoundException('This Contact doesn\'t exist');
        }

        return contact;
    }

    @Get('names/:name')
    async findbyName(@Param('name') name: string): Promise<ContactEntity> {

        const contact = await this.contactService.findbyName(name);

        if (!contact) {
            throw new NotFoundException('This Contact doesn\'t exist');
        }


        return contact;
    }

    @Get('phonenumbers/:phonenumber')
    async findbyContactnumber(@Param('phonenumber') phonenumber: string): Promise<ContactEntity> {

        const contact = await this.contactService.findbyContactnumber(phonenumber);


        if (!contact) {
            throw new NotFoundException('This Contact doesn\'t exist');
        }


        return contact;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() contact: ContactDto, @Request() req): Promise<ContactEntity> {

        return await this.contactService.create(contact, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() contact: ContactDto, @Request() req): Promise<ContactEntity> {

        const { numberOfAffectedRows, updatedContact } = await this.contactService.update(id, contact, req.user.id);


        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Contact doesn\'t exist');
        }


        return updatedContact;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {

        const deleted = await this.contactService.delete(id, req.user.id);


        if (deleted === 0) {
            throw new NotFoundException('This Contact doesn\'t exist');
        }


        return 'Successfully deleted';
    }
}
