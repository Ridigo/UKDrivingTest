import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  items: string[];
  ids: number[];
}

function ListGroup({ items, ids }: Props) {
  return (
    <>
      {items.length === 0 && <p>No items found</p>}
      <ul className="list-group list-group-dark">
        {items.map((item, index) => (
          <Link
            to={{ pathname: "/question", search: `?id=${ids[index]}` }}
            key={index}
            className="list-group-item border-secondary rounded text-light"
          >
            <div className="row">
              <div className="col-auto">{ids[index]}</div>
              <div className="col">{item}</div>
            </div>
          </Link>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
