/* eslint-disable react/destructuring-assignment */
import { WithContext as ReactTags, Tag } from 'react-tag-input';
import { useEffect, useState } from 'react';
import './Categories.scss';

function Suggestions({ text }: { text: string }, query: string): JSX.Element {
  if (
    query.length &&
    text.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  ) {
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

  // function handleFilterSuggestions(query: string, possibleSuggestions: Tag[]) {
  //   const newPossibleSuggestions = possibleSuggestions;
  //   // const newPossibleSuggestions = [...possibleSuggestions];
  //   if (!query.length) return newPossibleSuggestions;
  //   const sortedOptions = newPossibleSuggestions.sort((a, b) => {
  //     if (
  //       !a.text.toLocaleLowerCase().includes(query) &&
  //       b.text.toLocaleLowerCase().includes(query)
  //     ) {
  //       return 1;
  //     }
  //     if (
  //       (!a.text.toLocaleLowerCase().includes(query) &&
  //         !b.text.toLocaleLowerCase().includes(query)) ||
  //       (a.text.toLocaleLowerCase().includes(query) &&
  //         b.text.toLocaleLowerCase().includes(query))
  //     ) {
  //       return 0;
  //     }
  //     return -1;
  //   });
  //   console.log('sortedOptions', sortedOptions);
  //   return sortedOptions;
  // }

  const [tags, setTags] = useState<Tag[]>([]);
  // useEffect(() => console.log('tags', tags), [tags]);

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  return (
    <ReactTags
      id="categories"
      placeholder="Выберите категории…"
      tags={tags}
      suggestions={suggestions}
      // handleFilterSuggestions={handleFilterSuggestions}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      autocomplete
      autofocus={false}
      allowUnique
      minQueryLength={0}
      classNames={{
        tags: 'categories',
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
  );
}
