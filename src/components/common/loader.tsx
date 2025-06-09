"use client";

export const CommonLoader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        className={`
          w-8 h-8
          rounded-full
          border-4
          border-t-transparent
          animate-spin
        `}
        style={{
          borderColor: "var(--ring)",
          borderTopColor: "transparent",
        }}
      />
    </div>
  );
};
