import { DataGrid } from "@mui/x-data-grid";

const rows = [
  {
    id: 1,
    event: "Hello",
    price: "World",
    from: "asd",
    to: "asddd",
    date: "asd",
  },
  {
    id: 2,
    event: "Hello",
    price: "World",
    from: "asd",
    to: "asddd",
    date: "asd",
  },
];

const columns = [
  { field: "event", headerName: "Event", flex: 1 },
  { field: "price", headerName: "Price", flex: 1 },
  { field: "from", headerName: "From", flex: 1 },
  { field: "to", headerName: "To", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
];

export const ActivityTable = () => {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#ececec",
          },
        }}
        isRowSelectable={() => false}
        rows={rows}
        columns={columns}
      />
    </div>
  );
};
