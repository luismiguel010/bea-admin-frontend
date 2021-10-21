import { JobCv } from "./jobcv";

export class Cv {
    idCv!: string;
    idUser!: string;
    directoryFile!: string;
    dateReceived!: Date;
    jobCvList!: JobCv[];
}