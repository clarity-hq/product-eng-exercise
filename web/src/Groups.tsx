import { GroupsDataTable } from "./components/GroupsDataTable";
import { useGroupsQuery } from "./hooks";

type Props = {
  filters?: unknown;
};

export function Groups({ filters }: Props) {
  const dataReq = useGroupsQuery({
    _: "Update this object to pass data to the /groups endpoint.",
    filters,
  });

  if (dataReq.isLoading || !dataReq.data) {
    return <div>Loading...</div>;
  }

  return <GroupsDataTable data={dataReq.data.data} />;
}
