/**
 *  response from Google Books API
 */
export interface Result {
  items: BookItem[];
  kind: string;
  totalItems: number;
}

/**
 * information of books
 */

type VolumeInfo = {
  title: string;
  authors?: string[];
  publishedDate?: string;
  description?: string;
  publisher?: string;
  imageLinks?: {
    smallThumbnail: string;
    thumbnail: string;
  };
  pageCount: number;
  previewLink?: string;
};

export interface BookItem {
  id: string;
  volumeInfo: VolumeInfo;
  saleInfo?: {
    listPrice: {
      amount: number;
    };
  };
}

/**
 * query parameters
 */
export interface Params {
  q: string;
  startIndex?: number;
}

export interface BookRepositoryInterface {
  get(params: Params): Promise<Result>;
  find(id: string): Promise<BookItem>;
}
