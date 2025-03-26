# Video Collection

A video collection powered by Next.js 15 (App Router) and HeroUI 2.

Live preview: https://nextjs-video-collection.fly.dev/

## Tech Stack

- [Next.js 15](https://nextjs.org/docs/getting-started)
- [HeroUI v2](https://heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [Prisma](https://www.prisma.io/) with SQLite

## Features

- Routing
- SSR
- Responsive
- Search by title
- Date filter
- Tags filter
- Sorting options
- Detail page

### How to run locally

To install dependencies:

```bash
npm install
```

Initialize the database and seed data:

```bash
# Create the SQLite database and apply migrations
npx prisma migrate dev

# This will also run the seed script automatically
# But if you need to run it manually:
npx prisma db seed
```

To run a local preview:

```bash
npm run dev
```

## APIs

### GET /api/videos

Retrieves a paginated list of videos with optional filtering, sorting, and search capabilities.

#### Query Parameters

- `searchTerm` (optional): Search videos by title (max 100 characters)
- `sort` (optional): Sort videos by field
  - Values: `created_at` (default) | `title`
- `direction` (optional): Sort direction
  - Values: `desc` (default) | `asc`
- `since` (optional): Filter videos created after date (ISO format: YYYY-MM-DD)
  - Default: `1970-01-01`
- `before` (optional): Filter videos created before date (ISO format: YYYY-MM-DD)
  - Default: current date
- `tags` (optional): Filter by tags (comma-separated)
  - Example: `tags=YouTube,SEO,marketing`
- `page` (optional): Page number for pagination
  - Default: `1`
- `per_page` (optional): Number of items per page
  - Default: `20`

#### Response

```json
{
  "items": [
    {
      "id": string,
      "title": string,
      "thumbnail_url": string,
      "created_at": string,
      "duration": number,
      "views": number,
      "tags": string[]
    }
  ],
  "total": number,
  "page": number,
  "per_page": number,
  "total_pages": number
}
```

#### Example

```bash
GET /api/videos?searchTerm=marketing&sort=title&direction=asc&tags=SEO,YouTube&page=1&per_page=20
```

### GET /api/videos/[id]

Retrieves a specific video by ID.

#### Parameters

- `id`: Video ID (path parameter)

#### Response

```json
{
  "id": string,
  "title": string,
  "thumbnail_url": string,
  "created_at": string,
  "duration": number,
  "views": number,
  "tags": string[]
}
```

#### Example

```bash
GET /api/videos/v-001
```

#### Error Responses

Both endpoints may return the following error responses:

- `400 Bad Request`: Invalid parameters
  ```json
  {
    "error": "Invalid search parameters",
    "details": [
      {
        "path": "parameter_name",
        "message": "Error message"
      }
    ]
  }
  ```
- `404 Not Found`: Video not found (only for /api/videos/[id])
  ```json
  {
    "error": "Video not found"
  }
  ```
