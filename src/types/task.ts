export type Task = {
    id: number;
    created_at?: string | Date;
    name: string;
    description?: string;
    completed: boolean;
    user_id: string;
};

