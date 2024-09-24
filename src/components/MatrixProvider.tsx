"use client";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import sdk, { MatrixClient } from "matrix-js-sdk";

export const MatrixContext = createContext<MatrixClient | null>(null);

export default function MatrixProvider({ children }: { children: ReactNode }) {
  const [matrixClient, setMatrixClient] = useState<MatrixClient>();

  useEffect(() => {
    if (!sdk) return;
    console.log("fn createClient: ", sdk);
    console.log("fn createClient: ", sdk.createClient);
    setMatrixClient(sdk.createClient({ baseUrl: "https://matrix.org" }));
  }, []);

  if (!matrixClient) return null;

  return (
    <MatrixContext.Provider value={matrixClient}>
      {children}
    </MatrixContext.Provider>
  );
}
