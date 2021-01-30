import { copy, Input, prompt } from "./deps.ts";

const answers = await prompt([
  {
    name: "name",
    message: "Enter the name of the bot:",
    type: Input,
    default: "my-discordeno-bot",
  },
  {
    name: "template",
    message: "Select a template for the bot:",
    default: "minimal",
    type: Input,
    suggestions: [
      "minimal",
    ],
    info: true,
    list: true,
  },
]);

await copyTemplate(answers.template!, answers.name!);

async function copyTemplate(template: string, name: string) {
  await copy(`./templates/${template}`, name);
}

console.log(answers);
