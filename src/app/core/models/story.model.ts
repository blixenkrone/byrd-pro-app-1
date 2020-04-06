export interface IStoryParams {
  page: number;
  hits: number;
  feed: 'curated' | 'trending' | 'latest' | 'admin';
}

export interface IAssignmentParams {
  page: number;
  hits: number;
  feed: 'curated' | 'trending' | 'latest' | 'admin';
}

export interface IStoriesResponse {
  hits: IStoryResponse
}

/**
 * @prop storyId sometimes doesn't exist
 */
export interface IStoryResponse {
  assignmentId?: string;
  storyHeadline: string;
  storyDescription: string;
  storyPrice: number;
  isExclusive: boolean;
  pictureDate: number;
  uploadDate: number;
  storyId: string;
  objectID: string;
  storyType: 'single' | 'multiple';
  media: IStoryMedia;
  assignment: IAssignment;
}

interface IStoryMedia {
  _geoloc: { lat: number, lng: number };
  mediaDate: Date | number;
  mediaPreview: string;
  mediaThumbnailImage: string;
  mediaType: 'image' | 'video';
}

export interface IAssignment {
  assignmentDescription: string;
  assignmentHeadline: string;
  displayName: string;
  objectID: string;
}
