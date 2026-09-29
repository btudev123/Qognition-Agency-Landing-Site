const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (mod, file) => {
 const source = fs.readFileSync(file, 'utf8');
 const {outputText} = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,resolveJsonModule:true}});
 mod._compile(outputText,file);
};

require.extensions['.tsx'] = require.extensions['.ts'];
