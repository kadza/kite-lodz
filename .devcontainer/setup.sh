#!/bin/bash
set -e
pnpm config set store-dir ~/.pnpm-store
curl -fsSL https://claude.ai/install.sh | bash
