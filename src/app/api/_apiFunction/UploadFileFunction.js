
import {writeFile} from 'fs/promises'
export const uploadFile = async (req) => {
    const data = await req.formData()
    const file = data.get('file')
    if(!file){
        return({message:"No File found", success:false})
    }else{
        const timestamp = new Date().getTime();
        const byteData = await file.arrayBuffer();
        const buffer = Buffer.from(byteData);
        let fileExplode = file.name.split('.')
        let fileName = fileExplode[0]+'_'+timestamp+'.'+fileExplode[1]
        const path = `./public/upload/${fileName}`;
        await writeFile(path,buffer);
        return({message:"File uploaded successfully.", success:true, fileName})
    }
}