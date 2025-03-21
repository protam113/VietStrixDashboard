# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- Multi-language support for the website.
- "Get a Quote & Order" page with smooth animations.
- Integration of a new API for authentication.

### Fixed

- Improved page load performance by optimizing React Query.
- Fixed login issue when using OAuth.

### Removed

- Removed `moment.js`, replaced with `date-fns` to reduce bundle size.

## [1.0.5] - 2025-03-21

### Added

- Design a new NoResults components
- Add document page
- Add documentation page layout
- Add logic for this documentation page
- Add documentation detail page

### Changed

### Fixed

---

## [1.0.4] - 2025-03-20

### Added

- Design a new NoResults components
- Add category list of documentation
- Add Documentation page
- Add Api for category & documentation

### Changed

- Refactored `authstore` to optimize authentication and authorization, with added descriptive notes for hooks.
- Optimized constants to improve metadata handling.
- Split the products table and products page

### Fixed

- Fixed server-side rendering issues.
- Fix loading & error design for show products pages.

---

## [1.0.2] - 2025-03-19

### Added

- Add Docker , Dockerfile for dev & prod
- Create Hook for create employee and page for create employee
- Create Page for create employee

### Changed

### Fixed

---

## [1.0.1] - 2025-03-18

### Added

- Add new layout for create product
- Add get product by category

### Changed

- Change json create to formdata

### Fixed

- No Fixed

---

## [1.0.0] - 2025-03-17

### Added

- First official release of the website.
- User registration and login functionality with JWT.
- Minimalist yet modern and responsive UI.
- **AuthStore** using Zustand for authentication state management.
- Designed and implemented role-based authentication across the entire application.
- Added product listing, category listing, and product filtering by category.
- Added create product page, used with api.

### Changed

- Migrated package manager from **npm** to **yarn**.

### Fixed

- Enhanced page loading speed with Server-Side Rendering (SSR).
- Optimized state management using Zustand.
- Fixed layout issues across the project.

---

## [0.1.0] - 2025-02-23

### Added

- Initialized the project and designed the file structure.

---

**Notes:**

- This format follows [Keep a Changelog](https://keepachangelog.com/).
- Uses [Semantic Versioning](https://semver.org/).
