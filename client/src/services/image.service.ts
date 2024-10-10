import { Category, Image } from '../types/Image';
import { isNil, isNumber } from 'lodash';
import mock from './mocked-images.json';

type Order = 'upload_time_ASC' | 'upload_time_DESC' | 'confidence_ASC' | 'confidence_DESC';

const ALL_CATEGORIES: Category[] = ['porn', 'not_porn', 'uncertain'];

export interface FilterOptions {
  from?: number;
  to?: number;
  confidence_min?: number;
  confidence_max?: number;
  categories?: Category[];
  order_by?: Order;
}

interface ImagesResponse {
  data: Image[];
  offset: number;
  totalResults: number;
}

export interface PaginatedResult<T> {
  data: T[];
  loadMore?: () => Promise<PaginatedResult<T>>;
  totalResults: number;
}

interface PaginationOptions {
  offset?: number;
  limit?: number;
}

function toUrlSearchParam(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return value.toString();
  } 

  if (Array.isArray(value)) {
    return value.join(',')
  }

  throw new Error("Unsupported type");
}

export class ImageService {
  private baseUrl: string;
  constructor() {
    this.baseUrl = process.env.BASE_URL ?? '';
  }

  private isValidResponse(json: any): json is ImagesResponse {
    if (!json || !Array.isArray(json.data) || !isNumber(json.totalResults) || !isNumber(json.offset)) {
      return false;
    }
    return true;
  }

  private async getImages(params: Required<FilterOptions> & PaginationOptions): Promise<ImagesResponse> {
    
    // TODO: Uncomment when connecting with real API
    // const res = await fetch(this.baseUrl + new URLSearchParams({
    //   from: toUrlSearchParam(params.from),
    //   to: toUrlSearchParam(params.to),
    //   confidence_min: toUrlSearchParam(params.confidence_min),
    //   confidence_max: toUrlSearchParam(params.confidence_max),
    //   categories: toUrlSearchParam(params.categories),
    //   order_by: toUrlSearchParam(params.order_by),
    //   offset: toUrlSearchParam(params.offset),
    //   limit: toUrlSearchParam(params.limit)
    // }));

    // if (res.ok) {
    //   throw new Error(`Received error ${res.status} ${res.statusText}`)
    // }

    // const resJson = await res.json();

    // TODO: Apply filtering to mock
    const resJson = mock;

    if (!this.isValidResponse(resJson)) {
      throw new Error(`Received invalid response format ${resJson?.toString()}`);
    }
    
    return resJson;
  }

  async fetchPaginatedImages({
    from = 0,
    to = Date.now(),
    confidence_min = 0,
    confidence_max = 1,
    categories = ALL_CATEGORIES,
    order_by = 'upload_time_DESC',
    page = 0,
    pageSize = 60
  }: FilterOptions & {page?: number, pageSize?: number}): Promise<PaginatedResult<Image>> {
    const params = {
      from,
      to,
      confidence_min,
      confidence_max,
      categories,
      order_by,
    };
    const { data, totalResults } = await this.getImages({
      ...params,
      offset: page * pageSize,
      limit: pageSize
    });

    const loadMore = () => this.fetchPaginatedImages({
      ...params,
      page: page + 1,
      pageSize
    });

    return {
      data,
      loadMore,
      totalResults
    }
  }
}