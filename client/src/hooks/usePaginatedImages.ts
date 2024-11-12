import { useMemo, useState } from "react";
import { FilterOptions, imageService, PaginatedResult } from "../services/image.service";
import { Image } from '../types/Image';
import { useAsyncAction } from "./useAsyncAction";
import { useAsync } from "./useAsync";

const initialPaginationState = {
  imagesInPage: [],
  currentPage: 0,
  indexInPage: 0,
  totalResults: 0,
  loadPreviousPage: undefined,
  loadNextPage: undefined,
};

interface PaginatedImages {
  currentImage: Image | undefined,
  getNextImage?: () => Promise<Image>,
  getPrevImage?: () => Promise<Image>,
  imagesInPage: Image[],
  getNextPage?: () => Promise<Image[]>,
  getPreviousPage?: () => Promise<Image[]>,
  totalResults: number
}

export function usePaginatedImages(filters: FilterOptions, pageSize = 60): PaginatedImages {
  const [paginatedResults, setPaginatedResults] = useState<{
    imagesInPage: Image[];
    currentPage: number;
    indexInPage: number;
    totalResults: PaginatedResult<Image>['totalResults'];
    loadPreviousPage: PaginatedResult<Image>['loadPrevious'];
    loadNextPage: PaginatedResult<Image>['loadNext'];
  }>(initialPaginationState);

  useAsync<Image[]>(async () => {
    const res = await imageService.fetchPaginatedImages({
      ...filters,
      page: 0,
      pageSize
    });

    setPaginatedResults({
      ...initialPaginationState,
      imagesInPage: res.data,
      loadPreviousPage: res.loadPrevious,
      loadNextPage: res.loadNext
    });

    return res.data;
  }, [filters, pageSize]);

  const absoluteImageIndex = useMemo(
    () => paginatedResults.indexInPage + paginatedResults.currentPage * pageSize, 
    [pageSize, paginatedResults.indexInPage, paginatedResults.currentPage]
  );

  const currentImage = useMemo(
    () => {
      if (paginatedResults.imagesInPage.length === 0) {
        return undefined;
      }

      return paginatedResults.imagesInPage[paginatedResults.indexInPage];
    },
    [paginatedResults.imagesInPage, paginatedResults.indexInPage]
  );

  const {
    perform: getPrevPage
  } = useAsyncAction<any, Image[]>(async () => {
    const loadPreviousPage = paginatedResults?.loadPreviousPage;

    if (!loadPreviousPage) {
      return []; 
    }

    const res = await loadPreviousPage();
    setPaginatedResults({
      ...paginatedResults,
      indexInPage: pageSize - 1,
      // This is to allow for seamless iterating via `getNextImage` and `getPrevImage`
      // in pages.
      currentPage: paginatedResults.currentPage - 1,
      imagesInPage: res.data,
      loadNextPage: res.loadNext,
      loadPreviousPage: res.loadPrevious,
      totalResults: res.totalResults
    });

    return res.data;
  });

  const {
    perform: getNextPage
  } = useAsyncAction<any, Image[]>(async () => {
    const loadNext = paginatedResults?.loadNextPage;

    if (!loadNext) {
      return []; 
    }

    const res = await loadNext();
    setPaginatedResults({
      ...paginatedResults,
      indexInPage: 0,
      currentPage: paginatedResults.currentPage + 1,
      imagesInPage: res.data,
      loadNextPage: res.loadNext,
      loadPreviousPage: res.loadPrevious,
      totalResults: res.totalResults
    });

    return res.data;
  });

  const {
    perform: getNextImage
  } = useAsyncAction(async () => {
    const { indexInPage, imagesInPage } = paginatedResults;

    // TODO: Should this be < pageSize -1
    if (indexInPage < pageSize) {
      const updatedIndex = indexInPage + 1;
      setPaginatedResults({
        ...paginatedResults,
        indexInPage: updatedIndex
      })

      return imagesInPage[updatedIndex];
    }

    // In case the current image is in the next page
    const imagesInNextPage = await getNextPage();
    
    if (!imagesInNextPage?.length) {
      throw new Error("Expected to have results in next page.");
    }

    return imagesInNextPage[0];
  });

  const {
    perform: getPrevImage
  } = useAsyncAction(async () => {
    const { indexInPage, imagesInPage } = paginatedResults;

    if (indexInPage > 0) {
      const updatedIndex = indexInPage - 1;
      setPaginatedResults({
        ...paginatedResults,
        indexInPage: updatedIndex
      })

      return imagesInPage[updatedIndex];
    }

    // In case the current image is in the previous page
    const imagesInPrevPage = await getPrevPage();
    
    if (!imagesInPrevPage?.length) {
      throw new Error("Expected to have results in previous page.");
    }

    return imagesInPrevPage[pageSize - 1];
  });

  return {
    currentImage,
    getNextImage: absoluteImageIndex !== paginatedResults.totalResults ? getNextImage : undefined,
    getPrevImage: absoluteImageIndex !== 0 ? getPrevImage : undefined,
    imagesInPage: paginatedResults.imagesInPage,
    getNextPage: paginatedResults.loadNextPage ? getNextPage : undefined,
    getPreviousPage: paginatedResults.loadPreviousPage ? getPrevPage : undefined,
    totalResults: paginatedResults.totalResults
  }
}