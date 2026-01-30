# Appwrite Migration Scripts

This directory contains migration scripts to populate the Appwrite database with data from the application.

## Prerequisites

1. **Appwrite Instance**: Ensure your Appwrite instance is running at `https://api-v2.therama.dev/v1`
2. **Database**: Database `devpad_main` must exist
3. **Collections**: Create the following collections in Appwrite:

### Collection Schemas

#### 1. `letter_words`
| Attribute | Type | Required | Array |
|-----------|------|----------|-------|
| letter | string | Yes | No |
| words | string | Yes | Yes |
| language | string | Yes | No |
| is_active | boolean | Yes | No |

#### 2. `voice_settings`
| Attribute | Type | Required | Array |
|-----------|------|----------|-------|
| voice_type | string | Yes | No |
| voice_names | string | Yes | Yes |
| language | string | Yes | No |
| priority | integer | Yes | No |
| pitch | float | Yes | No |
| rate | float | Yes | No |
| is_active | boolean | Yes | No |

#### 3. `app_settings`
| Attribute | Type | Required | Array |
|-----------|------|----------|-------|
| key | string | Yes | No |
| value | string | Yes | No |
| type | string | Yes | No |
| description | string | No | No |
| is_active | boolean | Yes | No |

## Running Migrations

Run migrations in order:

```bash
# 1. Migrate letter-word mappings (36 documents)
npm run migrate:letter-words

# 2. Migrate voice settings (2 documents)
npm run migrate:voice-settings

# 3. Migrate app settings (6 documents)
npm run migrate:app-settings

# Or run all migrations at once
npm run migrate:all
```

## What Gets Migrated

### 1. Letter-Word Mappings
- **Source**: `src/components/TypingGame.tsx`
- **Documents**: 36 (A-Z + 0-9)
- **Total Words**: 360+
- **Purpose**: Default word lists for each letter/number

### 2. Voice Settings
- **Documents**: 2 (male, female)
- **Purpose**: Voice configuration for speech synthesis

### 3. App Settings
- **Documents**: 6
- **Purpose**: Default application configuration

## Troubleshooting

### 401 Unauthorized
- Verify API key in migration scripts
- Ensure API key has write permissions

### Collection Not Found
- Create collections in Appwrite console first
- Match collection IDs exactly

### Duplicate Documents
- Delete existing documents before re-running
- Or modify scripts to update instead of create

## Notes

- Migrations use server-side Appwrite SDK with API key
- Each script is idempotent (can be run multiple times)
- Scripts will report success/failure for each document
