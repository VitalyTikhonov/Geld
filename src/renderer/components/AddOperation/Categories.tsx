import './Categories.scss';
import { WithContext as ReactTags } from 'react-tag-input';
import { useState } from 'react';

function Suggestions({ text }: { text: string } /* , query */): JSX.Element {
  return <>{text}</>;
}

export default function Categories(): JSX.Element {
  const suggestions = [
    { id: 'Thailand', text: 'Thailand' },
    { id: 'India', text: 'India' },
    { id: 'Indonesia', text: 'Indonesia' },
    { id: 'Innneapolis', text: 'Innneapolis' },
    { id: 'Vietnam', text: 'Vietnam' },
    { id: 'Turkey', text: 'Turkey' },
  ];

  const [tags, setTags] = useState([]);

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  return (
    <ReactTags
      id="categories"
      placeholder="Выберите категории"
      tags={tags}
      suggestions={suggestions}
      // handleFilterSuggestions={(textInputValue, possibleSuggestionsArray) => {
      //   const lowerCaseQuery = textInputValue.toLowerCase();

      //   return possibleSuggestionsArray.filter((suggestion) => {
      //     return suggestion.toLowerCase().includes(lowerCaseQuery);
      //   });
      // }}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      // handleTagClick={handleTagClick}
      autocomplete
      autofocus={false}
      allowUnique
      // removeComponent={() => (
      //   <Cross className="categories--cross" onClick={handleDelete} />
      // )}
      classNames={{
        // tags: 'tagsClass',
        tagInput: 'categories--input_group',
        tagInputField: 'form--field categories--input_field',
        selected: 'categories--selected',
        tag: 'categories--tag',
        remove: 'categories--remove_icon',
        suggestions: 'form--field categories--suggestions',
        activeSuggestion: 'categories--suggestions_active',
        // editTagInput: 'editTagInputClass',
        // editTagInputField: 'editTagInputField',
        // clearAll: 'clearAllClass',
      }}
      renderSuggestion={Suggestions}
    />
  );
}
