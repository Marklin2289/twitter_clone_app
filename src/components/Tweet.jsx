import { dbService } from "fbase";
import React from "react";

export default function Tweet({ tweetObj, isOwner }) {
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet ?");
    console.log(ok);
    if (ok) {
      await dbService.doc(`tweet/${tweetObj.id}`).delete();
    }
  };

  return (
    <div>
      <h4>{tweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Tweet</button>
          <button>Edit Tweet</button>
        </>
      )}
    </div>
  );
}
