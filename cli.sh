#!/bin/sh

echo "Starting application..."

cd ~/projects/node-phebwd/
rm -rf backend/node_modules

# echo -e \n not supported in jsh

echo
echo '[INFO]: Installing local npm module xlsx_parser dependencies...'
cd backend/lib/xlsx_parser
npm i

echo
echo '[INFO]: Installing sample project backend dependencies...'
cd ../..
npm i


echo
echo '[INFO]: Running CLI app...'
node .