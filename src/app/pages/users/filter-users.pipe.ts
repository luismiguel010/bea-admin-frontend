import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filterUsers'
})
export class FilterUserPipe implements PipeTransform {
    transform(value: any, arg: any): any {
        const resultUsers = [];
        for (const user of value) {
            for (const user of value) {
                if (user.identificationCard.toLowerCase().indexOf(arg.toLowerCase()) > -1 || user.names.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
                    user.lastnames.toLowerCase().indexOf(arg.toLowerCase()) > -1 || String(user.phone).toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
                    user.address.toLowerCase().indexOf(arg.toLowerCase()) > -1 || user.email.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
                    user.academicProfile.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
                    resultUsers.push(user);
                };
            };
            return resultUsers;
        }
    }

}