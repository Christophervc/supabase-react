import { Task } from "@/types/task";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DialogDescription } from "@radix-ui/react-dialog";

interface Props {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (name: string, description: string) => void;
}
const UpdateTaskDialog = ({ task, open, onOpenChange, onUpdate }: Props) => {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);

  useEffect(() => {
    if (open) {
      setName(task.name);
      setDescription(task.description);
    }
  }, [open, task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onUpdate(name, description || "");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription className="sr-only">Update task</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Task Name</Label>
              <Input
                id="update-task-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                id="update-task-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTaskDialog;
