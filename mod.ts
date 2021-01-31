import { Input, Secret } from "./deps.ts";
import { init } from "./src/util.ts";

// Default and official templates
const TEMPLATES = ["default"];
// Default types
const TYPES = ["class", "function"];

const name = await Input.prompt({
  message: "Enter the name of the bot:",
  default: "discordeno-bot",
});

const token = await Secret.prompt({
  message: "Enter the token of the bot:",
});

let template = await Input.prompt({
  message: "Select a template for the bot:",
  default: "default",
  suggestions: TEMPLATES,
  list: true,
});

// Additional prompt for default and official templates
if (TEMPLATES.includes(template)) {
  const type = await Input.prompt({
    message: "Enter the type for the project:",
    default: "function",
    suggestions: TYPES,
    list: true,
  });

  template += `/${type}`;
}

await init(template, name, token);
