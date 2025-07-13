export interface InfiniteInfo {
  id: number;
  count: number;
}

export interface InfiniteInfoData {
  page: number;
  data: InfiniteInfo[];
}
