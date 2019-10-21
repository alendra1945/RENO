const apiDocs=require('../../api/docs/apiDocs')
const yamljs=require('yamljs')

const getUrl=(name)=>{
    return '/api-docs/'+name
}

const makeDataURL=(data)=>{
    let dataURL=[]
    data.forEach(d => {
        dataURL=[
            ...dataURL,
            {
                name:d.name,
                url:getUrl(d.name)
            }
        ]
    });
    return dataURL
}
let getURLDoc= makeDataURL(apiDocs)

const getDocument=(path)=>{
    return yamljs.load('./api/docs/'+path)
}
const getDocuments=(path)=>{
    let documents
    path.forEach(p=>{
        documents={
            ...documents,
            ...yamljs.load('./api/docs/'+p)
         }
    })

    return documents
}
const makeDataDoc=(name)=>{
    let dataDocs
    for(i in apiDocs){
        d=apiDocs[i]
        if(d.name==name){
            if(d.document){
                dataDocs=getDocument(d.document)
            }else{
                dataDocs=getDocuments(d.documents)
            }
            break
        }
    }
    return dataDocs
}

module.exports={getURLDoc,makeDataDoc}