import React from "react";
import {Child as ChildDetailsInteface} from "../types/apiTypes";
import ListItem from "./ListItem";

type ListProps = {
  data: ChildDetailsInteface[];
  noMoreData: boolean;
  loadingMore: boolean;
  refetchListData: () => void;
};

function List({data, noMoreData, loadingMore, refetchListData}: ListProps) {
  return (
    <ul className="list">
      {data.map((child: ChildDetailsInteface) => (
        <ListItem
          key={child.childId}
          child={child}
          refetchListData={refetchListData}
        />
      ))}
      {loadingMore && <p>Loading more children...⏳</p>}
      {noMoreData && <p>No more children to display</p>}
    </ul>
  );
}

export default List;
