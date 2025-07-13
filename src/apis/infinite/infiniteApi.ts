import { InfiniteInfoData } from '@components/study/infinite-scroll/infiniteDefines';

export const getInfiniteInfo = async (page: number): Promise<InfiniteInfoData> => {
  try {
    const response = await fetch(`/api/randomnumbers?page=${page}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (err) {
    console.error(err);
  }

  throw 'Failed to fetch infinite info';
};
