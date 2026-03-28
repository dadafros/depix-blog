#!/bin/bash
# Validates all blog posts before build.
# Runs in GitHub Actions — fails the build if any post is invalid.

set -e

ERRORS=0
PT_DIR="content/pt/posts"
EN_DIR="content/en/posts"

error() {
  echo "ERROR: $1"
  ERRORS=$((ERRORS + 1))
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

  # Extract frontmatter (between first two ---)
  frontmatter=$(awk '/^---$/{n++; next} n==1{print} n>=2{exit}' "$file")

  # Check required frontmatter fields
  for field in title date description tags author; do
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

  # Extract body (everything after second ---)
  body=$(awk '/^---$/{n++; next} n>=2{print}' "$file")

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

if [ $ERRORS -gt 0 ]; then
  echo ""
  echo "VALIDATION FAILED: $ERRORS error(s) found."
  exit 1
fi

echo "All posts validated successfully."
