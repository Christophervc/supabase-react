
import { ListTodoIcon} from "lucide-react";
import ModeToggle from "./ModeToggle";
import UserDropdown from "./UserDropdown";

const TopNav = () => {

  return (
    <header className="border-b">
      <div className="container mx-auto py-4 px-4 md:px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListTodoIcon className="h-8 w-8" />
            <h1 className="text-2xl font-bold">My Tasks</h1>
          </div>
          <div className="flex items-center gap-4">
           <ModeToggle />
           <UserDropdown/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
