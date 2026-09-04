#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(scriptDir, '..')
const errors = []

function fail(message) {
  errors.push(message)
}

function read(relativePath) {
  const absolutePath = path.join(root, relativePath)
  if (!fs.existsSync(absolutePath)) {
    fail(`Missing required file: ${relativePath}`)
    return ''
  }
  return fs.readFileSync(absolutePath, 'utf8')
}

function parseJson(relativePath) {
  const source = read(relativePath)
  if (!source) return null
  try {
    return JSON.parse(source)
  } catch (error) {
    fail(`Invalid JSON in ${relativePath}: ${error.message}`)
    return null
  }
}

function parseFrontmatter(source, relativePath) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) {
    fail(`Missing YAML frontmatter in ${relativePath}`)
    return ''
  }
  return match[1]
}

const requiredFiles = [
  'plugin.json',
  'prompt.md',
  'resources/icon.svg',
  'resources/recommend.json',
  'resources/i18n.json',
  'subagents/ai-shopping-auditor/prompt.md',
  'skills/amazon-ai-shopping-visibility-audit/SKILL.md',
  'skills/amazon-ai-shopping-visibility-audit/display.txt',
  'skills/amazon-ai-shopping-visibility-audit/references/question-taxonomy.md',
  'skills/amazon-ai-shopping-visibility-audit/references/evidence-and-claims.md',
  'skills/amazon-ai-shopping-visibility-audit/references/scoring-method.md',
  'skills/amazon-ai-shopping-visibility-audit/references/output-template.md',
  'skills/amazon-ai-shopping-visibility-audit/references/qa-checklist.md'
]

for (const file of requiredFiles) read(file)

const plugin = parseJson('plugin.json')
if (plugin) {
  for (const field of ['name', 'description', 'version', 'category']) {
    if (!plugin[field]) fail(`plugin.json is missing ${field}`)
  }

  if (plugin.name?.length >= 22) {
    fail(`Agent name must be fewer than 22 characters; found ${plugin.name.length}`)
  }
  if (plugin.description && (plugin.description.length < 100 || plugin.description.length > 150)) {
    fail(`Agent description must be 100–150 characters; found ${plugin.description.length}`)
  }
  if (plugin.category !== 'e-commerce-marketplaces') {
    fail(`Unexpected category: ${plugin.category}`)
  }
  if (!/^\d+\.\d+\.\d+$/.test(plugin.version ?? '')) {
    fail(`Version is not semantic x.y.z: ${plugin.version}`)
  }
  if (plugin.connectors || plugin.cliTools || plugin.mcpServers) {
    fail('Version 0.1.0 must not declare unimplemented connectors, CLIs, or MCP servers')
  }

  const skillIds = plugin.skillIds ?? []
  for (const skillId of skillIds) {
    if (!fs.existsSync(path.join(root, 'skills', skillId, 'SKILL.md'))) {
      fail(`skillIds references missing Skill: ${skillId}`)
    }
  }

  const subAgents = plugin.subAgents ?? []
  for (const subAgent of subAgents) {
    if (!subAgent.id) {
      fail('SubAgent is missing id')
      continue
    }
    const subAgentDir = path.join(root, 'subagents', subAgent.id)
    if (!fs.existsSync(subAgentDir)) {
      fail(`SubAgent directory is missing: subagents/${subAgent.id}`)
    }
    if (!subAgent.systemPrompt && !subAgent.systemPromptFile && !fs.existsSync(path.join(subAgentDir, 'prompt.md'))) {
      fail(`SubAgent has no system prompt: ${subAgent.id}`)
    }
    for (const skill of subAgent.skills ?? []) {
      if (!skillIds.includes(skill.id)) {
        fail(`SubAgent ${subAgent.id} references non-global or missing Skill: ${skill.id}`)
      }
      if (!['systemPrompt', 'indexed'].includes(skill.mode)) {
        fail(`SubAgent ${subAgent.id} has invalid Skill mode: ${skill.mode}`)
      }
    }
  }
}

const skillPath = 'skills/amazon-ai-shopping-visibility-audit/SKILL.md'
const skillSource = read(skillPath)
const frontmatter = parseFrontmatter(skillSource, skillPath)

for (const field of ['name:', 'displayName:', 'displayDescription:', 'description:', 'version:', 'tool_triggers:']) {
  if (!frontmatter.includes(field)) fail(`${skillPath} frontmatter is missing ${field.replace(':', '')}`)
}

if (!frontmatter.includes('Use when') || !frontmatter.includes('Do not use')) {
  fail(`${skillPath} description must contain both "Use when" and "Do not use" routing language`)
}

const referenceMatches = [...skillSource.matchAll(/\((references\/[A-Za-z0-9._/-]+\.md)\)/g)]
for (const match of referenceMatches) {
  const relativeToSkill = match[1]
  const absolute = path.join(root, 'skills', 'amazon-ai-shopping-visibility-audit', relativeToSkill)
  if (!fs.existsSync(absolute)) fail(`SKILL.md references missing file: ${relativeToSkill}`)
}

const display = parseJson('skills/amazon-ai-shopping-visibility-audit/display.txt')
if (display && (!Array.isArray(display) || display.length < 1)) {
  fail('display.txt must be a non-empty JSON array')
}
for (const item of Array.isArray(display) ? display : []) {
  for (const field of ['id', 'key', 'value']) {
    if (!item[field]) fail(`display.txt entry is missing ${field}`)
  }
}

const recommendations = parseJson('resources/recommend.json')
if (recommendations && (!Array.isArray(recommendations) || recommendations.length < 1)) {
  fail('resources/recommend.json must be a non-empty JSON array')
}
for (const item of Array.isArray(recommendations) ? recommendations : []) {
  if (!item.title || !item.prompt) fail('recommend.json entry must contain title and prompt')
}

const i18n = parseJson('resources/i18n.json')
if (i18n) {
  if (i18n.defaultLocale !== 'en') fail('i18n defaultLocale must be en')
  for (const key of [
    'plugin.displayName',
    'plugin.description',
    'subAgent.ai-shopping-auditor.description',
    'skill.amazon-ai-shopping-visibility-audit.name'
  ]) {
    if (!i18n.entries?.[key]) fail(`i18n is missing primary entry: ${key}`)
  }
}

const textFiles = []
function collectTextFiles(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (['.git', 'dist', 'node_modules'].includes(entry.name)) continue
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) collectTextFiles(absolute)
    else if (/\.(?:md|json|txt|mjs|yml|yaml|svg)$/.test(entry.name)) textFiles.push(absolute)
  }
}
collectTextFiles(root)

const prohibited = [
  '[TODO:',
  '/Users/johnaspinall',
  '02 aspi/',
  '03 operator-intelligence/',
  '05 fractional/',
  '06 projects/surface-hair'
]

for (const absolute of textFiles) {
  if (path.relative(root, absolute) === 'scripts/validate-package.mjs') continue
  const source = fs.readFileSync(absolute, 'utf8')
  for (const token of prohibited) {
    if (source.includes(token)) {
      fail(`${path.relative(root, absolute)} contains prohibited private or unfinished token: ${token}`)
    }
  }
}

if (errors.length) {
  console.error(`Validation failed with ${errors.length} error(s):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('Validation passed')
console.log(`Agent name: ${plugin.name} (${plugin.name.length} characters)`)
console.log(`Agent description: ${plugin.description.length} characters`)
console.log(`Global Skills: ${plugin.skillIds.length}`)
console.log(`Public SubAgents: ${plugin.subAgents.length}`)
console.log(`Internal Skill references: ${referenceMatches.length}`)
