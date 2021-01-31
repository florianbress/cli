import { copy } from "../deps.ts";

export async function init(template: string, name: string, token: string) {
  await copyTemplate(template, name);
  await copyDepsFile(template, name);
  await generateConfig(name, token);
}

export async function copyTemplate(template: string, name: string) {
  await copy(template, name);
}

export async function generateConfig(name: string, token: string) {
  await Deno.writeTextFile(
    `${name}/config.ts`,
    `export const DISCORD_TOKEN = "${token}"`,
  );
}

export async function copyDepsFile(template: string, name: string) {
  await copy(`${template}/deps.ts`, name);
}
