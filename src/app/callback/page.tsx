'use client';

import { passportInstance } from "@/passport";
import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    passportInstance.loginCallback().catch((e) => {
      // this happens in local env only, when rendered on the dev server
      console.warn(e);
    });
  }, []);
  return <div>Loading...</div>;
}
