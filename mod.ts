import { Select } from "https://deno.land/x/cliffy@v0.17.0/prompt/select.ts";
import { copy, Input } from "./deps.ts";

// Officially-supported templates
const TEMPLATES = [
  "basic",
  "advanced",
];

console.log("WHAT IS THIS? DISCORDENO CLI, WHAT ELSE?");

const name = await Input.prompt({
  message: "Enter the name of the bot:",
  default: "my-discordeno-bot",
});

const template = await Input.prompt({
  message: "Select a template for the bot:",
  default: "basic",
  suggestions: [
    ...TEMPLATES,
    "github:discordeno/discordeno-boilerplate",
  ],
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
  // Split the template name by ":" and use the second element as the repository (format: github:USER/REPO)
  const repository = template.split(":")[1];
  const url = `https://api.github.com/repos/${repository}/zipball`;
  const arrayBuffer = await (await fetch(url)).arrayBuffer();
  // Create a new temporary zip file in the default temporary files directory
  const tmpDirPath = await Deno.makeTempFile({
    suffix: ".zip",
  });
  // Open a file (temporary directory) and resolve to an instance of `Deno.File`
  const tmpDir = await Deno.open(tmpDirPath, {
    read: true,
    write: true,
  });
  // Write the content of the array buffer to the writer (temporary file)
  await Deno.writeAll(tmpDir, new Uint8Array(arrayBuffer));
  // Close the file resource by resource ID
  Deno.close(tmpDir.rid);

  // Append the current working directory to the target directory name
  const destPath = `${Deno.cwd()}/${name}`;
  // Spawn a subprocess which runs corresponding utility tools to unzip the retrieved file; "PowerShell Expand-Archive" for Windows and "unzip" for Unix-based operating systems
  const process = Deno.run({
    cmd: Deno.build.os === "windows"
      ? [
        "PowerShell",
        "Expand-Archive",
        "-Path",
        tmpDirPath,
        "-DestinationPath",
        destPath,
      ]
      : ["unzip", tmpDirPath, "-d", destPath],
    stdout: "piped",
    stderr: "piped",
  });
  // Await for the completion of the process
  await process.status();
}
