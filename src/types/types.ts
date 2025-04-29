/**
 * ==========================
 * @Filters
 * ==========================
 */

export interface Filters {
  [key: string]: string | number | string[] | undefined;
}

/**
 * ==========================
 *  @PAGINATION
 * ==========================
 */

interface Pagination {
  total_page: number;
  page_size: number;
  current_page: number;
  total: number;
}

/**
 * ==========================
 * @PushButtonProps
 * ==========================
 */ export interface PushButtonProps {
  href: string;
  label: string;
}

/**
 * ==========================
 *  @UPLOAD_MEDIA
 * ==========================
 */

export interface UploadMedia {
  path: string;
  file: File;
}

/**
 * ==========================
 * @ImageItem
 * ==========================
 */

export interface ImageItem {
  file: File | string;
  preview: string;
  id: string;
  name: string;
  size: number;
  type: string;
}

/**
 * ==========================
 * @Role
 * ==========================
 */

interface Role {
  id: string;
  title: string;
  slug: string;
}

export interface FetchRoleListResponse {
  status: string;
  data: {
    pagination: {
      page: number;
      page_size: number;
      total: number;
      total_page: number;
    };
    result: Role[];
  };
}

/*
  Create Role
*/

export interface CreateRoleItem {
  title: string;
}

// ========================
// End Role
// ========================

/**
 * ==========================
 * @Employee
 * ==========================
 */

/*
  Employee Attribute Declaration
*/
interface Employee {
  id: string;
  username: string;
  name: string;
  email: string;
  dob: Date;
  identity: string;
  position: string;
  role: Role;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserDataComponents {
  id: string;
  username: string;
  email: string;
  name: string;
  roleTitle: string;
  isActive: boolean;
}

export interface FetchEmployeeListResponse {
  status: string;
  data: {
    pagination: {
      page: number;
      page_size: number;
      total: number;
      total_page: number;
    };
    result: Employee[];
  };
}

/*
Create Employee
*/

export interface CreateEmployeeItem {
  username: string;
  name: string;
  email: string;
  dob: Date;
  identity: string;
  position: string;
  role_id: string;
  is_active: boolean;
  password: string;
  contact: string;
  phone_number: string;
}

export interface CreateEmployeeResponse {
  employees: CreateEmployeeItem[];
}

// ========================
// End Employee
// ========================

/**
 * ==========================
 *  @CATEGORY
 * ==========================
 */

/*
  Category Attribute Declaration
*/
interface Category {
  id: string;
  title: string;
  slug: string;
}

export interface FetchCategoryListResponse {
  status: string;
  data: {
    pagination: {
      page: number;
      page_size: number;
      total: number;
      total_page: number;
    };
    result: Category[];
  };
}

/*
  Category Detail Attribute Declaration
*/
interface CategoryDetail {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface FetchCategoryDetailResponse {
  status: string;
  data: CategoryDetail;
}

/*
  Create Category
*/

export interface CreateCategoryItem {
  title: string;
  parent_id: string | null;
}

/*
  Edit Category
*/

export interface EditCategoryItem {
  title: string;
}

/*
  Delete Category
*/

export interface DeleteCategoryItem {
  ids: string[];
}

// ========================
// End Category
// ========================

/**
 * ==========================
 *  @Media
 * ==========================
 */

interface Media {
  id: string;
  file_type: string;
  file: string;
}

// ========================
// End Media
// ========================

/**
 * ==========================
 *  @PRODUCT
 * ==========================
 */

/*
  @Product Attribute Declaration
*/

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: string;
  categories: Category[];
  medias: Media[];
  link: string;
  created_at: string;
  updated_at: string;
}

export interface FetchProductListResponse {
  status: string;
  data: {
    pagination: {
      page: number;
      page_size: number;
      total: number;
      total_page: number;
    };
    result: Product[];
  };
}

/*
  @Product Detail Attribute Declaration
*/
interface ProductDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  categories: Category[];
  medias: Media[];
  link: string;
  created_at: string;
  updated_at: string;
}

export interface FetchProductDetailResponse {
  status: string;
  data: ProductDetail;
}

/*
  Create Product
*/

export interface CreateProductItem {
  title: string;
  description: string;
  price: string;
  categories: string[];
  files: File[] | string[] | null;
  link: string;
}

/*
  Create Product
*/

export interface CreateProductPage {
  title: string;
  description: string;
  price: string;
  categories: string[];
  link: string;
}

// ========================
// End Product
// ========================

/**
 * ==========================
 *  @DOCUMENT @CATEGORY
 * ==========================
 */

/**
 * ==========================
 *  @CATEGORY
 * ==========================
 */

