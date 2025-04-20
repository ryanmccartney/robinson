#!/bin/bash

HEADER_TEXT="---
layout: page
title: Changelog
nav_order: 5
has_children: false
---

# Changelog
"

API_FILE="../docs/pages/changelog/index.md"

sed -i '' '1,6d' "$API_FILE"
echo "$HEADER_TEXT" | cat - "$API_FILE" > temp && mv temp "$API_FILE"
