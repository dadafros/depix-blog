#!/bin/bash
# Validates all blog posts before build.
# Runs in GitHub Actions — fails the build if any post is invalid.

set -euo pipefail

ERRORS=0
PT_DIR="content/pt/posts"
EN_DIR="content/en/posts"
TMP_DIR="$(mktemp -d)"
PT_KEYS_FILE="$TMP_DIR/pt-translation-keys.txt"
EN_KEYS_FILE="$TMP_DIR/en-translation-keys.txt"

trap 'rm -rf "$TMP_DIR"' EXIT

error() {
  echo "ERROR: $1"
  ERRORS=$((ERRORS + 1))
}

extract_frontmatter() {
  awk '/^---$/{n++; next} n==1{print} n>=2{exit}' "$1"
}

extract_body() {
  awk '/^---$/{n++; next} n>=2{print}' "$1"
}

extract_images_block() {
  echo "$1" | awk '
    /^images:/ {capture=1; next}
    capture && /^[^[:space:]-]/ {capture=0}
    capture {print}
  '
}

validate_image_path() {
  local file="$1"
  local image_path="$2"
  local translation_key="$3"

  if [ -z "$image_path" ]; then
    error "$file: image path cannot be empty"
    return
  fi

  if ! echo "$image_path" | grep -qE '^/images/posts/[a-z0-9-]+/[a-z0-9-]+-(1x1|4x3|16x9)\.(png|webp|jpe?g)$'; then
    error "$file: image path must follow /images/posts/<translationKey>/<translationKey>-<ratio>.<ext>"
    return
  fi

  if ! echo "$image_path" | grep -q "^/images/posts/${translation_key}/"; then
    error "$file: image path must live under /images/posts/$translation_key/"
  fi

  if [ ! -f "static${image_path}" ]; then
    error "$file: referenced image does not exist at static${image_path}"
  fi
}

# Check PT and EN have same number of posts
pt_count=$(find "$PT_DIR" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
en_count=$(find "$EN_DIR" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
if [ "$pt_count" != "$en_count" ]; then
  error "PT has $pt_count posts but EN has $en_count — every post needs both languages"
fi

# Validate each post
for file in "$PT_DIR"/*.md "$EN_DIR"/*.md; do
  [ -f "$file" ] || continue
  name=$(basename "$file" .md)

  # Check slug is kebab-case
  if ! echo "$name" | grep -qE '^[a-z0-9]+(-[a-z0-9]+)*$'; then
    error "$file: slug must be kebab-case (got $name)"
  fi

  frontmatter=$(extract_frontmatter "$file")

  # Check required frontmatter fields
  for field in title date description tags author translationKey image images; do
    if ! echo "$frontmatter" | grep -q "^${field}:"; then
      error "$file: missing frontmatter field '$field'"
    fi
  done

  # Check title length (max 65 chars)
  title=$(echo "$frontmatter" | grep '^title:' | sed 's/^title: *"//;s/"$//')
  if [ ${#title} -gt 65 ]; then
    error "$file: title too long (${#title} chars, max 65)"
  fi

  # Check description length (50-160 chars)
  desc=$(echo "$frontmatter" | grep '^description:' | sed 's/^description: *"//;s/"$//')
  desc_len=${#desc}
  if [ "$desc_len" -lt 50 ] 2>/dev/null; then
    error "$file: description too short ($desc_len chars, min 50)"
  fi
  if [ "$desc_len" -gt 160 ] 2>/dev/null; then
    error "$file: description too long ($desc_len chars, max 160)"
  fi

  translation_key=$(echo "$frontmatter" | grep '^translationKey:' | sed 's/^translationKey: *"//;s/"$//')
  if ! echo "$translation_key" | grep -qE '^[a-z0-9]+(-[a-z0-9]+)*$'; then
    error "$file: translationKey must be kebab-case"
  fi

  if echo "$file" | grep -q "^$PT_DIR/"; then
    echo "$translation_key" >> "$PT_KEYS_FILE"
  else
    echo "$translation_key" >> "$EN_KEYS_FILE"
  fi

  primary_image=$(echo "$frontmatter" | grep '^image:' | sed 's/^image: *"//;s/"$//')
  validate_image_path "$file" "$primary_image" "$translation_key"
  if ! echo "$primary_image" | grep -q -- '-16x9\.'; then
    error "$file: image should point to the 16x9 variant for social previews"
  fi

  images_block=$(extract_images_block "$frontmatter")
  image_lines=$(echo "$images_block" | grep -c '^[[:space:]]*-' || true)
  if [ "$image_lines" -lt 3 ]; then
    error "$file: images must contain 3 variants (1x1, 4x3, 16x9)"
  fi

  image_paths=""
  has_1x1=0
  has_4x3=0
  has_16x9=0
  while IFS= read -r image_line; do
    [ -n "$image_line" ] || continue
    image_path=$(echo "$image_line" | sed 's/^[[:space:]]*-[[:space:]]*"//;s/"$//')
    image_paths="${image_paths}${image_path}
"
    validate_image_path "$file" "$image_path" "$translation_key"
    echo "$image_path" | grep -q -- '-1x1\.' && has_1x1=1
    echo "$image_path" | grep -q -- '-4x3\.' && has_4x3=1
    echo "$image_path" | grep -q -- '-16x9\.' && has_16x9=1
  done <<< "$images_block"

  if [ "$has_1x1" -ne 1 ] || [ "$has_4x3" -ne 1 ] || [ "$has_16x9" -ne 1 ]; then
    error "$file: images must include 1x1, 4x3, and 16x9 variants"
  fi

  if ! echo "$image_paths" | grep -Fxq "$primary_image"; then
    error "$file: image must also be present in the images list"
  fi

  # Extract body (everything after second ---)
  body=$(extract_body "$file")

  # Check word count (min 700 to allow some margin)
  word_count=$(echo "$body" | wc -w | tr -d ' ')
  if [ "$word_count" -lt 700 ]; then
    error "$file: too short ($word_count words, min 800)"
  fi

  # Check has at least one H2
  if ! echo "$body" | grep -q '^## '; then
    error "$file: must contain at least one H2 heading (##)"
  fi

  # Check has CTA link to depixapp.com
  if ! echo "$body" | grep -q 'depixapp.com'; then
    error "$file: must contain a CTA link to depixapp.com"
  fi
done

for lang_file in "$PT_KEYS_FILE" "$EN_KEYS_FILE"; do
  duplicates=$(sort "$lang_file" | uniq -d || true)
  if [ -n "$duplicates" ]; then
    error "$(basename "$lang_file" .txt): duplicate translationKey(s): $(echo "$duplicates" | tr '\n' ' ' | sed 's/[[:space:]]*$//')"
  fi
done

if ! diff -u <(sort "$PT_KEYS_FILE") <(sort "$EN_KEYS_FILE") >/dev/null 2>&1; then
  error "PT and EN posts must share the same translationKey set"
fi

if [ $ERRORS -gt 0 ]; then
  echo ""
  echo "VALIDATION FAILED: $ERRORS error(s) found."
  exit 1
fi

echo "All posts validated successfully."
