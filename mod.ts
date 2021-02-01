import { Select } from "https://deno.land/x/cliffy@v0.17.0/prompt/select.ts";
import { copy, Input } from "./deps.ts";

// Officially-supported templates
const TEMPLATES = ["basic", "advanced"];

console.log("WHAT IS THIS? DISCORDENO CLI, WHAT ELSE?");

const name = await Input.prompt({
  message: "Enter the name of the bot:",
  default: "my-discordeno-bot",
});

const template = await Input.prompt({
  message: "Select a template for the bot:",
  default: "basic",
  suggestions: TEMPLATES,
  list: true,
});

// Additional prompts for official templates
if (TEMPLATES.includes(template)) {
  const type = await Select.prompt({
    message: "Enter the type for the project:",
    default: "function",
    options: [
      { name: "Function-based", value: "function" },
      { name: "Class-based", value: "class" },
    ],
  });

  // Resolve the template name to absolute and normalized path
  const templateDir = await Deno.realPath(template);
  // Create the target directory and copy template directory to the target directory
  await copy(`${templateDir}/${type}`, name);
  // Create and copy the "deps.ts" file to the target directory
  await copy(`${templateDir}/deps.ts`, `${name}/deps.ts`);
  // Create and copy the "config.ts" file to the target directory
  await copy(`${templateDir}/config.ts`, `${name}/config.ts`);
} else if (template.startsWith("github:")) {
  // Clone the GitHub repository using git CLI
  const repository = template.split(":")[1];
  const url = `https://github.com/${repository}`;
  const process = Deno.run({
    cmd: ["git", "clone", url],
  });

  await process.status();
}
