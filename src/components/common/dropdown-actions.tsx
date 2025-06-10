import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui";
import { Button } from "@/components/ui";

interface CommonDropdownActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

export function CommonDropdownActions({
  onEdit,
  onDelete,
  className,
}: CommonDropdownActionsProps) {
  return (
    <div className={className ?? "absolute top-2 right-2"}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="bg-muted">
            <MoreVertical className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="w-6 h-6" />
            Редагувати
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <Trash2 className="w-6 h-6" />
            Видалити
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
