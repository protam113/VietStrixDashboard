//api/api.ts

/**
 * ==========================
 * 📌 @API Services URL
 * ==========================
 *
 * @desc Base Services URL
 */
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const authService = process.env.NEXT_PUBLIC_Auth_Service;
const version = process.env.NEXT_PUBLIC_Version;
const productService = process.env.NEXT_PUBLIC_Product_Service;
const blogService = process.env.NEXT_PUBLIC_Blog_Service;

/**
 * ==========================
 * 📌 @API Services URL
 * ==========================
 *
 * @desc Handle API Services URL
 */

/**
 * ========== @URL For Auth Service ==========
 */

const apiServiceAuth = `${baseURL}${authService}${version}`;

/**
 * ========== @URL For Product Service ==========
 */

const apiServiceProduct = `${baseURL}${productService}${version}`;

/**
 * ========== @URL For Product Service ==========
 */

const apiServiceBlog = `${baseURL}${blogService}${version}`;

/**
 * ========== @Endpoints ==========
 */
const endpoints = {
  //auth
  // register: process.env.NEXT_PUBLIC_REGISTER,
  // refresh: process.env.NEXT_PUBLIC_REFRESH,
  // changePassword: process.env.NEXT_PUBLIC_CHANGE_PASSWORD,
  // codePassword: process.env.NEXT_PUBLIC_RESET_PASSWORD,
  // verifyCode: process.env.NEXT_PUBLIC_VERIFY_CODE,
  logout: process.env.NEXT_PUBLIC_EMPLOYEE_LOGIN,
  login: process.env.NEXT_PUBLIC_EMPLOYEE_LOGOUT,

  currentUser: process.env.NEXT_PUBLIC_EMPLOYEE_DETAIL,

  // role
  roles: process.env.NEXT_PUBLIC_ROLES,
  role: process.env.NEXT_PUBLIC_ROLE,
  roleEdit: process.env.NEXT_PUBLIC_ROLE_EDIT,

  // employee
  employees: process.env.NEXT_PUBLIC_EMPLOYEES,
  employee: process.env.NEXT_PUBLIC_EMPLOYEE,
  employeeEdit: process.env.NEXT_PUBLIC_EMPLOYEE_EDIT,

  //category
  categories: process.env.NEXT_PUBLIC_CATEGORIES,
  category: process.env.NEXT_PUBLIC_CATEGORY,
  categoryEdit: process.env.NEXT_PUBLIC_CATEGORY_EDIT,

  //product
  products: process.env.NEXT_PUBLIC_PRODUCTS,
  product: process.env.NEXT_PUBLIC_PRODUCT,

  //document
  documents: process.env.NEXT_PUBLIC_Documents,
  document: process.env.NEXT_PUBLIC_Document,
  cateDocs: process.env.NEXT_PUBLIC_Category_Documents,

  // contact
  contacts: process.env.NEXT_PUBLIC_CONTACTS,
  contact: process.env.NEXT_PUBLIC_CONTACT,
  contactUpdate: process.env.NEXT_PUBLIC_UPDATE_CONTACT,

  //Blog
  blogs: process.env.NEXT_PUBLIC_BLOGS,
  blogDetail: process.env.NEXT_PUBLIC_BLOG_DETAIL,
  blog: process.env.NEXT_PUBLIC_BLOG,
  blogStatus: process.env.NEXT_PUBLIC_BLOG_STATUS,

  // categoryBlog
  blogCategories: process.env.NEXT_PUBLIC_BLOG_CATEGORIES,
  blogCategory: process.env.NEXT_PUBLIC_BLOG_CATEGORY_DETAIL,
  blogCategoryEdit: process.env.NEXT_PUBLIC_BLOG_CATEGORY,
  blogCategoryStatus: process.env.NEXT_PUBLIC_BLOG_CATEGORY_STATUS,

  //   faq
  faqs: process.env.NEXT_PUBLIC_FAQS,
  faq: process.env.NEXT_PUBLIC_FAQ,
  faqStatus: process.env.NEXT_PUBLIC_FAQ_STATUS,

  //   Service
  services: process.env.NEXT_PUBLIC_SERVICES,
  serviceDetail: process.env.NEXT_PUBLIC_SERVICE_DETAIL,
  service: process.env.NEXT_PUBLIC_SERVICE,
  serviceStatus: process.env.NEXT_PUBLIC_SERVICE_STATUS,

  // Media
  media: process.env.NEXT_PUBLIC_MEDIA,

  //   Seo
  seo: process.env.NEXT_PUBLIC_SEO,
};

export { apiServiceAuth, apiServiceProduct, apiServiceBlog, endpoints };
