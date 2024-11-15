export const ContentTypes = ["conference-talk", "book-of-mormon"] as const;

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
      getContentText: (rawBody: string) => string;
    };

export type ContentUrl = {
  contentType: ContentType;
  url: string;
  getContentText: (rawBody: string) => string;
};

export type Content = {
  contentType: ContentType;
  text: string;
  // todo: make this typing better, so that each content type has specific metadata
  metadata: any;
  url: string;
};
