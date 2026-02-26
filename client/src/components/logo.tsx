import { IconInnerShadowTop } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-1">
      <IconInnerShadowTop className="size-5!" />
      <span className="text-base font-semibold">YupIndex.</span>
    </Link>
  );
};

export default Logo;
