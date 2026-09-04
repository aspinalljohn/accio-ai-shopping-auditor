#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "${script_dir}/.." && pwd)"
version="$(node -e 'const fs=require("fs"); const p=JSON.parse(fs.readFileSync(process.argv[1],"utf8")); process.stdout.write(p.version)' "${repo_root}/plugin.json")"
artifact_name="ai-shopping-auditor-${version}.zip"
dist_dir="${repo_root}/dist"
artifact_path="${dist_dir}/${artifact_name}"
stage_dir="$(mktemp -d)"

cleanup() {
  rm -rf "${stage_dir}"
}
trap cleanup EXIT

node "${repo_root}/scripts/validate-package.mjs"

mkdir -p "${dist_dir}" "${stage_dir}/ai-shopping-auditor"
cp "${repo_root}/plugin.json" "${stage_dir}/ai-shopping-auditor/plugin.json"
cp "${repo_root}/prompt.md" "${stage_dir}/ai-shopping-auditor/prompt.md"
cp -R "${repo_root}/skills" "${stage_dir}/ai-shopping-auditor/skills"
cp -R "${repo_root}/subagents" "${stage_dir}/ai-shopping-auditor/subagents"
cp -R "${repo_root}/resources" "${stage_dir}/ai-shopping-auditor/resources"

rm -f "${artifact_path}" "${artifact_path}.sha256"
(
  cd "${stage_dir}"
  zip -q -r "${artifact_path}" ai-shopping-auditor
)

unzip -t "${artifact_path}" >/dev/null
(
  cd "${dist_dir}"
  shasum -a 256 "${artifact_name}" > "${artifact_name}.sha256"
)

echo "Release archive: ${artifact_path}"
echo "Checksum: ${artifact_path}.sha256"

