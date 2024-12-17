import ADD_STORY_IMG from '../assets/images/add-story.svg'
import NO_SEARCH_DATA_IMG from '../assets/images/no-search-data.svg'
import NO_FILTER_DATA_IMG from '../assets/images/no-filter-data.svg'

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const getEmptyCardMessage = (filterType) => {
  switch (filterType) {
    case "search":
      return `Oops! No stories match your search.`;

    case "date":
      return `No stories available for the selected date range`;

    default:
      return `Start your first Travel Story! Click 'Add' to write your thoughts and memories. Let's begin!`;
  }
};

export const getEmptyCardImg = (filterType) => {
  switch (filterType) {
    case "search":
      return NO_SEARCH_DATA_IMG;

    case "date":
      return NO_FILTER_DATA_IMG;

    default:
      return ADD_STORY_IMG;
  }
};
