import './Categories.scss';
import { WithContext as ReactTags, Tag } from 'react-tag-input';
import { useEffect, useState } from 'react';
import { LabeledFiled } from '../form';

function Suggestions({ text }: { text: string }, query: string): JSX.Element {
  // eslint-disable-next-line react/destructuring-assignment
  if (query.length && text.includes(query)) {
    return <span className="categories--match">{text}</span>;
  }
  return <>{text}</>;
}

export default function Categories(): JSX.Element {
  const suggestions: Tag[] = [
    { id: 'Thailand', text: 'Thailand' },
    { id: 'India', text: 'India' },
    { id: 'Indonesia', text: 'Indonesia' },
    { id: 'Innneapolis', text: 'Innneapolis' },
    { id: 'Vietnam', text: 'Vietnam' },
    { id: 'Turkey', text: 'Turkey' },
  ];

  function handleFilterSuggestions(
    query: string,
    possibleSuggestionsArray: Tag[]
  ) {
    if (!query.length) return possibleSuggestionsArray;
    const sortedOptions = [...possibleSuggestionsArray].sort((a, b) => {
      if (!a.text.includes(query) && b.text.includes(query)) {
        return 1;
      }
      if (
        (!a.text.includes(query) && !b.text.includes(query)) ||
        (a.text.includes(query) && b.text.includes(query))
      ) {
        return 0;
      }
      return -1;
    });
    return sortedOptions;
  }

  const [tags, setTags] = useState([]);

  useEffect(() => {
    console.clear();
    console.log('tags', tags);
  }, [tags]);

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
    <LabeledFiled label="Категории" id="credit-amount">
      <ReactTags
        id="categories"
        placeholder="Выберите категории"
        tags={tags}
        suggestions={suggestions}
        handleFilterSuggestions={handleFilterSuggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        autocomplete
        autofocus={false}
        allowUnique
        minQueryLength={0}
        classNames={{
          // tags: 'tagsClass',
          tagInput: 'categories--input_group',
          tagInputField: 'form--field categories--input_field',
          selected: 'categories--selected',
          tag: 'categories--tag',
          remove: 'categories--remove_icon',
          suggestions: 'form--field categories--suggestions',
          activeSuggestion: 'categories--suggestions_active',
        }}
        renderSuggestion={Suggestions}
      />
    </LabeledFiled>
  );
}
