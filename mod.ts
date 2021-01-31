import { copy, Input } from "./deps.ts";

// Default and official templates
const TEMPLATES = ["default"];
// Default types
const TYPES = ["class", "function"];

const name = await Input.prompt({
  message: "Enter the name of the bot:",
  default: "discordeno-bot",
});

const template = await Input.prompt({
  message: "Select a template for the bot:",
  default: "default",
  suggestions: TEMPLATES,
  list: true,
});
console;
// Additional prompt for default and official templates
if (TEMPLATES.includes(template)) {
  const type = await Input.prompt({
    message: "Enter the type for the project:",
    default: "function",
    suggestions: TYPES,
    list: true,
  });

  const templateDir = await Deno.realPath(template);

  // Create the target directory and copy template directory to the target directory
  await copy(`${templateDir}/${type}`, name);

  // Create and copy the "deps.ts" and "config.ts" file to the target directory.
  await copy(`${templateDir}/deps.ts`, `${name}/deps.ts`);
  await copy(`${templateDir}/config.ts`, `${name}/config.ts`);
}

// TODO: support for third-party templates
