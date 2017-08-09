export class Announcement {
    id: number;
    title: string;
    message: string;
    scope: string;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    should_email: boolean;
}
