export function TsFileGenerator(){
  const TsConfigFile = `
  {
  "extends": "./node_modules/gts/tsconfig-google.json",
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "declaration": false,
    "experimentalDecorators": true,
    "lib": ["dom", "es2020", "ESNext"],
    "moduleResolution": "bundler",
    "module": "esnext",
    "target": "esnext",
    "noImplicitAny": false,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "jsx": "react",
    "jsxFactory": "h",
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "useDefineForClassFields": false,
  },
  "include": ["src"],
  "exclude": ["node_modules", "lambda"]
}
  `
return TsConfigFile;
}
