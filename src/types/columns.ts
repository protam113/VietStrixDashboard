/**
 * ==========================
 * 📌 @ROLE
 * ==========================
 */

export const RoleColumns = [
  {
    key: 'id',
    label: 'ID',
    className: 'font-mono text-sm text-muted-foreground',
  },
  { key: 'title', label: 'Title', className: 'font-medium' },
  { key: 'actions', label: 'Actions', className: 'text-right' },
];

/**
 * ==========================
 * 📌 @CATEGORY
 * ==========================
 */

export const CategoryColumns = [
  {
    key: 'id',
    label: 'ID',
    className: 'font-mono text-sm text-muted-foreground',
  },
  { key: 'detail', label: 'Detail', className: 'font-medium' },
  { key: 'title', label: 'Title', className: 'font-medium' },
  { key: 'actions', label: 'Actions', className: 'text-right' },
];

/**
 * ==========================
 * 📌 @EMPLOYEE
 * ==========================
 */

export const EmployeeColumns = [
  {
    key: 'id',
    label: 'ID',
    className: 'font-mono text-sm text-muted-foreground',
  },
  { key: 'username', label: 'Username', className: 'font-medium' },
  { key: 'name', label: 'Name', className: 'font-medium' },
  { key: 'email', label: 'Email', className: 'font-medium' },
  { key: 'position', label: 'Position', className: 'font-medium' },
  { key: 'role', label: 'Role', className: 'font-medium' },
];

/**
 * ==========================
 * 📌 @PRODUCT
 * ==========================
 */

export const ProductColumns = [
  {
    key: 'id',
    label: 'ID',
    className: 'font-mono text-sm text-muted-foreground',
  },
  { key: 'number', label: 'Number', className: 'font-medium' },
  { key: 'detail', label: 'Detail', className: 'font-medium' },
  { key: 'title', label: 'Title', className: 'font-medium' },
  { key: 'price', label: 'Price', className: 'font-medium' },
  { key: 'categories', label: 'Categories', className: 'font-medium' },
  { key: 'actions', label: 'Actions', className: 'text-right' },
];

/**
 * ==========================
 * 📌 @Contact
 * ==========================
 */

export const ContactColumns = [
  {
    key: 'id',
    label: 'ID',
    className: 'font-mono text-sm text-muted-foreground',
  },
  { key: 'number', label: 'Number', className: 'font-medium' },
  { key: 'name', label: 'Name', className: 'font-medium' },
  { key: 'phone_number', label: 'phone_number', className: 'font-medium' },
  { key: 'email', label: 'Email', className: 'font-medium' },
  { key: 'status', label: 'Status', className: 'font-medium' },
  { key: 'actions', label: 'Actions', className: 'text-right' },
];

/**
 * ==========================
 * 📌 @FAQ
 * ==========================
 */

export const FaqColumns = [
  {
    key: '_id',
    label: 'ID',
    className: 'font-mono text-sm text-muted-foreground',
  },
  { key: 'question', label: 'Question', className: 'font-semibold' },

  { key: 'status', label: 'Status', className: 'font-semibold' },
  { key: 'actions', label: 'Actions', className: 'text-right' },
];
