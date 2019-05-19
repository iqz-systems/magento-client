import * as util from 'util';
import { RestClient } from '../rest-client';
import { plainToClass } from 'class-transformer';
import { ListResult, SearchCriteria, SearchFilterGroup } from '../common-models';
import { ClientBase } from '../client-base';
import { Product } from './models';

export class ProductsClient extends ClientBase {

  constructor(restClient: RestClient) {
    super(restClient);
  }

  /**
   * List all products of a specified category.
   * @method listByCategory
   * @param  categoryId     The category ID of the products.
   * @param  pageSize       The number of results to be fetched in one "page" of API response. Default is 9999.
   * @param  currentPage    The current page of the "pages" of result. Use in conjunction with pageSize.
   * @return                A list of products.
   */
  async listByCategory(
    categoryId: string | number,
    pageSize: number = 9999,
    currentPage: number = 1
  ): Promise<ListResult<Product>> {
    const searchCriteria = new SearchCriteria();
    const filterGroup = new SearchFilterGroup();
    filterGroup.addSearchFilter('category_id', categoryId, 'eq');
    searchCriteria.addSearchFilterGroup(filterGroup);
    const query = `searchCriteria[pageSize]=${pageSize}&searchCriteria[currentPage]=${currentPage}`
      + `&${searchCriteria.toString()}`;
    const endpointUrl = util.format('/products?%s', query);
    try {
      const result = await this.restClient.get(endpointUrl);
      return new ListResult<Product>(result, plainToClass(Product, result.items as Product[]));
    } catch (error) {
      throw error;
    }
  }

  /**
   * List all products in Magento store.
   * @method list
   * @param  pageSize    The number of results to be fetched in one "page" of API response. Default is 9999.
   * @param  currentPage The current page of the "pages" of result. Use in conjunction with pageSize.
   * @return             A list of products.
   */
  async list(pageSize: number = 9999, currentPage: number = 1): Promise<ListResult<Product>> {
    const query = `searchCriteria[pageSize]=${pageSize}&searchCriteria[currentPage]=${currentPage}`;
    const endpointUrl = util.format('/products?%s', query);
    try {
      const result = await this.restClient.get(endpointUrl);
      return new ListResult<Product>(result, plainToClass(Product, result.items as Product[]));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search for products in Magento store.
   * @method search
   * @param  searchCriteria Search criteria describing what you need to search.
   * @param  pageSize       The number of results to be fetched in one "page" of API response. Default is 9999.
   * @param  currentPage    The current page of the "pages" of result. Use in conjunction with pageSize.
   * @return                A list of products based on search criteria.
   */
  async search(searchCriteria: SearchCriteria, pageSize: number = 9999, currentPage: number = 1): Promise<ListResult<Product>> {
    const query = `searchCriteria[pageSize]=${pageSize}&searchCriteria[currentPage]=${currentPage}`
      + `&${searchCriteria.toString()}`;
    const endpointUrl = util.format('/products?%s', query);
    try {
      const result = await this.restClient.get(endpointUrl);
      return new ListResult<Product>(result, plainToClass(Product, result.items as Product[]));
    } catch (error) {
      throw error;
    }
  }

  async create(productAttributes: object): Promise<any> {
    return await this.restClient.post('/products', productAttributes);
  }

  async update(productSku: string, productAttributes: object): Promise<any> {
    const endpointUrl = util.format('/products/%s', productSku);
    return await this.restClient.put(endpointUrl, productAttributes);
  }

  async delete(productSku: string): Promise<any> {
    const endpointUrl = util.format('/products/%s', productSku);
    return this.restClient.delete(endpointUrl);
  }
}
