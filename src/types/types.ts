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
 * @PushButtonProps
 * ==========================
 */ export interface PushButtonProps {
  href: string;
  label: string;
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
/*
  Role Attribute Declaration
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
  data: DocsCategory[];
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
  data: Docs[];
}

export interface DocumentDetailResponse {
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

// ========================
// End DOCUMENT & Category
// ========================

/**
 * ==========================
 *  @CONTACT
 * ==========================
 */

interface ContactList {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  message: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

export interface FetchContactListResponse {
  pagination: {
    currentPage: number;
    pageSize: number;
    totalDocs: number;
    totalPages: number;
  };
  data: ContactList[];
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
interface BlogChildCategory {
  _id: string;
  name: string;
  slug: string;
}

interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
  subcategories: BlogChildCategory[]; // Cập nhật đây là một mảng các BlogCategory (thay vì chỉ lưu ID)
  createdAt: string;
  updatedAt: string;
}

export interface FetchBlogCategoryListResponse {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: BlogCategory[];
}

/*
  Create Blog Category
*/

export interface CreateBlogCategoryItem {
  name: string;
  slug: string;
  subcategories?: string[];
}
