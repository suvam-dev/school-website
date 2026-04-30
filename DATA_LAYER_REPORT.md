# Data Layer Report

## Current state

This project does not use a real database. The entire site content is stored in a single static module: `src/data/schoolData.js`.

That means the current data layer is:

- Frontend-only
- Build-time bundled
- Not queryable
- Not validated
- Not normalized
- Not editable by non-developers

## What acts as the "database"

`src/data/schoolData.js` currently holds:

- School identity and metadata
- Navigation items
- Hero content
- About, academics, admissions, campus, facilities, events, faculty, testimonials
- Contact details
- Footer link groups

The site is therefore using a single-file content store rather than a relational database, CMS, or API.

## Strengths

- Very simple to understand
- Zero backend complexity
- Fast local development
- Low operational overhead
- Content is already grouped by page/feature

## Risks and structural issues

### 1. No schema or validation

There is no runtime validation for the exported objects. A missing field or typo in `schoolData.js` can break a section silently.

Impact:

- Content regressions are easy to introduce
- Refactors are brittle
- No guardrails for future editors

### 2. Single large content file

All content lives in one file, so unrelated edits collide in the same place.

Impact:

- Harder maintenance
- Higher merge conflict risk
- Poor separation between school profile, contact data, events, and page content

### 3. Data inconsistency across the same entity

The file mixes two different school identities.

Examples:

- `SCHOOL` says `Holy Cross School`, `Pandua, West Bengal`, founded `1951`
- Multiple content blocks say `Holy Cross School`, `New Delhi`, `1952`, `CBSE`

Impact:

- The site presents contradictory identity data
- Reuse of shared fields is weak
- Manual text duplication has drifted

### 4. Repeated content embedded in components

Some school-specific copy was hard-coded directly in page/component files instead of sourced from shared data.

Impact:

- Same information has to be updated in multiple places
- Content can diverge from the main data file

### 5. Static forms are not connected to storage

Admissions and contact forms only toggle local success state. No submission is persisted.

Impact:

- No enquiry capture
- No audit trail
- No admin workflow

## Refactor completed in this pass

The codebase was changed to reduce repetition around content rendering:

- Page composition is now config-driven through `src/pages/pageDefinitions.jsx`
- Shared page rendering is centralized in `src/pages/PageRenderer.jsx`
- Repeated section label/title/description markup is centralized in `src/components/common/SectionIntro.jsx`
- Footer location text now comes from shared school metadata
- Campus page hero copy now derives the school name from shared data
- Global font setup is now applied consistently from `src/index.css`

## Recommended normalization

If this project stays frontend-only:

- Split `schoolData.js` into smaller modules:
  - `schoolProfile.js`
  - `academicsData.js`
  - `admissionsData.js`
  - `contactData.js`
  - `eventsData.js`
- Add a validation layer with Zod or a similar schema tool
- Derive repeated labels from shared school metadata instead of hard-coding school name, location, board, and year in prose

If this project moves to a real backend or CMS:

- `school_profile`
- `site_navigation`
- `page_sections`
- `events`
- `notices`
- `faculty`
- `testimonials`
- `contact_channels`
- `admission_enquiries`

## Priority fixes still recommended

1. Resolve the school identity conflict in `src/data/schoolData.js`
2. Decide whether the school is ICSE or CBSE and update all dependent copy
3. Replace placeholder contact/address data with verified values
4. Connect forms to a real persistence layer if enquiries matter
5. Add schema validation for shared content objects

## Conclusion

The app is structurally a static content site, not a database-backed application. After this pass, repeated rendering code is reduced and typography is centralized, but the main remaining risk is data accuracy inside the shared content file.
