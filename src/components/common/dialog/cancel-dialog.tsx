"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useWorkoutStore } from "@/store/useWorkoutStore";
import { CommonDialog } from "./dialog";

interface CommonCancelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommonCancelDialog({
  open,
  onOpenChange,
}: CommonCancelDialogProps) {
  const router = useRouter();
  const resetWorkout = useWorkoutStore((state) => state.resetWorkout);

  const handleCancelWorkout = () => {
    resetWorkout();
    router.refresh();
    onOpenChange(false);
  };

  return (
    <CommonDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Відмінити тренування?"
      description="Ви впевнені, що хочете відмінити це тренування?"
    >
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Скасувати
        </Button>
        <Button onClick={handleCancelWorkout}>Відмінити тренування</Button>
      </div>
    </CommonDialog>
  );
}
