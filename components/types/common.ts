export interface MetaDataProps {
  vidId: string;
  source: string;
  title: any;
  thumbnails: any;
}

export interface ChatlineProps {
  role?: string;
  content: string;
  metaData?: any;
  id?: number;
  session: any;
}
