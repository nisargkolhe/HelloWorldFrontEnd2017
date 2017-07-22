import { User } from './user';

export class Application {
    id: number;
    user_id: string;
    class_year: string;
    grad_year: string;
    major: string;
    referral: string;
    hackathon_count: number;
    dietary_restrictions: string;
    shirt_size: string;
    website: string;
    longanswer_1: string;
    longanswer_2: string;
    status: string;
    emailSent: boolean;
    created_at:Date;
    updated_at:Date;
    resume: File;
    status_internal: string;
    user: User;
}
