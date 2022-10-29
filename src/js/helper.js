import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (e) {
    throw e;
  }
};

export const AJAXDELETE = async function (url) {
  try {
    const fetchPro = fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    console.log(res)
    
    
    if (!res.ok) throw new Error(`(${res.status})`);

   
   
  } catch (e) {
    throw e;
  }
};
/*
export const getJSON= async function(url){

   try {

    const fetchPro=fetch(url)
    const res= await  Promise.race([fetchPro,timeout(TIMEOUT_SEC)])

    const data= await res.json()
   if(!res.ok) throw new Error(`${data.message} (${res.status})`)
   console.log(data)
    return data
}catch(e){
  
  throw e}

}

export const sendJSON= async function(url,uploaddate){

  try {
    const fetchPro=fetch(url,{

method: 'POST',
headers: {'Content-Type': 'application/json'},
body: JSON.stringify(uploaddate)
    })
    
    const res= await  Promise.race([fetchPro,timeout(TIMEOUT_SEC)])

   const data= await res.json()
  if(!res.ok) throw new Error(`${data.message} (${res.status})`)
  console.log(data)
   return data
}catch(e){
 
 throw e}

}*/
