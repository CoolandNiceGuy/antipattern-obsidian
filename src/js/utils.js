import { getPermalinks } from "@portaljs/remark-wiki-link";

const URL_EXTRACT_REGEX = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g

export const slugify = (name) => name.replace(/ /g, '-').toLowerCase()

export const getFormattedPermaLinks = (directoryPath) => {
  const permalinks =  getPermalinks(directoryPath).map((entry) => {
    const shortenedPath = entry.replace('src/content/blog/', '');
    return shortenedPath.replace(/ /g, '-').toLowerCase();
  });

  return permalinks
}

const WORDS_PER_MINUTE = 200;
export const getReadingTime = (content) => {
  if (!content) return;
  const clean = content.replace(/<\/?[^>]+(>|$)/g, '');
  const numberOfWords = clean.split(/\s/g).length;
  return Math.ceil(numberOfWords / WORDS_PER_MINUTE);
}

export const extractExternalLinks = (content) => {
  if(!content) return;
  return content.match(URL_EXTRACT_REGEX);
}

