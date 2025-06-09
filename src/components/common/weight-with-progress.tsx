import { ArrowUp, ArrowDown } from "lucide-react";

interface WeightWithProgressProps {
  currentWeight: number;
  previousWeight: number | null;
}

export function WeightWithProgress({
  currentWeight,
  previousWeight,
}: WeightWithProgressProps) {
  if (previousWeight === null) {
    return <>{currentWeight} кг</>;
  }

  const diff = currentWeight - previousWeight;

  if (diff > 0) {
    return (
      <>
        {currentWeight} кг
        <span className="text-positive font-semibold pl-2 flex items-center">
          <ArrowUp size={16} /> <span>+{diff}</span>
        </span>
      </>
    );
  } else if (diff < 0) {
    return (
      <>
        {currentWeight} кг
        <span className="text-destructive font-semibold pl-2 flex items-center">
          <ArrowDown size={16} /> <span>{Math.abs(diff)}</span>
        </span>
      </>
    );
  } else {
    return <>{currentWeight} кг</>;
  }
}
