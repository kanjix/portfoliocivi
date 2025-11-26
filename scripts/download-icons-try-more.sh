#!/usr/bin/env bash
set -euo pipefail

mkdir -p src/assets/icons

# Для каждого ключевого имени перечислим набор возможных slug'ов
declare -A candidates
candidates[autocad]="autocad"
candidates[revit]="revit autodesk-revit"
candidates[sketchup]="sketchup sketchup3d"
candidates[enscape]="enscape"
candidates[3dsmax]="3dsmax 3ds-max 3ds_max"

# Функция попытки скачать по списку URL
try_urls() {
  local out=$1
  shift
  local urls=("$@")
  for url in "${urls[@]}"; do
    if curl -fsSL "$url" -o "$out"; then
      echo "OK <- $url"
      return 0
    else
      echo "fail: $url"
    fi
  done
  return 1
}

for key in "autocad" "revit" "sketchup" "enscape" "3dsmax"; do
  out="src/assets/icons/${key}.svg"
  echo "\nDownloading ${key} -> ${out}"
  IFS=' ' read -r -a slugs <<< "${candidates[$key]}"
  success=0
  for slug in "${slugs[@]}"; do
    urls=("https://cdn.simpleicons.org/${slug}/111827" \
          "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${slug}.svg" \
          "https://unpkg.com/simple-icons@latest/icons/${slug}.svg" \
          "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${slug}.svg")
    if try_urls "$out" "${urls[@]}"; then
      success=1
      break
    fi
  done
  if [ "$success" -ne 1 ]; then
    echo "Failed to download ${key} from all tried slugs and sources." >&2
  fi
done

echo "Done. Check src/assets/icons/ for downloaded files." 
