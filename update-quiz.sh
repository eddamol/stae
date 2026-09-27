#!/bin/bash
# Extracts a Lumi/H5P export (.h5p file) into activities/<name>, replacing
# whatever was there before, and strips the editor-only libraries that
# aren't needed for playback. Safe to re-run for a quiz that already
# exists (e.g. after editing it in Lumi and re-exporting) -- the
# activities/<name> folder and the data-activity value pointing at it
# never need to change, only its contents.
#
# Usage: ./update-quiz.sh <path-to-h5p-file> <activity-name>
# Example: ./update-quiz.sh quizes/quiz-kafli1-vid1.h5p kafli1-vextir

set -e

H5P_FILE="$1"
NAME="$2"

if [ -z "$H5P_FILE" ] || [ -z "$NAME" ]; then
    echo "Usage: $0 <path-to-h5p-file> <activity-name>"
    exit 1
fi

DEST="activities/$NAME"

rm -rf "$DEST"
mkdir -p "$DEST"
unzip -o -q "$H5P_FILE" -d "$DEST"
rm -rf "$DEST"/H5PEditor.*

echo "Extracted $H5P_FILE into $DEST"
