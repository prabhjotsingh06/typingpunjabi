import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
export async function GET(request , { params }){
    
    const url = process.env.MONGODB_URI
    const client = new MongoClient(url);
    const dbName = process.env.MONGODB_DB
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection("lessonsname");
        const data = params.pra!="all" 
        ? params.pra.endsWith("nextlesson") 
        ? await collection.findOne({"_id":{$gt:new ObjectId(params.pra.slice(0,-10))}}) 
        : await collection.findOne({"_id":new ObjectId(params.pra)}) 
        : await collection.find({}).toArray() 

        console.log(params.pra)
        return NextResponse.json(Array.isArray(data) ? {data} : data )
    } catch (err) {
        return NextResponse.json({"sample":process.env.MONGODB_URI})
        console.log(err)
    };

}


export async function PUT(request,{ params }) {
    const body = await request.json()
    const url = process.env.MONGODB_URI
    const client = new MongoClient(url);
    const dbName = process.env.MONGODB_DB
    const paramsId =  params.pra.endsWith("nextlesson") ? params.pra.slice(0,-10) : params.pra
    console.log(body,params.pra)
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection("lessonsname");
        data = params.pra.endsWith("nextlesson") 
        ? await collection.updateOne({"_id":{$gt:new ObjectId(paramsId)}},{ $set:body }) 
        : await collection.updateOne({"_id":new ObjectId(paramsId)},{ $set:body })

        return NextResponse.json({"result":data})
    } catch (err) {
        return NextResponse.json({"er":err})
        console.log(err)
    };
  }