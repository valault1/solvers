export const getStandardWorksUrl = (abbr: string) =>
  `https://www.churchofjesuschrist.org/study/scriptures/${abbr}?lang=eng`;

export const worksByUrl = {
  "book-of-mormon": getStandardWorksUrl("bofm"),
  "old-testament": getStandardWorksUrl("ot"),
  "new-testament": getStandardWorksUrl("nt"),
  "pearl-of-great-price": getStandardWorksUrl("pgp"),
  "doctrine-and-covenants": getStandardWorksUrl("dc-testament"),
  "guide-to-the-scriptures": getStandardWorksUrl("gs"),
  "topical-guide": getStandardWorksUrl("tg"),
  "bible-dictionary": getStandardWorksUrl("bd"),
  "index-to-the-triple-combination": getStandardWorksUrl("triple-index"),
  "reference-guide-to-the-book-of-mormon":
    getStandardWorksUrl("bofm-reference"),
  "reference-guide-to-the-holy-bible": getStandardWorksUrl("bible-reference"),
  "joseph-smith-translation-appendix": getStandardWorksUrl("jst"),
} as const;

export const StandardWorksContentTypes = Object.keys(worksByUrl) as Array<
  keyof typeof worksByUrl
>;
export const ContentTypes = [
  "conference-talk",
  ...StandardWorksContentTypes,
] as const;

export type ContentType = (typeof ContentTypes)[number];
export type UrlType = "content" | "links";

// a LinksUrl is a url that is used to get more links
// these links can be either more LinksUrls, or contentUrls
export type LinksUrl = {
  contentType: ContentType;
  url: string;
  links: Sublink[];
};

type Sublink =
  | { getLinksFromBody: (rawBody: string) => string[]; baseUrl?: string } & {
      resultingUrlsType: "content";
      getContentText: (
        rawBody: string,
        contentType: ContentType,
        url: string
      ) => string;
    };

export type ContentUrl = {
  contentType: ContentType;
  url: string;
  getContentText: (
    rawBody: string,
    contentType: ContentType,
    url: string
  ) => string;
};

export type Content = {
  contentType: ContentType;
  text: string;
  // todo: make this typing better, so that each content type has specific metadata
  metadata: any;
  url: string;
};
