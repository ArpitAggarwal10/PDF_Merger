const PDFMerger = require('pdf-merger-js');
var merger = new PDFMerger();
const path= require('path')
const mergedpdfs = async (...arr) => {
    for(let i of arr){
        await merger.add(i)
    }
    let date= new Date().getTime()
    await merger.save(path.join(__dirname, `public/mergedFolder/${date}.pdf`));
    return date;
};
module.exports= {mergedpdfs}