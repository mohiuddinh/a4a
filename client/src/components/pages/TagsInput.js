import React, { useState, useEffect } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import InfoIcon from "@material-ui/icons/Info";

import "../../css/TagsInput.css";

function TagsInput(props) {
  const [tags, setTags] = useState(props.tags);
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  useEffect(() => {
    props.selectedTags([...tags]);
  }, [tags]);

  return (
    <div className="tags-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <CancelIcon className="tag-close-icon" onClick={() => removeTags(index)} />
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={(event) => (event.key === " " ? addTags(event) : null)}
        placeholder="Press space to add tags"
      />

      <div id="anim">
        <span
          class="tooltip"
          data-tooltip="Tags can be general or specific. i.e. '6' for EECS, '6.0001' for python, 'Clubs' for clubs in general, etc. Pressing space will enter the tag, so please don't write multiple words in one tag :)"
        >
          <InfoIcon className="icon-info" />
        </span>
      </div>
    </div>
  );
}

export default TagsInput;
