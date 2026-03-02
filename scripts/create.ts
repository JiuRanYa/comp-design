import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import prompts from 'prompts'
import prettier from 'prettier'
import { ESLint } from 'eslint'
import { logger, prettierConfig, run, toCapitalCase } from './utils'

async function main() {
  const comp = await prompts({
    type: 'text',
    name: 'name',
    message: 'Please input your component name: ',
  })

  const compName = toCapitalCase(comp.name)

  const confirm = await prompts({
    type: 'confirm',
    name: 'create',
    message: `Are you sure you want to create ${compName} component?`,
  })

  if (!confirm.create)
    return

  const demoTemp = `
  	<template>
  			<${compName} />
  		</template>
  `
  const demoRoot = resolve('docs/demos/')
  const demoPath = resolve('docs/demos/', comp.name, 'basic')

  const markdownTemp = `
---
title: ${compName}
lang: zh-CN
---

# ${compName}

## 基础用法

:::demo

${comp.name}/basic

:::
  	`
  const markdownPath = resolve('docs/arsenal-design/components')

  const componentPath = resolve(`../components/${comp.name}`)
  const componentIndexTemp = `
		import ${compName} from './${comp.name}.vue'

		export { ${compName} }
	`
  const componentVueTemp = `
		<template>
			<div>${compName}</div>
		</template>

		<script setup lang="ts">
		defineOptions({
			name: '${compName}'
		})
		</script>
	`

  await mkdir(componentPath, { recursive: true })
  await mkdir(resolve(demoRoot, comp.name, 'basic'), { recursive: true })

  await writeFile(
    resolve(demoPath, 'index.vue'),
    await prettier.format(demoTemp, { ...prettierConfig, parser: 'vue' }),
    'utf-8',
  )

  logger.success(`Demo file created `)

  await writeFile(
    resolve(markdownPath, `${comp.name}.md`),
    await prettier.format(markdownTemp, { ...prettierConfig, parser: 'markdown' }),
    'utf-8',
  )

  logger.success(`Init ${compName} component docs`)

  await writeFile(
    resolve(componentPath, 'index.ts'),
    await prettier.format(componentIndexTemp, { ...prettierConfig, parser: 'typescript' }),
    'utf-8',
  )

  await writeFile(
    resolve(componentPath, `${comp.name}.vue`),
    await prettier.format(componentVueTemp, { ...prettierConfig, parser: 'vue' }),
    'utf-8',
  )

  logger.success(`Generate ${compName} template`)

  const eslint = new ESLint({ fix: true })
  await ESLint.outputFixes(await eslint.lintFiles(resolve(demoPath, 'index.vue')))
  await ESLint.outputFixes(await eslint.lintFiles(resolve(markdownPath, `${comp.name}.md`)))
  await ESLint.outputFixes(await eslint.lintFiles(resolve(componentPath, 'index.ts')))
  await ESLint.outputFixes(await eslint.lintFiles(resolve(componentPath, `${comp.name}.vue`)))

  await run('pnpm', ['bootstrap'])
}

main().catch((error) => {
  logger.error(error)
  process.exit(1)
})
