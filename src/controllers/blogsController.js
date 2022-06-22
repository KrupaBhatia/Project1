const blogsModel = require("../model/blogsModel");
const authorModel = require("../model/authorModel");

const blogs = async function(req,res){
    try{
    const blog = req.body
    let authorId = blog.author_Id
    if (!authorId) res.status(400).send("author_Id is invalid");
    let data=await authorModel.findById(blog.author_Id)
    console.log(authorId)
    // console.log(author)

     if (!data) res.status(400).send("Entered author Id is not valid")
    // console.log(data)
    let blogsCreated = await blogsModel.create(blog)

    res.status(201).send({data: blogsCreated})
    }
    catch(error){
        res.status(500).send({msg:error.message})
    }
}
    const getBlogs=async function (req,res){
        try {  
        let author_Id= req.query.author_Id
        let category = req.query.category
        let tags = req.query.tags
        let subcategory = req.query.subcategory
        let returnBlogs=await blogsModel.find({isDeleted:true,isPublished:true}).select({$or: [{author_Id,category,tags,subcategory}]})
        res.status(200).send({data:returnBlogs})
        if (!returnBlogs)
        res.status(404).send({msg: "Not found"})

        
                console.log(`query params are: ${author_Id} ${category} ${tags} ${subcategory}`)
               
                let result = await blogsModel.find({}).
                console.log(result)
                res.status(200).send({ msg: result})
            }
            catch (err) {
                console.log(err)
                res.status(500).send({ msg: err.message })
            }
        }
            
            // let id = author[0].author_id;
            // let data=await bookModel.find({author_id:id})
            
        
    

    // const authorId=req.body.author_Id
    // let author = await authorModel.findById({authorId})
    // if(!author)res.status(400).send("author not found")
   



module.exports.blogs=blogs;
module.exports.getBlogs=getBlogs;