#!/bin/bash

HEADER_TEXT="---
layout: page
title: API
nav_order: 2
has_children: false
---
"

API_FILE="../docs/pages/api/index.md"

echo "$HEADER_TEXT" | cat - "$API_FILE" > temp && mv temp "$API_FILE"
