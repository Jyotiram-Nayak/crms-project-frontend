import React, { useEffect, useState } from "react";
import Link from "next/link";

const ApplyButton = ({ id, path, label }: { id: string, path: string, label: string }) => {
  const [gradientColors, setGradientColors] = useState<string[]>([
    "from-blue-500 to-purple-600",
    "from-purple-600 to-blue-500",
    // "from-green-500 to-blue-600",
  ]);
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link
      href={`${path}/${id}`}
      className={`bg-gradient-to-r ${gradientColors[currentColorIndex]} rounded font-medium gap-2.5 hover:bg-opacity-90 inline-flex items-center px-2 py-2 text-white`}
    >
      {label}
    </Link>
  );
};

export default ApplyButton;
