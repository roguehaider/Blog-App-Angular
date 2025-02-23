export interface Blog {
  id: string;
  title: string;
  description: string;
  category: string;
  createdOn: string;
  createdBy: string;
  imageUrl: string;

  highlightedTitle?: string;
  highlightedDescription?: string;
  highlightedCategory?: string;
  highlightedCreatedBy?: string;
}