/*
  Category Attribute Declaration
*/
interface DocsCategory {
  _id: string;
  name: string;
  slug: string;
  subcategories: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FetchDocsCategoryListResponse {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  result: DocsCategory[];
}

/*
  Category Detail Attribute Declaration
*/
interface CategoryDetail {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface FetchCategoryDetailResponse {
  status: string;
  data: CategoryDetail;
}

/*
  Create Category
*/

export interface CreateDocsCategoryItem {
  name: string;
  slug: string;
  subcategories: string[];
}

/*
  @Document
*/

export interface EditCategoryItem {
  title: string;
}

/**
 * ==========================
 *  @DOCUMENT
 * ==========================
 */

interface CategoryDocs {
  _id: string;
  name: string;
  slug: string;
  subcategories: string[];
}

interface Docs {
  _id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  link?: string | null;
  createdAt: string;
  updatedAt: string;
  category: CategoryDocs;
}

export interface FetchDocsListResponse {
  pagination: {
    currentPage: number;
    pageSize: number;
    totalDocs: number;
    totalPages: number;
  };
  result: Docs[];
}

interface DocumentDetail {
  _id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  link?: string | null; // Cho phép null hoặc undefined
  createdAt: string;
  updatedAt: string;
  category: CategoryDocs; // Hoặc CategoryDocs nếu API trả về object đầy đủ
}

export interface DocumentDetailResponse {
  data: DocumentDetail;
}

// ========================
// End DOCUMENT & Category
// ========================

/**
 * ==========================
 *  @CONTACT
 * ==========================
 */

interface ContactService {
  _id: string;
  title: string;
}

interface ContactList {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  message: string;
  link?: string;
  service?: ContactService;
  createdAt: string;
  updatedAt: string;
}

export interface FetchContactListResponse {
  pagination: Pagination;
  results: ContactList[];
}

/*
  Update status
*/

export interface UpdateContactStatus {
  status: string;
}

// ========================
// End Contact
// ========================

/**
 * ==========================
 *  @BLOG_CATEGORY
 * ==========================
 */
/**
 * ==========================
 *  @CATEGORY
 * ==========================
 */

/*
  Category Attribute Declaration
*/
export interface BlogCategory {
  _id: string;
  title: string;
  slug: string;
  status: string;
  user?: UserDataComponents;
  createdAt: string;
  updatedAt: string;
}

export interface FetchBlogCategoryListResponse {
  pagination: Pagination;
  results: BlogCategory[];
}

/*
  Create Blog Category
*/

export interface CreateBlogCategoryItem {
  name: string;
  slug: string;
  subcategories?: string[];
}

interface BlogCategoryDetail {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface FetchBlogCategoryDetailResponse {
  status: string;
  data: BlogCategoryDetail;
}

/**
 * ==========================
 *  @BLOG
 * ==========================
 */

/**
 * ==========================
 *  @BLOG_CATEGORY
 * ==========================
 */
interface BlogChildCategory {
  _id: string;
  name: string;
}

interface BlogList {
  _id: string;
  title: string;
  content: string;
  description: string;
  file: string;
  link: string;
  slug: string;
  views: number;
  user?: UserDataComponents;
  category: BlogChildCategory[];
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
export interface FetchBlogListResponse {
  pagination: Pagination;
  results: BlogList[];
}

/**
 * ==========================
 *  @BLOG_DETAIL
 * ==========================
 */
export interface BlogDetail {
  _id: string;
  title: string;
  slug: string;
  content: string;
  file: string;
  category: BlogChildCategory;
  user?: UserDataComponents;
  views: number;
  status: string;
  description: string;
  link?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BlogDetailResponse {
  status: string;
  result: BlogDetail;
}

/**
 * ==========================
 *  @BLOG_CREATED
 * ==========================
 */

export interface CreateBlogItem {
  title: string;
  content: string;
  file: File;
  category: string;
  description: string;
  status: string;
  link?: string | null;
}

/**
 * ==========================
 *  @FAQ
 * ==========================
 */

interface FaQList {
  _id: string;
  question: string;
  answer: string;
  status: string;
  user: UserDataComponents;
  createdAt: string;
  updatedAt: string;
}

export interface FetchFaQListResponse {
  pagination: Pagination;
  results: FaQList[];
}

export interface CreateFaQItem {
  question: string;
  answer: string;
  status: string;
}

export interface UpdateFaQItem {
  question?: string;
  answer?: string;
  status?: string;
}

/**
 * ==========================
 *  @SERVICE_DETAIL
 * ==========================
 */

export interface ServiceDetail {
  _id: string;
  title: string;
  slug: string;
  file: string;
  content: string;
  price: number;
  views: number;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceDetailResponse {
  status: string;
  result: ServiceDetail;
}

/**
 * ==========================
 *  @SERVICE_DETAIL
 * ==========================
 */

export interface ServiceDetailResponse {
  _id: string;
  title: string;
  slug: string;
  file: string;
  content: string;
  price: number;
  views: number;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * ==========================
 *  @SERVICE_Create
 * ==========================
 */

export interface CreateServiceItem {
  title: string;
  file: File;
  content: string;
  price: string;
  status?: string;
  description: string;
}

/**
 * ==========================
 *  @UPDATE_STATUS
 * ==========================
 */

export interface UpdateStatus {
  status: string;
}

/**
 * ==========================
 *  @SERVICE
 * ==========================
 */

interface ServiceList {
  _id: string;
  title: string;
  content: string;
  description: string;
  file: string;
  slug: string;
  user?: UserDataComponents;
  views: number;
  price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface FetchServiceListResponse {
  pagination: Pagination;
  results: ServiceList[];
}

/**
 * ==========================
 *  @SEO
 * ==========================
 */

export interface SeoData {
  site_title: string;
  site_description: string;
  keywords: string[];
  domain: string;
  google_analytics_id?: string;
  gtm_id?: string;
  facebook_pixel_id?: string;
  search_console_verification?: string;
}

export interface UpdateSeo {
  site_title?: string;
  site_description?: string;
  domain?: string;
  keywords?: string[];
  google_analytics_id?: string;
  gtm_id?: string;
  facebook_pixel_id?: string;
  search_console_verification?: string;
}
