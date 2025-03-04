import { useDataTable } from "@/components/ui/data-table/data-table";
import { DataTableFacetedFilter } from "@/components/ui/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/ui/data-table/data-table-view-options";
import { actionValues } from "./data";
import { ResetButton } from "@/components/ui/data-table/data-table-buttons";

export function AuditTableToolbar() {
  const { table } = useDataTable();
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("action") && (
          <DataTableFacetedFilter
            column={table.getColumn("action")}
            title="Actions"
            options={actionValues}
          />
        )}

        {isFiltered && (
          <ResetButton onClick={() => table.resetColumnFilters()} />
        )}
      </div>
      <DataTableViewOptions />
    </div>
  );
}
