import { UserWithJobs } from './../../models/UserWithJobs';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filterUsers'
})
export class FilterUserPipe implements PipeTransform {
    transform(value: any, arg: any): any {
        const resultUsers: UserWithJobs[] = [];
        for (const userWithJobs of value) {
            if (userWithJobs.identificationCard.toLowerCase().indexOf(arg.toLowerCase()) > -1 || userWithJobs.names.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
                userWithJobs.lastnames.toLowerCase().indexOf(arg.toLowerCase()) > -1 || String(userWithJobs.phone).toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
                userWithJobs.address.toLowerCase().indexOf(arg.toLowerCase()) > -1 || userWithJobs.email.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
                userWithJobs.academicProfile.toLowerCase().indexOf(arg.toLowerCase()) > -1 || userWithJobs.profession.toLowerCase().indexOf(arg.toLowerCase()) > -1 || userWithJobs.jobName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
                resultUsers.push(userWithJobs);
            };
        };
        return resultUsers;
    }
}