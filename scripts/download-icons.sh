#!/usr/bin/env bash
set -euo pipefail

# Скрипт скачивает SVG-иконки в src/assets/icons/
mkdir -p src/assets/icons

icons=(autocad revit sketchup enscape 3dsmax)
for s in "${icons[@]}"; do
  out="src/assets/icons/${s}.svg"
  echo "Downloading $s -> $out"
  # Попытки: SimpleIcons CDN -> jsDelivr raw -> raw.githubusercontent
  if curl -fsSL "https://cdn.simpleicons.org/${s}/111827" -o "$out"; then
    echo "OK (cdn.simpleicons.org)"
  elif curl -fsSL "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${s}.svg" -o "$out"; then
    echo "OK (jsdelivr)"
  elif curl -fsSL "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${s}.svg" -o "$out"; then
    echo "OK (github raw)"
  else
    echo "Failed to download ${s} from all sources" >&2
    exit 1
  fi
done

echo "All icons downloaded to src/assets/icons/"
