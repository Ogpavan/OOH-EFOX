import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, themeQuartz } from "ag-grid-community";

// Register modules
ModuleRegistry.registerModules([AllCommunityModule]);

export default function AgTable({ rowData, columnDefs, onRowClicked, height = "400px", ...props }) {
  const myTheme = useMemo(() => 
    themeQuartz.withParams({
      browserColorScheme: "light",
      headerFontSize: 14,
    }), []
  );

  return (
    <div className="ag-theme-quartz" style={{ width: "100%", height }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onRowClicked={onRowClicked}
        domLayout="autoHeight"
        theme={myTheme}
        {...props}
      />
    </div>
  );
}
