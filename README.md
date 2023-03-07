# XLSX Merge Cell Test

To run type `sh start.sh` in the jsh terminal below. Handles npm package installation as StackBlitz doesn't perserve node_modules on reload.

Use Ctrl-C to stop and if you want to run again after stopping:

```
cd ~/projects/node-phebwd/backend
npm run serve
```

if you made changes to my code and want to see the changes:

```
cd ~/projects/node-phebwd/backend
npm run start
```

To run CLI portion:

```
cd ~/projects/node-phebwd
sh cli.sh
```

## /backend/lib/xlsx_parser

This is a npm module that I wrote that will take in an XLSX file stream and return all merged cells within the worksheet, including other information.

This was meant to be a reusable package consumable by both Hapi server and CLI app. I wrote it to use Node pipes so that adding extract features/ functionality would be very simple. (i.e, file validation)

I wanted to write my own instead of pulling in a library, exception being parsing of XLSX file. While I looked into XML file structure and started a prototype, I opted to use `Unzipper`.

## /backend/app/index.ts

The CLI portion of the test.

## /backend/server and /frontend

Just a simple frontend and Hapi server to test the `xlsx_parser`.

## Thank you for taking the time!

-Anthony

[Created using StackBlitz ⚡️](https://stackblitz.com/edit/node-phebwd?file=md!README.md)
