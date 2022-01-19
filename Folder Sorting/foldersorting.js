const fs = require("fs");
let extensionsmapping = require("./util.js");
let testfolderpath = "./downloads";
let allFiles = fs.readdirSync(testfolderpath);
for(let i=0;i<allFiles.length;i++){
    sortFile(allFiles[i]);
}
function sortFile(file){
    let extension = getExtension(file);
    let extensionfolder = checkExtensionFolder(extension);
    moveFile(file,extensionfolder);
}   

function getExtension(file){
    file = file.split(".");
    return file[1];
}
function checkExtensionFolder(extension){
    let extensionfoldername;
    for(let key in extensionsmapping){
        let extensions = extensionsmapping[key];
        if(extensions.includes(extension)){
            extensionfoldername = testfolderpath+"/"+key;
            break;
        }
    }
    let folderexit = fs.existsSync(extensionfoldername);
    if(!folderexit){
        fs.mkdirSync(extensionfoldername);
    }
    return extensionfoldername;
}
function moveFile(file,extensionfolder){
    let sourcefile = testfolderpath+"/"+file;
    let destination = extensionfolder+"/"+file;
    fs.copyFileSync(sourcefile,destination);
    fs.unlinkSync(sourcefile);
}   