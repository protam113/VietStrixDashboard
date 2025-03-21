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
const versionDoc = process.env.NEXT_PUBLIC_Document_Version;
const productService = process.env.NEXT_PUBLIC_Product_Service;
const docsURL = process.env.NEXT_PUBLIC_DOCUMENT_BASE_URL;

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

const apiServiceDocument = `${docsURL}/api${versionDoc}`;

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
  logout: process.env.NEXT_PUBLIC_Employee_Logout,
  login: process.env.NEXT_PUBLIC_Employee_Login,

  //current user lgin
  // updateProfile: process.env.NEXT_PUBLIC_UPDATE_PROFILE,
  currentUser: process.env.NEXT_PUBLIC_Employee_Detail,

  // role
  roles: process.env.NEXT_PUBLIC_Roles,
  role: process.env.NEXT_PUBLIC_Role,
  roleEdit: process.env.NEXT_PUBLIC_RoleEdit,

  // employee
  employees: process.env.NEXT_PUBLIC_Employees,
  employee: process.env.NEXT_PUBLIC_Employee,
  employeeEdit: process.env.NEXT_PUBLIC_EmployeeEdit,

  //category
  categories: process.env.NEXT_PUBLIC_Categories,
  category: process.env.NEXT_PUBLIC_Category,
  categoryEdit: process.env.NEXT_PUBLIC_CategoryEdit,

  //product
  products: process.env.NEXT_PUBLIC_Products,
  product: process.env.NEXT_PUBLIC_Product,
  //      //user
  //      users: process.env.NEXT_PUBLIC_USERS,
  //      blocked: process.env.NEXT_PUBLIC_BLOCKED,

  //document
  documents: process.env.NEXT_PUBLIC_Documents,
  document: process.env.NEXT_PUBLIC_Document,
  cateDocs: process.env.NEXT_PUBLIC_Category_Documents,

  // contact
  contacts: process.env.NEXT_PUBLIC_CONTACTS,
  contact: process.env.NEXT_PUBLIC_CONTACT,
  contactUpdate: process.env.NEXT_PUBLIC_UpdateCONTACT,

  //Blog
  blogs: process.env.NEXT_PUBLIC_Blogs,
  blog: process.env.NEXT_PUBLIC_Blog,
  cateBlog: process.env.NEXT_PUBLIC_Category_Blogs,
  cateBlogDetail: process.env.NEXT_PUBLIC_Cateogry_Blog,

  //      //category(thể loại)
  //      category: process.env.NEXT_PUBLIC_CATEGORY,
  //      categories: process.env.NEXT_PUBLIC_CATEGORIES,

  //     //role
  //      roles:  process.env.NEXT_PUBLIC_ROLES,
  //      roleAddUserToManager:  process.env.NEXT_PUBLIC_ADD_MANAGER,
  //      blockUser:  process.env.NEXT_PUBLIC_BLOCKED,

  //      banner: process.env.NEXT_PUBLIC_BANNER
};

export { apiServiceAuth, apiServiceProduct, apiServiceDocument, endpoints };
