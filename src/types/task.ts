export type Task = {
    id: number;
    created_at?: string | Date;
    name: string;
    completed: boolean;
    user_id: string;
};

