import { Representative } from "./Representative";

export interface Customer {
    id : number;
    code?: string;
    name?: string;
    groupName?: string;
    status?: string;
    avatarImage?: string ;
    phoneNumber?: string;
    taxId?: string;
    email?: string;
    fax?: string;
    address?: string;
    bankAccountNumber?: string;
    bankName?: string;
    bankBranch?: string;
    representatives?: Representative[];
    note?: string;
}
