const mongoose=require("mongoose")
const initData=require("./data.js")
const Listing=require("../models/listing.js")

const mongoUrl="mongodb://127.0.0.1:27017/wanderlust"
main().then((res)=>{
    console.log("Connection Established")
}).catch((err)=>{
    console.log("found an error")
})
async function main() {
    await mongoose.connect(mongoUrl)
}

const initDb = async () => {
    try {
      await Listing.deleteMany({});
      initData.data=initData.data.map((obj)=>({...obj,owner:"66cad3603dad0c7925871aaf"}))
      await Listing.insertMany(initData.data);
      console.log("Data saved successfully");
    } catch (error) {
      console.log("Error initializing database:", error);
    }
  };
  
initDb()