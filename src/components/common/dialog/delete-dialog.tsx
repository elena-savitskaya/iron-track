"use client";

import { Button } from "@/components/ui/button";
import { CommonDialog } from "./dialog";

type CommonDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

export const CommonDeleteDialog = ({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}: CommonDeleteDialogProps) => {
  return (
    <CommonDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Видалити тренування?"
      description=" Ви впевнені, що хочете видалити це тренування?"
    >
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          Скасувати
        </Button>
        <Button onClick={onConfirm}>Видалити</Button>
      </div>
    </CommonDialog>
  );
};
