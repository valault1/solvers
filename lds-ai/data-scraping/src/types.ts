export const ContentTypes = ["conference-talk", "book-of-mormon"] as const;

export type ContentType = (typeof ContentTypes)[number];
export type UrlType = "content" | "table-of-contents";

export type TableOfContentUrl = {
  contentType: ContentType;
  url: string;
  // the function to get the body text out that is searchable by the regexes
  getBodyText: (rawBody: string) => string;
  regexes: {
    regexString: string;
    resultingUrlsType: UrlType;
    getContentText: (rawBody: string) => string;
  }[];
};

export type Content = {
  contentType: ContentType;
  text: string;
  // todo: make this typing better, so that each content type has specific metadata
  metadata: any;
};
